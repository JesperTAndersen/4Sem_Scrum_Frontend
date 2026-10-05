import styles from "./DashboardPage.module.css";
import { useEffect, useState } from "react";
import { useNotification } from "../../../context/NotificationContext";
import { formatCurrency } from "@/utils/formatters";
import StatCard from "../components/StatCard/StatCard";
import ProjectsCard from "../components/ProjectsCard/ProjectsCard";
import projectService from "@/features/projects/services/projectService";
import { useNavigate } from "react-router";

const DashboardPage = () => {
  const { notify } = useNotification();
  const [projects, setProjects] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


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

  const handleOnView = (id) => {
    navigate(`/projects/${id}`);
  }

  return (
    <div className={styles.contentArea}>
      <StatCard
        title="Aktive projekter"
        value={3}
        subtext="1 kladde, 1 planlagt"
        cols={4}
        isLoading={false}
      />

      <StatCard
        title="Estimerede timer"
        subtext="På tværs af alle projekter"
        value={1240}
        cols={4}
        isLoading={false}
      />

      <StatCard
        title="Estimeret lønomkostning"
        subtext={"Baseret på 5 kompetencer"}
        value={formatCurrency(800123)}
        cols={4}
        isLoading={false}
      />

      <ProjectsCard cols={6} projects={projects} isLoading={isLoading} onView={handleOnView} />
    </div>
  );
};

export default DashboardPage;
