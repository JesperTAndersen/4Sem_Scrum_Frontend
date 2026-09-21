import styles from "./ProjectManagementPage.module.css";
import { useState, useEffect } from "react";
import { useNotification } from "@/context/NotificationContext";
import { useLocation, useNavigate } from "react-router";
import Button from "@/shared/components/ui/Button/Button";
import { FiPlusCircle } from "react-icons/fi";
import ProjectsTable from "../../components/ProjectsTable/ProjectsTable";
import SearchFilterBar from "@/shared/components/filter/SearchFilterBar/SearchFilterBar";
import PageHeader from "@/shared/components/layout/PageHeader/PageHeader";
import Card from "@/shared/components/ui/Card/Card";
import TableEmptyState from "@/shared/components/ui/TableEmptyState/TableEmptyState";
import LoadingSpinner from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";
import ProjectCreateForm from "../../components/ProjectCreateForm/ProjectCreateForm";
import projectService from "../../services/projectService";
import { STATUS_FILTER_OPTIONS } from "../../utils/constants";

const DEFAULT_FILTER = {
  status: "ALL",
  search: "",
};

const ProjectManagementPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { notify } = useNotification();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (location.state?.successMessage) {
      notify("success", location.state.successMessage);
    }
    window.history.replaceState({}, "");
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAll();
        setProjects(data);
      } catch (error) {
        notify(
          "error",
          error.message || "Noget gik galt ved hentning af projekter.",
        );
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

    const projectSlim = {
      ...project,
      taskCountDTO: {
        totalTaskCount: 0,
        taskFinished: 0,
      },
    };
    setProjects((prev) => [...prev, projectSlim]);
  };

  const resetFilter = () => setFilter(DEFAULT_FILTER);

  const searchTerm = filter.search.trim().toLowerCase();

  const filteredProjects = projects
    .filter((p) => {
      if (filter.status === "ALL") return true;
      return p.status === filter.status;
    })
    .filter((p) => {
      if (!searchTerm) return true;

      const title = (p?.title || "").toLowerCase();
      const description = (p?.description || "").toLowerCase();

      const firstName = (p?.createdBy?.firstName || "").toLowerCase();
      const lastName = (p?.createdBy?.lastName || "").toLowerCase();
      const fullName = `${firstName} ${lastName}`;

      return (
        title.includes(searchTerm) ||
        description.includes(searchTerm) ||
        fullName.includes(searchTerm)
      );
    });

  return (
    <div className={styles.pageContainer}>
      <PageHeader
        title="Projekt adminstration"
        subtitle="Opret og administrer projekter"
      />

      {showForm ? (
        <ProjectCreateForm
          onCancel={() => {
            setShowForm(false);
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
                options={STATUS_FILTER_OPTIONS}
                valueKey="status"
                searchKey="search"
                placeholder="Søg på projekt-navn eller oprettet af"
                layout="row"
              />

              <div className={styles.filterGroup}>
                <Button
                  icon={<FiPlusCircle />}
                  name="Opret projekt"
                  variant={showForm ? "secondary" : "primary"}
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
                <ProjectsTable
                  projects={filteredProjects}
                  onView={handleOnView}
                />
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

export default ProjectManagementPage;
