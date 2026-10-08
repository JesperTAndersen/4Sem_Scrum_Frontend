import styles from "./EmployeeManagementPage.module.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useNotification } from "@/context/NotificationContext";
import employeeService from "../../services/employeeService";
import competenceService from "@/features/competences/services/competenceService";
import PageHeader from "@/shared/components/layout/PageHeader/PageHeader";
import Card from "@/shared/components/ui/Card/Card";
import Button from "@/shared/components/ui/Button/Button";
import { FiPlusCircle } from "react-icons/fi";
import EmployeeTable from "../../components/EmployeeTable/EmployeeTable";
import EmployeeCreateForm from "../../components/EmployeeCreateForm/EmployeeCreateForm";
import TableSearch from "@/shared/components/filter/TableSearch/TableSearch";
import TableEmptyState from "@/shared/components/ui/TableEmptyState/TableEmptyState";
import LoadingSpinner from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";

const EmployeeManagementPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [employees, setEmployees] = useState([]);
  const [competences, setCompetences] = useState([]);
  const { notify } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (location.state?.successMessage) {
      notify("success", location.state.successMessage);
      window.history.replaceState({}, "");
    }
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        const data = await employeeService.getAll();
        setEmployees(data);
      } catch (error) {
        notify(
          "error",
          error.message || "Noget gik galt ved hentning af medarbejdere",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchCompetences = async () => {
      try {
        const data = await competenceService.getAll();
        setCompetences(data);
      } catch (error) {
        notify("error", error.message || "Kunne ikke hente kompetencer");
      }
    };
    fetchCompetences();
  }, []);

  const handleOnView = (id) => {
    navigate(`/employees/${id}`);
  };

  const filteredEmployees = employees.length
    ? employees.filter((e) =>
        `${e.firstName} ${e.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      )
    : [];

  const handleSubmit = async (formData) => {
    const { competenceIds, ...employeeData } = formData;

    let data = await employeeService.create(employeeData);

    if (competenceIds.length > 0) {
      data = await employeeService.updateCompetences(data.id, competenceIds);
    }

    setEmployees((prev) => [...prev, data]);
    setShowForm(false);
    notify("success", `${data.firstName} ${data.lastName} blev oprettet.`);
  };

  return (
    <div className={styles.pageContainer}>
      <PageHeader
        title="Medarbejderadministration"
        subtitle="Opret og administrer medarbejdere"
      />

      {showForm && (
        <Card cols={6} variant="flat">
          <EmployeeCreateForm
            competences={competences}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        </Card>
      )}

      <Card variant="table">
        <div className={styles.cardHeader}>
          <TableSearch
            value={search}
            onChange={setSearch}
            placeholder="Søg efter medarbejderens navn"
          />

          <Button
            icon={<FiPlusCircle />}
            name="Opret medarbejder"
            variant={showForm ? "secondary" : "primary"}
            onClick={() => setShowForm((p) => !p)}
          />
        </div>

        <div className={styles.tableCount}>
          Viser {filteredEmployees.length}{" "}
          {filteredEmployees.length === 1 ? "medarbejder" : "medarbejdere"}
          {filteredEmployees.length !== employees.length &&
            ` (ud af ${employees.length})`}
        </div>

        {isLoading || !employees ? (
          <LoadingSpinner text="Henter medarbejdere..." inline />
        ) : (
          <>
            <EmployeeTable
              employees={filteredEmployees}
              onView={handleOnView}
            />
            {filteredEmployees.length === 0 && (
              <TableEmptyState
                text="Ingen medarbejdere matcher din søgning."
                onReset={() => setSearch("")}
              />
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default EmployeeManagementPage;
