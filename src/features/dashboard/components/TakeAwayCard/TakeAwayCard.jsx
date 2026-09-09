import styles from "../shared/DashboardCards.module.css";
import Card from "../../../../components/ui/Card/Card";
import Badge from "../../../../components/ui/Badge/Badge";
import SeeAllLink from "../../../../components/ui/SeeAllLink/SeeAllLink";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner/LoadingSpinner";

const TakeawayCard = ({ cols, offers = [], isLoading }) => {
  return (
    <Card cols={cols}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Dagens Takeaway</h3>
      </div>

      {isLoading ? (
        <LoadingSpinner text="Henter tilbud..." inline />
      ) : offers.length === 0 ? (
        <p className={styles.emptyText}>Ingen tilbud i dag</p>
      ) : (
        <div className={styles.listContainer}>
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`${styles.listItem} ${styles.clickable}`}
            >
              <div className={styles.itemInfo}>
                <h4 className={styles.itemName}>{offer.dish.dishNameDA}</h4>
                <p className={styles.itemSubtext}>
                  {offer.availablePortions} ud af {offer.offeredPortions}{" "}
                  portioner tilbage
                </p>
              </div>
              <Badge status={offer.soldOut ? "SOLD_OUT" : "ENABLED"} />
            </div>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <SeeAllLink text="Gå til takeaway" to="/admin/takeaway" />
      </div>
    </Card>
  );
};

export default TakeawayCard;
