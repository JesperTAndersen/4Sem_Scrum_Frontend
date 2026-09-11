import styles from './ProjetcsTable.module.css';
import Badge from '@shared/components/ui/Badge/Badge';
import { FiChevronRight } from 'react-icons/fi';

const ProjectsTable = ({ projects, onView }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Beskrivelse</th>
            <th>Oprettet af</th>
            <th>Tidslinje</th>
            <th>Antal opgaver</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id} className={styles.row} onClick={() => onView(p.id)}>
              <td>
                <div className={styles.nameCell}>
                  <span className={styles.title}>{p.name}</span>
                  <span className={styles.description}>{p.description}</span>
                </div>
              </td>
              <td>
                {p.createdBy.firstName} {p.createdBy.lastName}
              </td>
              <td>Start: {p.startDate} Slut: {p.endDate}</td>
              <td>{p?.totalTask ?? 0}</td>
              <td>
                <Badge status={p.status} />
              </td>
              <td>
                <FiChevronRight className={styles.chevron} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;
