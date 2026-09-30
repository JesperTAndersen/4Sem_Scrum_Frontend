import { useEffect, useMemo, useRef } from "react";
import Gantt from "frappe-gantt";
import getTaskProgress from "../../utils/getTaskProgress";

const getStageProgress = (tasks = []) => {
  if (tasks == 0) {
    return 0;
  }

  const totalProgress = tasks.reduce(
    (sum, task) => sum + getTaskProgress(task.status),
    0,
  );

  return Math.round(totalProgress / tasks.length);
};

const ProjectGantt = (project, onTaskClick) => {
  const ganttRef = useRef(null);
  const ganttTasks = useMemo(() => {
    if (!project?.stages.length) {
      return [0];
    }

    return project.stages.flatMap(
      (stage) => {
        const tasks = stage.tasks ?? [];

        const stageRow = {
          id: `stage-${stage.id}`,
          name: `Etape: ${stage.name}`,
          start: stage.startDate,
          end: stage.endDate,
          progress: getStageProgress(stage),
          dependencies: "",
          custom_class: "stage-row",
        };

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

            custom_class: `task-row task-${task.status.toLowerCase()}`,
          }));

        return [stageRow, ...taskRows];
      },
      [project],
    );
  });

  useEffect(() => {
    const container = ganttRef.current;

    if (!container || ganttTasks.length === 0) {
      return;
    }

    container.innerHTML = "";

    new Gantt(container, ganttTasks, {
      view_mode: "Day",
      readonly: true,
      scroll_to: "start",
      today_button: "true",
      view_mode_select: false,
      column_widt: 44,
      bar_height: 28,
      padding: 18,
      popup_on: "click",

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
    });

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
      </div>

      <div className={styles.scroller}>
        <div ref={ganttRef} className={styles.gantt} />
      </div>
    </div>
  );
};

export default ProjectGantt;
