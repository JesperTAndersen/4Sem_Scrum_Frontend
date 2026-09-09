import styles from './RequestsCard.module.css';
import cardStyles from '../shared/DashboardCards.module.css';
import Card from '../../../../components/ui/Card/Card';
import Badge from '../../../../components/ui/Badge/Badge';
import SeeAllLink from '../../../../components/ui/SeeAllLink/SeeAllLink';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner/LoadingSpinner';
import { useNavigate } from 'react-router';
import { formatUnit } from '../../../ingredient-requests/utils/formatters';
import { formatRequestType } from '../../../ingredient-requests/utils/requestTypes';

const RequestsCard = ({ cols, requests = [], isLoading }) => {
  const navigate = useNavigate();

  return (
    <Card cols={cols}>
      <div className={cardStyles.cardHeader}>
        <h3 className={cardStyles.cardTitle}>Seneste vareanmodninger</h3>
      </div>

      {isLoading ? (
        <LoadingSpinner text="Henter anmodninger..." inline />
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Ingrediens</th>
                <th>Mængde</th>
                <th>Note</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={4} className={styles.empty}>
                    Ingen vareanmodninger
                  </td>
                </tr>
              ) : (
                requests.map((r) => (
                  <tr
                    key={r.id}
                    className={styles.row}
                    onClick={() =>
                      navigate(`/admin/ingredient-requests/${r.id}`)
                    }
                  >
                    <td>{r.name}</td>
                    <td>
                      {r.quantity} {formatUnit(r.unit)}
                    </td>
                    <td className={styles.noteCell}>
                      <span className={styles.note}>{r.note ?? '—'}</span>
                    </td>
                    <td>{formatRequestType(r.requestType)}</td>
                    <td>
                      <Badge status={r.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className={cardStyles.footer}>
        <SeeAllLink
          to="/admin/ingredient-requests"
          text="Gå til vareanmodninger"
        />
      </div>
    </Card>
  );
};

export default RequestsCard;
