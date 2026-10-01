import styles from "./ProjectsTable.module.css";
import Badge from "@/shared/components/ui/Badge/Badge";
import { FiChevronRight } from "react-icons/fi";
import { formatDate } from "@/utils/dateHelpers";

const ProjectsTable = ({ projects, onView }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Oprettet af</th>
            <th>Tidslinje</th>
            <th>Antal opgaver</th>
            <th>Deadline</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {projects.map((p) => (
            <tr
              key={p.id}
              className={styles.row}
              onClick={() => onView(p.id)}
            >
              <td>
                <div className={styles.nameCell}>
                  <span className={styles.title}>
                    {p.title}
                  </span>

                  <span className={styles.description}>
                    {p.description}
                  </span>
                </div>
              </td>

              <td>
                {p.createdBy.firstName} {p.createdBy.lastName}
              </td>

              <td>
                <div className={styles.infoCell}>
                  <span>
                    Start: {formatDate(p.startDate)}
                  </span>

                  <span >
                    Slut: {formatDate(p.deadline)}
                  </span>
                </div>
              </td>

              <td>
                {p?.taskCountDTO?.taskDone ?? 0} ud af{" "}
                {p?.taskCountDTO?.totalTaskCount ?? 0} færdige
              </td>

              <td>
                {p.schedule ? (
                  <div className={styles.infoCell}>
                    <Badge
                      status={
                        p.schedule.feasible
                          ? "FEASIBLE"
                          : "INFEASIBLE"
                      }
                    />

                    <span className={styles.date}>
                      Forventet:{" "}
                      {formatDate(
                        p.schedule.calculatedFinishDate,
                      )}
                    </span>
                  </div>
                ) : (
                  "-"
                )}
              </td>

              <td>
                <Badge status={p.status} />
              </td>

              <td>
                <FiChevronRight
                  className={styles.chevron}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;