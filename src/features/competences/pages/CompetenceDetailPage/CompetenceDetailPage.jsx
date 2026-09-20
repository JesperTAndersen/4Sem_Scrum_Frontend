import styles from "./CompetenceDetailPage.module.css";
import { useState, useEffect } from "react";
import { useNotification } from "@/context/NotificationContext";
import { useNavigate, useParams } from "react-router";
import competenceService from "../../services/competenceService";
import CompetenceDetail from "../../components/CompetenceDetail/CompetenceDetail";
import PageHeader from "@shared/components/layout/PageHeader/PageHeader";
import Card from "@shared/components/ui/Card/Card";
import Button from "@shared/components/ui/Button/Button";
import ConfirmDialog from "@shared/components/ui/ConfirmDialog/ConfirmDialog";
import LoadingSpinner from "@shared/components/ui/LoadingSpinner/LoadingSpinner";

const CompetenceDetailPage = () => {
  const { id } = useParams();
  const { notify } = useNotification();
  const navigate = useNavigate();
  const [competence, setCompetence] = useState(null);
  const [users, setUsers] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const competenceData = await competenceService.getById(id);
        {
          /* TODO: const usersData = await competenceService.getUsersByCompetence(id); */
        }
        setCompetence(competenceData);
        setUsers(usersData);
      } catch (error) {
        notify("error", error.message || "Kunne ikke hente kompetence");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await competence.remove(id);
      navigate("/competence", {
        state: {
          successMessage: `${competence.name} blev slettet`,
        },
      });
    } catch (error) {
      notify("error", error.message || "Kunne ikke slette kompetencen.");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const updated = await competenceService.update(competence.id, formData);
      setCompetence(updated);
      notify("success", "Kompetence opdateret.");
      setIsEditing(false);
    } catch (error) {
      notify("error", error.message || "Kunne ikke opdatere kompetencen.");
      throw error;
    }
  };

  return (
    <div className={styles.pageContainer}>
      {isLoading || !competence ? (
        <LoadingSpinner text="Henter kompetence..." inline />
      ) : (
        <>
          <PageHeader
            title={competence.name}
            subtitle="Detaljer og administration af kompetence"
          />

          <div className={styles.contentWrapper}>
            <Card variant="flat">
              {isEditing ? (
                <StationEditForm
                  station={competence}
                  onSubmit={handleUpdate}
                  onCancel={() => setIsEditing(false)}
                />
              ) : (
                <CompetenceDetail station={competence} users={users}>
                  <Button
                    variant="danger"
                    name="Slet kompetence"
                    onClick={() => setShowConfirm(true)}
                  />
                  <div className={styles.positiveActions}>
                    <Button
                      variant="secondary"
                      name="Rediger kompetence"
                      onClick={() => setIsEditing(true)}
                    />
                  </div>
                </CompetenceDetail>
              )}
            </Card>

            {showConfirm && (
              <ConfirmDialog
                message={`Slet "${competence.name}"?`}
                onConfirm={() => {
                  handleDelete();
                  setShowConfirm(false);
                }}
                onCancel={() => setShowConfirm(false)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CompetenceDetailPage;
