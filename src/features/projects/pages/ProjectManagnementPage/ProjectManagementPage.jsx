import styles from './ProjectManagementPage.module.css';
import { useState, useEffect } from 'react';
import { useNotification } from '../../../../context/NotificationContext';
import { useLocation, useNavigate, useOutletContext } from 'react-router';
import Button from '@/shared/components/ui/Button/Button';
import { FiPlusCircle } from 'react-icons/fi';
import ProjectsTable from '../../components/ProjectsTable/ProjectsTable';
import SearchFilterBar from '@/shared/components/filter/SearchFilterBar/SearchFilterBar';
import WeekFilter from '@/shared/components/filter/WeekFilter/WeekFilter';
import PageHeader from '@/shared/components/layout/PageHeader/PageHeader';
import Card from '@/shared/components/ui/Card/Card';
import TableEmptyState from '@/shared/components/ui/TableEmptyState/TableEmptyState';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner/LoadingSpinner';
import DishCreateForm from '../../components/DishCreateForm/DishCreateForm';
import projectService from '../../services/projectService';
import { ACTIVE_OPTIONS } from '../../utils/activeOptions';

const DEFAULT_FILTER = {
  active: 'TRUE',
  search: '',
  station: 'ALL',
  week: 'ALL',
};

const DishManagementPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { notify } = useNotification();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (location.state?.successMessage) {
      notify('success', location.state.successMessage);
    }
    window.history.replaceState({}, '');
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAll();
        setProjects(data);
      } catch (error) {
        notify('error', error.message || 'Noget gik galt ved hentning af projekter.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const handleOnView = (id) => {
    navigate(`/projects/${id}`);
  };

  const handleSubmit = async (formData) => {
      const project = await projectService.create(formData);
      setProjects((prev) => [...prev, project]);
  };

  const resetFilter = () => setFilter(DEFAULT_FILTER);

  const searchTerm = filter.search.trim().toLowerCase();

  const filteredProjects = projects
    .filter((p) => {
      if (filter.active === 'ALL') return true;
      const wantActive = filter.active === 'TRUE';
      return p.active === wantActive;
    })
    .filter((d) => {
      if (!searchTerm) return true;
      const title = d.title.toLowerCase();
      const description = (d.description || '').toLowerCase();
      const firstName = d.createdBy.firstName.toLowerCase();
      const lastName = d.createdBy.lastName.toLowerCase();

      return (
        title.includes(searchTerm) ||
        description.includes(searchTerm) ||
        firstName.includes(searchTerm) ||
        lastName.includes(searchTerm)
      );
    })
    .filter((d) => {
      if (filter.week === 'ALL') return true;
      return d.originWeek === Number(filter.week);
    });

  return (
    <div className={styles.pageContainer}>
      <PageHeader
        title="Projekt adminstration"
        subtitle="Opret og administrer projekter"
      />

      {showForm ? (
        <DishCreateForm
          onCancel={() => {
            setShowForm(false);
            setPrefill(null);
          }}
          onSubmit={handleSubmit}
        />
      ) : (
        <>
          <Card variant="table">
            <div className={styles.cardHeader}>
              <SearchFilterBar
                filter={filter}
                onChange={handleFilterChange}
                options={ACTIVE_OPTIONS}
                valueKey="active"
                searchKey="search"
                placeholder="Søg på projekt-navn eller oprettet af"
                layout="row"
              />

              <div className={styles.filterGroup}>
                <StationFilter
                  stationOptions={stationOptions}
                  value={filter.station}
                  onChange={(value) => handleFilterChange('station', value)}
                />

                <WeekFilter
                  value={filter.week}
                  onChange={(value) => handleFilterChange('week', value)}
                />

                <Button
                  icon={<FiPlusCircle />}
                  name="Opret projekt"
                  variant={showForm ? 'secondary' : 'primary'}
                  onClick={() => setShowForm((p) => !p)}
                />
              </div>
            </div>
            <div className={styles.tableCount}>
              {filteredProjects.length} projekter
            </div>

            {isLoading ? (
              <LoadingSpinner text="Henter projekter..." inline />
            ) : (
              <>
                <DishesTable dishes={filteredProjects} onView={handleOnView} />
                {filteredProjects.length === 0 && (
                  <TableEmptyState
                    text="Ingen projekter matcher din søgning."
                    onReset={resetFilter}
                  />
                )}
              </>
            )}
          </Card>
        </>
      )}
    </div>
  );
};

export default DishManagementPage;
