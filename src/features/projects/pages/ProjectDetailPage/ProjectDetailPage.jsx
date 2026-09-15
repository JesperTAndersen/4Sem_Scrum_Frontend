import { useNotification } from "@/context/NotificationContext";
import { useState } from "react";
import { useParams } from "react-router";
import projectService from "../../services/projectService";
import ProjectEditForm from "../../components/ProjectEditForm/ProjectEditForm";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const { notify } = useNotification();
  const [project, setProject] = useState();
  const [expandedStages, setExpandedStages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        const data = await projectService.getById(id);
        setDish(data);
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
      const updated = await projectService.update(dish.id, formData);
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
      <PageHeader title={project.title} subtitle={project?.description} />

      <div className={styles.contentWrapper}>
        <Card variant="flat">
          {isLoading || !dish ? (
            <LoadingSpinner text="Henter projekt..." inline />
          ) : (
            <>
              {!isEditing ? (
                <div>Hej her kommer projektet</div>
              ) : (
                <ProjectEditForm
                  project={project}
                  onSubmit={handleUpdate}
                  onCancel={() => setIsEditing(false)}
                />
              )}
            </>
          )}
        </Card>

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
