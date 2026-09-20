import styles from "./CompetenceManagementPage.module.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useNotification } from "@/context/NotificationContext";
import competenceService from "../../services/competenceService";
import PageHeader from "@/shared/components/layout/PageHeader/PageHeader";
import Card from "@/shared/components/ui/Card/Card";
import Button from "@/shared/components/ui/Button/Button";
import { FiPlusCircle } from "react-icons/fi";
import CompetenceTable from "../../components/CompetenceTable/CompetenceTable";
import CompetenceCreateForm from "../../components/CompentenceCreateForm/CompetenceCreateForm";
import TableSearch from "@/shared/components/filter/TableSearch/TableSearch";
import TableEmptyState from "@/shared/components/ui/TableEmptyState/TableEmptyState";
import LoadingSpinner from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";

const CompetenceManagementPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    const fetchCompetences = async () => {
      try {
        setIsLoading(true);
        const data = await competenceService.getAll();
        console.log(data);
        setCompetences(data);
      } catch (error) {
        console.log(error);
        notify(
          "error",
          error.message || "Noget gik galt ved hentning af kompetencer",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompetences();
  }, []);

  const handleOnView = (id) => {
    navigate(`/competences/${id}`);
  };

  const filteredCompetences = competences.length
    ? competences.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  const handleSubmit = async (formData) => {
    const data = await competenceService.create(formData);
    setCompetences((prev) => [...prev, data]);
    setShowForm(false);
    notify("success", `${data.name} blev oprettet.`);
  };

  return (
    <div className={styles.pageContainer}>
      <PageHeader
        title="Kompetenceadministration"
        subtitle="Opret og administrer kompetencer"
      />

      {showForm && (
        <Card cols={6} variant="flat">
          <CompetenceCreateForm
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
            placeholder="Søg efter kompetences navn"
          />

          <Button
            icon={<FiPlusCircle />}
            name="Opret kompetence"
            variant={showForm ? "secondary" : "primary"}
            onClick={() => setShowForm((p) => !p)}
          />
        </div>

        <div className={styles.tableCount}>
          Viser {filteredCompetences.length}{" "}
          {filteredCompetences.length === 1 ? "kompetence" : "kompetencer"}
          {filteredCompetences.length !== competences.length &&
            ` (ud af ${competences.length})`}
        </div>

        {isLoading || !competences ? (
          <LoadingSpinner text="Henter kompetencer..." inline />
        ) : (
          <>
            <CompetenceTable
              competences={filteredCompetences}
              onView={handleOnView}
            />
            {filteredCompetences.length === 0 && (
              <TableEmptyState
                text="Ingen kompetencer matcher din søgning."
                onReset={() => setSearch("")}
              />
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default CompetenceManagementPage;
