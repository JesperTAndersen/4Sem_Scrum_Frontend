import styles from "./ProjectDetailPage.module.css";
import { useNotification } from "@/context/NotificationContext";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import projectService from "../../services/projectService";
import ProjectEditForm from "../../components/ProjectEditForm/ProjectEditForm";
import Card from "@/shared/components/ui/Card/Card";
import LoadingSpinner from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";
import Button from "@/shared/components/ui/Button/Button";
import ProjectDetailBar from "../../components/ProjectDetailBar/ProjectDetailBar";
import StagesList from "@/features/stages/components/StagesList/StagesList";
import ConfirmDialog from "@/shared/components/ui/ConfirmDialog/ConfirmDialog";
import competenceService from "@/features/competences/services/competenceService";
import taskService from "@/features/tasks/services/taskService";
import { FiList } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import ProjectGantt from "../../components/ProjectGantt/ProjectGantt";
import TaskDetail from "@/features/tasks/components/TaskDetail/TaskDetail";
import Modal from "@/shared/components/ui/Modal/Modal";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [project, setProject] = useState();
  const [users, setUsers] = useState([]);
  const [competences, setCompetences] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [viewMode, setViewMode] = useState("details");

  const allTasks = project?.stages?.flatMap((stage) => stage.tasks ?? []) ?? [];
  const selectedTask = allTasks.find((task) => task.id === selectedTaskId);

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

  useEffect(() => {
    const fetchCompetences = async () => {
      setIsLoading(true);
      try {
        const data = await competenceService.getAll();
        setCompetences(data);
      } catch (error) {
        notify(
          "error",
          error.message ||
            "Kunne ikke hente kompetencer til opgave oprettelse - prøv igen.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompetences();
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

  const refreshProject = async () => {
    try {
      const data = await projectService.getById(id);
      setProject(data);
    } catch (error) {
      notify("error", error.message || "Kunne ikke opdatere tidsplanen.");
    }
  };

  const handleStageCreate = () => {
    refreshProject();
  };

  const handleStageEdit = () => {
    refreshProject();
  };

  const handleStageDelete = () => {
    refreshProject();
  };

  const handleTaskCreated = () => {
    refreshProject();
  };

  const handleOpenTask = useCallback((task) => {
    setSelectedTaskId(task.id);
  }, []);

  const handleDeleteTask = async () => {
    try {
      await taskService.remove(selectedTaskId);
      await refreshProject();
      notify("success", "Opgave slettet.");
    } catch (error) {
      notify("error", error.message || "Kunne ikke slette opgave.");
    } finally {
      setSelectedTaskId(null);
    }
  };

  const handleEditTask = async (formData) => {
    try {
      await taskService.update(selectedTaskId, formData);
      await refreshProject();
      notify("success", "Opgave opdateret.");
    } catch (error) {
      notify("error", error.message || "Kunne ikke opdatere opgaven.");
      throw error;
    } finally {
      setSelectedTaskId(null);
    }
  };

  const handleChangeStatusTask = async (currentTask, status) => {
    try {
      await taskService.update(currentTask.id, { status });
      await refreshProject();
      notify("success", "Opgavens status blev opdateret.");
    } catch (error) {
      notify("error", error.message || "Kunne ikke opdatere opgavens status.");
      throw error;
    }
  };

  const handleTaskDependencyAdd = async (taskId, predecessorId) => {
    try {
      await taskService.addPredecessor(taskId, predecessorId);
      await refreshProject();
      notify("success", "Afhængighed tilføjet.");
    } catch (error) {
      notify("error", error.message || "Kunne ikke tilføje afhængigheden.");
      throw error;
    }
  };

  const handleTaskDependencyRemove = async (taskId, predecessorId) => {
    try {
      await taskService.removePredecessor(taskId, predecessorId);
      await refreshProject();
      notify("success", "Afhængighed fjernet.");
    } catch (error) {
      notify("error", error.message || "Kunne ikke fjerne afhængigheden.");
      throw error;
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

                <div className={styles.viewToolbar}>
                  <div className={styles.viewToggle}>
                    <Button
                      icon={<FiList size={18} />}
                      name="Liste"
                      variant={viewMode === "details" ? "primary" : "ghost"}
                      title="Vis etaper og opgaver"
                      onClick={() => setViewMode("details")}
                    />

                    <Button
                      icon={<FiCalendar size={18} />}
                      name="Tidsplan"
                      variant={viewMode === "gantt" ? "primary" : "ghost"}
                      title="Vis projektets tidsplan"
                      onClick={() => setViewMode("gantt")}
                    />
                  </div>
                </div>
                {viewMode === "details" ? (
                  <Card variant="card">
                    <StagesList
                      projectId={project.id}
                      stages={project.stages || []}
                      competences={competences}
                      onStageCreated={handleStageCreate}
                      onStageEdited={handleStageEdit}
                      onStageDeleted={handleStageDelete}
                      onTaskCreated={handleTaskCreated}
                      onTaskView={handleOpenTask}
                    />
                  </Card>
                ) : (
                  <Card variant="card">
                    <ProjectGantt
                      project={project}
                      onTaskClick={handleOpenTask}
                    />
                  </Card>
                )}
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

        {selectedTask && (
          <Modal onClose={() => setSelectedTaskId(null)}>
            <Card>
              <TaskDetail
                task={selectedTask}
                tasks={allTasks}
                onTaskDelete={handleDeleteTask}
                onTaskStatusChange={handleChangeStatusTask}
                onTaskEdit={handleEditTask}
                competences={competences}
                onTaskDependencyAdd={handleTaskDependencyAdd}
                onTaskDependencyRemove={handleTaskDependencyRemove}
              />
            </Card>
          </Modal>
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
