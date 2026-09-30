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

const ProjectGantt = (tasks, onTaskClicked) => {
  const ganttRef = useRef(null);
  const ganttTasks = useMemo(() => {
    if (!project?.stages.length) {
      return [0];
    }

    return project.stages.flatMap((stage) => {
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
    });
  });
};

export default ProjectGantt;
