import styles from "./DashboardPage.module.css";
import { useEffect, useState } from "react";
import { useNotification } from "../../../context/NotificationContext";
import StatCard from "../components/StatCard/StatCard";
import ProjectsCard from "../components/ProjectsCard/ProjectsCard";
import projects from "../mock/projectsMock";

const DashboardPage = () => {
  const { notify } = useNotification();

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
        value={801000}
        cols={4}
        isLoading={false}
      />

      <ProjectsCard cols={6} projects={projects} isLoading={false} />
    </div>
  );
};

export default DashboardPage;
