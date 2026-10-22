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
import ConflictTable from "../components/ConflictTable/ConflictTable";
import SectionHeader from "@/shared/components/layout/SectionHeader/SectionHeader";
import Input from "@/shared/components/ui/Input/Input";
import { toDateString } from "@/utils/dateHelpers";
import { addDays, nextWorkingDay } from "../utils/dateUtils";

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
    // Wait until both dates are chosen, so an unfinished range is never sent.
    if (!period.startDate || !period.endDate) {
      return;
    }

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

  const changePeriod = (changes) => {
    const next = { ...period, ...changes };
    if (next.startDate && next.endDate) {
      setConflictsLoading(true);
    }
    setPeriod(next);
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
          <SectionHeader
            title="Overbelastning"
            description="Medarbejdere med flere timer end deres kapacitet"
          />

          <div className={styles.filterGroup}>
            <Input
              label="Fra"
              type="date"
              value={period.startDate}
              onChange={(e) => changePeriod({ startDate: e.target.value })}
            />

            <Input
              label="Til"
              type="date"
              value={period.endDate}
              min={period.startDate}
              onChange={(e) => changePeriod({ endDate: e.target.value })}
            />
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
          <>
            <div className={styles.tableCount}>
              {conflicts?.conflicts.length ?? 0} konflikter i perioden
            </div>

            <ConflictTable 
            conflicts={conflicts?.conflicts}
            onOpen={(conflict) => setAvailabilityFilter({date: conflict.date})} />
          </>
        )}
      </Card>

      <Card variant="table">
        <div className={styles.cardHeader}>
          <div className={styles.header}>
            <SectionHeader
              title="Ledig kapacitet"
              description="Hvem har timer tilbage på den valgte dag"
            />
          </div>

          <div className={styles.filterGroup}>
            <Input
              label="Dato"
              type="date"
              value={availabilityFilter.date}
              onChange={(e) =>
                changeAvailabilityFilter({ date: e.target.value })
              }
            />

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
