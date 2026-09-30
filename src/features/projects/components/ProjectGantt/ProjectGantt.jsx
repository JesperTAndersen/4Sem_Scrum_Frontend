import styles from "./ProjectGantt.module.css";
import { useEffect, useMemo, useRef } from "react";
import Gantt from "frappe-gantt";

import getTaskProgress from "../../utils/getTaskProgress";

const getStageProgress = (tasks = []) => {
  if (tasks.length === 0) {
    return 0;
  }

  const totalProgress = tasks.reduce(
    (sum, task) => sum + getTaskProgress(task.status),
    0,
  );

  return Math.round(totalProgress / tasks.length);
};

const getStatusClass = (status = "") =>
  `task-${status.toLowerCase().replaceAll("_", "-")}`;

const ProjectGantt = ({ project, onTaskClick }) => {
  const ganttRef = useRef(null);

  const ganttTasks = useMemo(() => {
    if (!project?.stages?.length) {
      return [];
    }

    return project.stages.flatMap((stage, index) => {
      const tasks = stage.tasks ?? [];
      const rows = [];

      if (stage.startDate && stage.endDate) {
        rows.push({
          id: `stage-${stage.id}`,
          name: `Etape: ${index + 1}: ${stage.name}`,
          start: stage.startDate,
          end: stage.endDate,
          progress: getStageProgress(tasks),
          dependencies: "",
          custom_class: "stage-row",
        });
      }

      const taskRows = tasks
        .filter((task) => task.startDate && task.endDate)
        .map((task) => ({
          id: `task-${task.id}`,
          name: `↳ ${task.name}`,
          start: task.startDate,
          end: task.endDate,
          progress: getTaskProgress(task.status),
          dependencies: (task.predecessorIds ?? [])
            .map((predecessorId) => `task-${predecessorId}`)
            .join(","),
          custom_class: getStatusClass(task.status),
        }));

      return [...rows, ...taskRows];
    });
  }, [project]);

  useEffect(() => {
    const container = ganttRef.current;

    if (!container || ganttTasks.length === 0) {
      return;
    }

    container.innerHTML = "";

    new Gantt(
      container,
      ganttTasks.map((task) => ({ ...task })),
      {
        view_mode: "Day",
        readonly: true,
        today_button: true,
        view_mode_select: false,
        column_width: 44,
        bar_height: 28,
        padding: 18,
        popup_on: "click",
        infinite_padding: false,

        on_click: (ganttTask) => {
          if (!ganttTask.id.startsWith("task-")) {
            return;
          }

          const taskId = Number(ganttTask.id.replace("task-", ""));

          const originalTask = project.stages
            .flatMap((stage) => stage.tasks ?? [])
            .find((task) => task.id === taskId);

          if (originalTask) {
            onTaskClick?.(originalTask);
          }
        },
      },
    );

    return () => {
      container.innerHTML = "";
    };
  }, [ganttTasks, project, onTaskClick]);

  if (ganttTasks.length === 0) {
    return <div className={styles.empty}>Ingen planlagte opgaver at vise.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Tidsplan</h3>

          <p className={styles.description}>
            Projektets etaper, opgaver og afhængigheder.
          </p>
        </div>

        <ul className={styles.legend}>
          <li>
            <span className={`${styles.swatch} ${styles.swatchStage}`} />
            Etape
          </li>
          <li>
            <span className={`${styles.swatch} ${styles.swatchNotStarted}`} />
            Ikke startet
          </li>
          <li>
            <span className={`${styles.swatch} ${styles.swatchInProgress}`} />I
            gang
          </li>
          <li>
            <span className={`${styles.swatch} ${styles.swatchDone}`} />
            Færdig
          </li>
        </ul>
      </div>

      <div className={styles.scroller}>
        <div ref={ganttRef} className={styles.gantt} />
      </div>
    </div>
  );
};

export default ProjectGantt;
