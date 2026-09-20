import styles from "./ProjectDetailPage.module.css";
import { useNotification } from "@/context/NotificationContext";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import projectService from "../../services/projectService";
import ProjectEditForm from "../../components/ProjectEditForm/ProjectEditForm";
import Card from "@/shared/components/ui/Card/Card";
import LoadingSpinner from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";
import Button from "@/shared/components/ui/Button/Button";
import ProjectDetailBar from "../../components/ProjectDetailBar/ProjectDetailBar";
import StagesList from "@/features/stages/components/StagesList/StagesList";
import ConfirmDialog from "@/shared/components/ui/ConfirmDialog/ConfirmDialog";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [project, setProject] = useState();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        const data = await projectService.getById(id);
        setProject(data);
        setUsers([data.createdBy]);
      } catch (error) {
        notify("error", error.message || "Kunne ikke hente projekt.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      const updated = await projectService.update(project.id, formData);
      setProject(updated);
      notify("success", `${updated.title} opdateret!`);
      setIsEditing(false);
    } catch (error) {
      notify("error", error.message || "Kunne ikke opdatere projekt.");
      throw error;
    }
  };

  const handleRemove = async () => {
    try {
      await projectService.remove(id);
      navigate("/projects", {
        state: { successMessage: `${project.title} blev slettet.` },
      });
    } catch (error) {
      const status = error?.status || error?.response?.status;

      if (status === 409) {
        notify(
          "error",
          "Projektet kan ikke slettes, fordi den allerede bruges i en eller form.",
        );
        setShowConfirm(false);
        return;
      }
      notify("error", error.message || "Kunne ikke slette projektet.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        {isLoading || !project ? (
          <LoadingSpinner text="Henter projekt..." inline />
        ) : (
          <>
            {!isEditing ? (
              <>
                <Card variant="card">
                  <ProjectDetailBar project={project} users={users}>
                    <Button
                      variant="danger"
                      name="Slet projekt"
                      onClick={() => setShowConfirm(true)}
                    />
                    <Button
                      variant="secondary"
                      name="Rediger projekt"
                      onClick={() => setIsEditing(true)}
                    />
                  </ProjectDetailBar>
                </Card>

                <Card variant="card">
                  <StagesList
                    projectId={project.id}
                    stages={project.stages || []}
                  />
                </Card>
              </>
            ) : (
              <Card variant="card">
                <ProjectEditForm
                  project={project}
                  onSubmit={handleUpdate}
                  onCancel={() => setIsEditing(false)}
                />
              </Card>
            )}
          </>
        )}

        {showConfirm && (
          <ConfirmDialog
            message={`Slet "${project.title}"?`}
            onConfirm={() => {
              handleRemove();
              setShowConfirm(false);
            }}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
