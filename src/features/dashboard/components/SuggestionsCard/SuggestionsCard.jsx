import styles from '../shared/DashboardCards.module.css';
import Card from '../../../../components/ui/Card/Card';
import Badge from '../../../../components/ui/Badge/Badge';
import SeeAllLink from '../../../../components/ui/SeeAllLink/SeeAllLink';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner/LoadingSpinner';
import { useNavigate } from 'react-router';

const SuggestionsCard = ({ cols, suggestions = [], isLoading }) => {
  const navigate = useNavigate();

  return (
    <Card cols={cols}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Seneste ret-forslag</h3>
      </div>

      {isLoading ? (
        <LoadingSpinner text="Henter forslag..." inline />
      ) : (
        <div className={styles.listContainer}>
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              onClick={() =>
                navigate(`/admin/dish-suggestions/${suggestion.id}`)
              }
              className={`${styles.listItem} ${styles.clickable}`}
            >
              <div className={styles.itemInfo}>
                <h4 className={styles.itemName}>{suggestion.nameDA}</h4>
                <p className={styles.itemSubtext}>
                  {suggestion?.station.name} · Foreslået af{' '}
                  {suggestion.createdBy.firstName}
                </p>
              </div>
              <Badge status={suggestion.dishStatus} />
            </div>
          ))}
        </div>
      )}
      <div className={styles.footer}>
        <SeeAllLink to={'/admin/dish-suggestions'} text="Gå til ret-forslag" />
      </div>
    </Card>
  );
};

export default SuggestionsCard;
