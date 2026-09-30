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

const ProjectGantt = () => {};

export default ProjectGantt;
