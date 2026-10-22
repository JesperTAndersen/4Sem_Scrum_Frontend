import styles from "./ProjectGantt.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import Gantt from "frappe-gantt";

import getTaskProgress from "../../utils/getTaskProgress";
import Button from "@/shared/components/ui/Button/Button";
import { formatDate } from "@/utils/dateHelpers";
import SectionHeader from "@/shared/components/layout/SectionHeader/SectionHeader";

const COLUMN_WIDTH = { Day: 44, Week: 140 };
const PIXELS_PER_DAY = { Day: 44, Week: 20 };
const CHAR_WIDTH = 8;
const DAY_MS = 24 * 60 * 60 * 1000;

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

const fitNameToBar = (name, start, end, pixelsPerDay) => {
  const days = (new Date(end) - new Date(start)) / DAY_MS + 1;
  const maxChars = Math.floor((days * pixelsPerDay - 16) / CHAR_WIDTH);

  if (name.length <= maxChars) {
    return name;
  }

  return `${name.slice(0, Math.max(maxChars - 1, 1))}…`;
};

const getStatusClass = (status = "") =>
  `task-${status.toLowerCase().replaceAll("_", "-")}`;

const ProjectGantt = ({ project, onTaskClick }) => {
  const ganttRef = useRef(null);
  const [viewMode, setViewMode] = useState("Day");

  const ganttTasks = useMemo(() => {
    if (!project?.stages?.length) {
      return [];
    }

    return project.stages.flatMap((stage) => {
      const tasks = stage.tasks ?? [];
      const rows = [];

      if (stage.startDate && stage.endDate) {
        rows.push({
          id: `stage-${stage.id}`,
          name: fitNameToBar(
            stage.name,
            stage.startDate,
            stage.endDate,
            PIXELS_PER_DAY[viewMode],
          ),
          fullName: stage.name,
          start: stage.startDate,
          end: stage.endDate,
          progress: getStageProgress(tasks),
          dependencies: (stage.predecessorIds ?? [])
            .map((predecessorId) => `stage-${predecessorId}`)
            .join(","),
          custom_class: "stage-row",
        });
      }

      const taskRows = tasks
        .filter((task) => task.startDate && task.endDate)
        .map((task) => ({
          id: `task-${task.id}`,
          name: fitNameToBar(
            task.name,
            task.startDate,
            task.endDate,
            PIXELS_PER_DAY[viewMode],
          ),
          fullName: task.name,
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
  }, [project, viewMode]);

  const undeterminedTasks = (project?.stages ?? [])
    .flatMap((stage) => stage.tasks ?? [])
    .filter((task) => !task.startDate || !task.endDate);

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
        view_mode: viewMode,
        readonly: true,
        today_button: true,
        view_mode_select: false,
        column_width: COLUMN_WIDTH[viewMode],
        bar_height: 28,
        padding: 18,
        popup_on: "click",
        infinite_padding: false,

        popup: ({ task, set_title, set_subtitle, set_details }) => {
          set_title(task.fullName);
          set_subtitle("");
          set_details(`${formatDate(task.start)} – ${formatDate(task.end)}`);
        },

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
  }, [ganttTasks, project, onTaskClick, viewMode]);

  if (ganttTasks.length === 0 && undeterminedTasks.length === 0) {
    return <div className={styles.empty}>Ingen planlagte opgaver at vise.</div>;
  }

  return (
    <div className={styles.container}>
      <SectionHeader
        title="Tidsplan"
        description="Projektets etaper, opgaver og afhængigheder over tid."
      >
        <div className={styles.viewToggle}>
          <Button
            name="Dag"
            variant={viewMode === "Day" ? "primary" : "ghost"}
            onClick={() => setViewMode("Day")}
          />
          <Button
            name="Uge"
            variant={viewMode === "Week" ? "primary" : "ghost"}
            onClick={() => setViewMode("Week")}
          />
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
      </SectionHeader>

      {ganttTasks.length > 0 && (
        <div className={styles.scroller}>
          <div ref={ganttRef} className={styles.gantt} />
        </div>
      )}

      {undeterminedTasks.length > 0 && (
        <div className={styles.undetermined}>
          <h4 className={styles.undeterminedTitle}>
            Ikke med i tidsplanen ({undeterminedTasks.length})
          </h4>

          {undeterminedTasks.map((task) => (
            <div
              key={task.id}
              className={styles.undeterminedItem}
              onClick={() => onTaskClick?.(task)}
            >
              <span>{task.name}</span>
              <span className={styles.undeterminedText}>
                Varighed kan ikke beregnes
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectGantt;
