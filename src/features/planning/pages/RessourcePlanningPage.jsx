import { useEffect, useState } from "react";
import { useNotification } from "@/context/NotificationContext";
import { useNavigate } from "react-router";
import styles from "./UserManagementPage.module.css";
import TableSearch from "@/shared/components/filter/TableSearch/TableSearch";
import TableEmptyState from "@/shared/components/ui/TableEmptyState/TableEmptyState";
import LoadingSpinner from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";
import PageHeader from "@/shared/components/layout/PageHeader/PageHeader";
import Card from "@/shared/components/ui/Card/Card";
import workloadService from "../services/workloadService";

const daysUntilLastWeekDayInMonth = 27;

const RessourcePlanningPage = () => {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const today = new Date();
  const inFourWeeks = new Date();
  inFourWeeks.setDate(today.getDate() + daysUntilLastWeekDayInMonth);

  const [period, setPeriod] = useState({
    startDate: today,
    endDate: inFourWeeks,
  });
  const [conflicts, setConflicts] = useState(null);
  const [conflictsLoading, setConflictsLoading] = useState(true);
  const [conflictsError, setConflictsError] = useState(null);

  const [date, setDate] = useState(today);
  const [competenceId, setCompetenceId] = "";
  const [availibility, setAvailibility] = useState(null);
  const [availibilityLoading, setAvailibilityLoading] = useState(true);
  const [availibilityError, setAvailibilityError] = useState(null);

  const [filterConflict, setFilterConflict] = useState({
    search: "",
  });

  const [filterAvailibility, setFilterAvailibility] = useState({
    search: "",
  });

  useEffect(() => {
    const fetchConflicts = async () => {
      try {
        setConflictsLoading(true);
        const data = await workloadService.getOverAllocations(
          period.startDate,
          period.endDate,
        );
        setConflicts(data);
      } catch (error) {
        notify(
          "error",
          error.message || "Noget gik galt ved henting af overlokering",
        );
      } finally {
        setConflictsLoading(false);
      }
    };
    fetchConflicts();
  }, [period]);

  useEffect(() => {
    const fetchAvailibility = async () => {
      try {
        setAvailibilityLoading(true);
        const data = await workloadService.getAvailability(
          date.getDay,
          competenceId,
        );
        setAvailibility(data);
      } catch (error) {
        notify(
          "error",
          error.message || "Noget gik galt ved henting af ledige medarbejdere",
        );
      } finally {
        setAvailibilityLoading(false);
      }
    };
    fetchAvailibility();
  }, [date]);

  const handleOnConflictView = (id) => {
    navigate(`/users/${id}`);
  };

  const handleOnAvailibilityView = (id) => {
    navigate(`/users/${id}`);
  };

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const resetSearch = () => handleFilterChange("search", "");

  const filteredAvailibilityEmployees = availibility?.employees.filter((e) => {
    const search = filter.search.toLowerCase();
    const fullName = `${e.firstName} ${e.lastName}`.toLowerCase();
    return fullName.includes(search);
  });

  const filteredConflictEmployees = availibility?.conflicts.filter((e) => {
    const search = filter.search.toLowerCase();
    const fullName = `${e.firstName} ${e.lastName}`.toLowerCase();
    return fullName.includes(search);
  });

  return (
    <div className={styles.pageContainer}>
      <PageHeader
        title="Ressourceplanlægning"
        subtitle="Overbelastning og ledig kapacitet på tværs af projekter"
      />

      <Card variant="table">
        <div className={styles.cardHeader}>
          <TableSearch
            value={filter.search}
            onChange={(value) => handleFilterChange("search", value)}
            placeholder="Søg efter navn"
          />

          <div className={styles.filterGroup}></div>
        </div>

        <div className={styles.tableCount}>
          Viser {filteredUsers.length}{" "}
          {filteredUsers.length === 1 ? "medarbejder" : "medarbejdere"}
          {filteredUsers.length !== users.length && ` (ud af ${users.length})`}
        </div>

        {isLoading ? (
          <LoadingSpinner text="Henter brugere..." inline />
        ) : (
          <>
            <UsersTable
              users={filteredConflictEmployees}
              onView={handleOnView}
            />
            {filteredConflictEmployees.length === 0 && (
              <TableEmptyState
                text="Ingen medarbejdere matcher din søgning."
                onReset={resetSearch}
              />
            )}
          </>
        )}
      </Card>

      <Card variant="table">
        <div className={styles.cardHeader}>
          <TableSearch
            value={filter.search}
            onChange={(value) => handleFilterChange("search", value)}
            placeholder="Søg efter navn"
          />

          <div className={styles.filterGroup}></div>
        </div>

        <div className={styles.tableCount}>
          Viser {filteredUsers.length}{" "}
          {filteredUsers.length === 1 ? "medarbejder" : "medarbejdere"}
          {filteredUsers.length !== users.length && ` (ud af ${users.length})`}
        </div>

        {isLoading ? (
          <LoadingSpinner text="Henter medarbejdere..." inline />
        ) : (
          <>
            <UsersTable
              users={filteredAvailibilityEmployees}
              onView={handleOnView}
            />

            {filteredAvailibilityEmployees.length === 0 && (
              <TableEmptyState
                text="Ingen medarbejdere matcher din søgning."
                onReset={resetSearch}
              />
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default RessourcePlanningPage;
