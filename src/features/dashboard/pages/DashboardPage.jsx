import styles from "./DashboardPage.module.css";
import { useEffect, useState } from "react";
import { useNotification } from "../../../context/NotificationContext";
import { formatCurrency, formatNumber } from "@/utils/formatters";
import StatCard from "../components/StatCard/StatCard";
import AtRisksCard from "../components/AtRisksCard/AtRisksCard";
import UpcomingDeadlinesCard from "../components/UpcomingDeadlinesCard/UpcomingDeadlinesCard";
import TaskStatusCard from "../components/TaskStatusCard/TaskStatusCard";
import ProjectStatusCard from "../components/ProjectStatusCard/ProjectStatusCard";
import calculateEstimatedDays from "../utils/calculatedEstimatedDays";
import { useNavigate } from "react-router";
import dashboardService from "../services/dashboardService";
import calculateCostPerHour from "../utils/calculateCostPerHour";

const DashboardPage = () => {
  const { notify } = useNotification();
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const dashboardSummaryData = await dashboardService.getSummary();
        setSummary(dashboardSummaryData);
      } catch (error) {
        notify(
          "error",
          error.message || "Noget gik galt ved hentning af statistikken",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const handleOnView = (id) => {
    navigate(`/projects/${id}`);
  };

  const handleOnSelectStatus = (status) => {
    navigate("/projects", { state: { status } });
  };

  const activeProjects = summary
    ? summary.projects.total - summary.projects.byStatus.COMPLETED
    : "-";
  const atRiskCount = summary?.atRisk.length ?? 0;
  const estimatedDays = summary
    ? calculateEstimatedDays(
        summary.remainingHours,
        summary.capacity.dailyCapacity,
      )
    : null;
  const costPerHour = summary
    ? calculateCostPerHour(summary.totalCost, summary.totalEstimatedHours)
    : null;
    
  return (
    <div className={styles.contentArea}>
      <StatCard
        title="Aktive projekter"
        value={activeProjects}
        subtext={atRiskCount > 0 ? `${atRiskCount} i risiko` : "Ingen i risiko"}
        cols={3}
        isLoading={isLoading}
      />

      <StatCard
        title="Resterende arbejde"
        value={summary ? `${formatNumber(summary.remainingHours)} t` : "-"}
        subtext={
          summary &&
          `af ${formatNumber(summary.totalEstimatedHours)} t estimeret · ${
            estimatedDays !== null
              ? `≈ ${estimatedDays} arbejdsdage`
              : "ingen aktive medarbejdere"
          }`
        }
        cols={3}
        isLoading={isLoading}
      />

      <StatCard
        title="Aktiv projektværdi"
        value={summary ? formatCurrency(summary.totalCost) : "-"}
        subtext={
          summary &&
          (costPerHour !== null
            ? `≈ ${formatCurrency(costPerHour)} pr. time`
            : "Ingen estimerede timer")
        }
        cols={3}
        isLoading={isLoading}
      />

      <StatCard
        title="Kapacitet"
        value={
          summary
            ? `${formatNumber(summary.capacity.dailyCapacity)} t/dag`
            : "-"
        }
        subtext={
          summary && `${summary.capacity.activeEmployees} aktive medarbejdere`
        }
        cols={3}
        isLoading={isLoading}
      />

      <AtRisksCard
        cols={6}
        projects={summary?.atRisk}
        isLoading={isLoading}
        onView={handleOnView}
      />

      <UpcomingDeadlinesCard
        cols={6}
        projects={summary?.upcomingDeadlines}
        isLoading={isLoading}
        onView={handleOnView}
      />

      <TaskStatusCard cols={6} tasks={summary?.tasks} isLoading={isLoading} />

      <ProjectStatusCard
        cols={6}
        projects={summary?.projects}
        isLoading={isLoading}
        onSelectStatus={handleOnSelectStatus}
      />
    </div>
  );
};

export default DashboardPage;
