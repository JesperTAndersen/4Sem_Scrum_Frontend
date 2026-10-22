import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./RessourcePlanningPage.module.css";
import LoadingSpinner from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";
import PageHeader from "@/shared/components/layout/PageHeader/PageHeader";
import Card from "@/shared/components/ui/Card/Card";
import Button from "@/shared/components/ui/Button/Button";
import Select from "@/shared/components/filter/Select/Select";
import competenceService from "@/features/competences/services/competenceService";
import workloadService from "../services/workloadService";
import AvailabilityTable from "../components/AvailabilityTable/AvailabilityTable";
// import ConflictTable from "../components/ConflictTable/ConflictTable";
import { addDays, nextWorkingDay, toDateString } from "../utils/dateUtils";

const FOUR_WEEKS_IN_DAYS = 27;

const RessourcePlanningPage = () => {
  const navigate = useNavigate();
  const today = new Date();

  const [period, setPeriod] = useState({
    startDate: toDateString(today),
    endDate: toDateString(addDays(today, FOUR_WEEKS_IN_DAYS)),
  });
  const [conflicts, setConflicts] = useState(null);
  const [conflictsLoading, setConflictsLoading] = useState(true);
  const [conflictsError, setConflictsError] = useState(null);

  const [availabilityFilter, setAvailabilityFilter] = useState({
    date: toDateString(nextWorkingDay(today)),
    competenceId: "",
  });
  const [competences, setCompetences] = useState([]);
  const [availability, setAvailability] = useState(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(true);
  const [availabilityError, setAvailabilityError] = useState(null);

  useEffect(() => {
    const fetchConflicts = async () => {
      try {
        const data = await workloadService.getOverAllocations(
          period.startDate,
          period.endDate,
        );
        setConflicts(data);
        setConflictsError(null);
      } catch (error) {
        setConflictsError(
          error.message || "Noget gik galt ved hentning af overbelastning.",
        );
      } finally {
        setConflictsLoading(false);
      }
    };
    fetchConflicts();
  }, [period]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const data = await workloadService.getAvailability(
          availabilityFilter.date,
          availabilityFilter.competenceId,
        );
        setAvailability(data);
        setAvailabilityError(null);
      } catch (error) {
        setAvailabilityError(
          error.message ||
            "Noget gik galt ved hentning af ledige medarbejdere.",
        );
      } finally {
        setAvailabilityLoading(false);
      }
    };
    fetchAvailability();
  }, [availabilityFilter]);

  // A new object also triggers a reload, so calling these with {} works as "try again".
  const changePeriod = (changes) => {
    setConflictsLoading(true);
    setPeriod((prev) => ({ ...prev, ...changes }));
  };

  const changeAvailabilityFilter = (changes) => {
    setAvailabilityLoading(true);
    setAvailabilityFilter((prev) => ({ ...prev, ...changes }));
  };

  useEffect(() => {
    const fetchCompetences = async () => {
      try {
        setCompetences(await competenceService.getAll());
      } catch {
        setCompetences([]);
      }
    };
    fetchCompetences();
  }, []);

  const handleOnEmployeeView = (id) => {
    navigate(`/employees/${id}`);
  };

  const competenceOptions = competences.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <div className={styles.pageContainer}>
      <PageHeader
        title="Ressourceplanlægning"
        subtitle="Overbelastning og ledig kapacitet på tværs af projekter"
      />

      <Card variant="table">
        <div className={styles.cardHeader}>
          <h3>Overbelastning</h3>

          <div className={styles.filterGroup}>
            <label>
              Fra{" "}
              <input
                type="date"
                value={period.startDate}
                onChange={(e) => changePeriod({ startDate: e.target.value })}
              />
            </label>

            <label>
              Til{" "}
              <input
                type="date"
                value={period.endDate}
                min={period.startDate}
                onChange={(e) => changePeriod({ endDate: e.target.value })}
              />
            </label>
          </div>
        </div>

        {conflictsLoading ? (
          <LoadingSpinner text="Henter overbelastning..." inline />
        ) : conflictsError ? (
          <div className={styles.cardHeader}>
            <span>{conflictsError}</span>
            <Button
              variant="secondary"
              name="Prøv igen"
              onClick={() => changePeriod({})}
            />
          </div>
        ) : (
          <div className={styles.tableCount}>
            {conflicts?.conflicts.length ?? 0} konflikter i perioden
          </div>
          // <ConflictTable
          //   conflicts={conflicts?.conflicts}
          //   onView={handleOnEmployeeView}
          // />
        )}
      </Card>

      <Card variant="table">
        <div className={styles.cardHeader}>
          <h3>Ledig kapacitet</h3>

          <div className={styles.filterGroup}>
            <label>
              Dato{" "}
              <input
                type="date"
                value={availabilityFilter.date}
                onChange={(e) =>
                  changeAvailabilityFilter({ date: e.target.value })
                }
              />
            </label>

            <Select
              value={availabilityFilter.competenceId}
              onChange={(e) =>
                changeAvailabilityFilter({ competenceId: e.target.value })
              }
              placeholder="Alle kompetencer"
              options={competenceOptions}
            />
          </div>
        </div>

        {availabilityLoading ? (
          <LoadingSpinner text="Henter medarbejdere..." inline />
        ) : availabilityError ? (
          <div className={styles.cardHeader}>
            <span>{availabilityError}</span>
            <Button
              variant="secondary"
              name="Prøv igen"
              onClick={() => changeAvailabilityFilter({})}
            />
          </div>
        ) : availability?.employees.length === 0 ? (
          <div className={styles.tableCount}>
            Ingen aktive medarbejdere matcher den valgte dag
          </div>
        ) : (
          <AvailabilityTable
            employees={availability?.employees}
            onView={handleOnEmployeeView}
          />
        )}
      </Card>
    </div>
  );
};

export default RessourcePlanningPage;
