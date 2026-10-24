import styles from "./ProjectGantt.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import Gantt from "frappe-gantt";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";

import getTaskProgress from "../../utils/getTaskProgress";
import Button from "@/shared/components/ui/Button/Button";
import { formatDate, toDateString } from "@/utils/dateHelpers";
import SectionHeader from "@/shared/components/layout/SectionHeader/SectionHeader";

const COLUMN_WIDTH = { Day: 44, Week: 140 };
const PIXELS_PER_DAY = { Day: 44, Week: 20 };
const CHAR_WIDTH = 8;
const DAY_MS = 24 * 60 * 60 * 1000;
const BAR_HEIGHT = 22;
const BAR_PADDING = 12;
const HEADER_HEIGHT = 100;
const MIN_HEIGHT = 400;
const SCREEN_SPACE = 140;
const EXPANDED_SPACE = 160;
const CONTEXT_ROWS = 2;

const getChartHeight = (rowCount, isExpanded) => {
  const contentHeight = HEADER_HEIGHT + rowCount * (BAR_HEIGHT + BAR_PADDING);
  const space = isExpanded ? EXPANDED_SPACE : SCREEN_SPACE;
  const screenHeight = Math.max(MIN_HEIGHT, window.innerHeight - space);

  return Math.min(contentHeight, screenHeight);
};

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

const byStartDate = (a, b) => {
  if (!a.startDate) return 1;
  if (!b.startDate) return -1;
  return new Date(a.startDate) - new Date(b.startDate) || a.id - b.id;
};

const getStatusClass = (status = "") =>
  `task-${status.toLowerCase().replaceAll("_", "-")}`;

const ProjectGantt = ({ project, onTaskClick }) => {
  const ganttRef = useRef(null);
  const [viewMode, setViewMode] = useState("Day");
  const [isExpanded, setIsExpanded] = useState(false);

  const ganttTasks = useMemo(() => {
    if (!project?.stages?.length) {
      return [];
    }

    return [...project.stages].sort(byStartDate).flatMap((stage) => {
      const tasks = [...(stage.tasks ?? [])].sort(byStartDate);
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

    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * DAY_MS);

    const gantt = new Gantt(
      container,
      ganttTasks.map((task) => ({ ...task })),
      {
        language: "da",
        view_mode: viewMode,
        readonly: true,
        today_button: true,
        view_mode_select: false,
        column_width: COLUMN_WIDTH[viewMode],
        bar_height: BAR_HEIGHT,
        padding: BAR_PADDING,
        container_height: getChartHeight(ganttTasks.length, isExpanded),
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

    const firstCurrentRow = ganttTasks.findIndex(
      (task) => task.end >= toDateString(today),
    );
    gantt.$container.scrollTop =
      Math.max(firstCurrentRow - CONTEXT_ROWS, 0) * (BAR_HEIGHT + BAR_PADDING);
    gantt.set_scroll_position(toDateString(weekAgo));

    return () => {
      container.innerHTML = "";
    };
  }, [ganttTasks, project, onTaskClick, viewMode, isExpanded]);

  if (ganttTasks.length === 0 && undeterminedTasks.length === 0) {
    return <div className={styles.empty}>Ingen planlagte opgaver at vise.</div>;
  }

  return (
    <div className={`${styles.container} ${isExpanded ? styles.expanded : ""}`}>
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

        <Button
          icon={
            isExpanded ? <FiMinimize2 size={18} /> : <FiMaximize2 size={18} />
          }
          name={isExpanded ? "Luk" : "Udvid"}
          variant="secondary"
          onClick={() => setIsExpanded(!isExpanded)}
        />

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
