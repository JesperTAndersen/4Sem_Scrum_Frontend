import styles from "./DashboardPage.module.css";
import { useEffect, useState } from "react";
import { useNotification } from "../../../context/NotificationContext";
import { formatCurrency } from "@/utils/formatters";
import StatCard from "../components/StatCard/StatCard";
import ProjectsCard from "../components/ProjectsCard/ProjectsCard";
import AtRisksCard from "../components/AtRisksCard/AtRisksCard";
import calculateEstimatedDays from "../utils/calculatedEstimatedDays";
import { useNavigate } from "react-router";
import dashboardService from "../services/dashboardService";
import calculateCostPerHour from "../utils/calculateCostPerHour";
import { is } from "react-day-picker/locale";

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

  console.log(summary);

  return (
    <div className={styles.contentArea}>
      <StatCard
        title="Aktive projekter"
        value={summary?.projects?.byStatus?.IN_PROGRESS}
        subtext={
          summary?.atRisk.length
            ? `${summary?.atRisk.length} i risko`
            : "Ingen projekter i risko"
        }
        cols={3}
        isLoading={isLoading}
      />

      <StatCard
        title="Resterende arbejde"
        value={`${summary?.remainingHours} timer`}
        subtext={`af ${summary?.totalEstimatedHours} timer estimeret ca: ${calculateEstimatedDays(summary?.remainingHours)} dage`}
        cols={3}
        isLoading={isLoading}
      />

      <StatCard
        title="Aktiv projektværdi"
        value={formatCurrency(summary?.totalCost)}
        subtext={`ca: ${formatCurrency(calculateCostPerHour(summary?.totalCost, summary?.remainingHours))} /timen`}
        cols={3}
        isLoading={isLoading}
      />

      <StatCard
        title="Kapacitet"
        value={`${summary?.capacity.dailyCapacity} t/ dag`}
        subtext={`${summary?.capacity?.activeEmployees} aktive medarbejdere`}
        cols={3}
        isLoading={isLoading}
      />

      <AtRisksCard
        cols={6}
        projects={summary?.atRisk}
        isLoading={isLoading}
        onView={handleOnView}
      />

      <ProjectsCard
        cols={6}
        projects={[]}
        isLoading={isLoading}
        onView={handleOnView}
      />
    </div>
  );
};

export default DashboardPage;
