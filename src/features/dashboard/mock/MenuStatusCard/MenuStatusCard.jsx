import { useNavigate } from "react-router";
import styles from "../shared/DashboardCards.module.css";
import Card from "../../../../components/ui/Card/Card";
import Badge from "../../../../components/ui/Badge/Badge";
import SeeAllLink from "../../../../components/ui/SeeAllLink/SeeAllLink";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner/LoadingSpinner";

const MenuStatusCard = ({ cols, menus = [], isLoading }) => {
  const navigate = useNavigate();

  return (
    <Card cols={cols}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Menuer</h3>
      </div>

      {isLoading ? (
        <LoadingSpinner text="Henter anmodninger..." inline />
      ) : (
        <div className={styles.listContainer}>
          {menus.length === 0 ? (
            <p className={styles.emptyText}>Ingen menuer oprettet endnu</p>
          ) : (
            menus.map((menu) => (
              <div
                key={menu.id}
                onClick={() => navigate(`/admin/menus/${menu.id}`)}
                className={`${styles.listItem} ${styles.clickable}`}
              >
                <div className={styles.itemInfo}>
                  <h4 className={styles.itemName}>
                    Uge {menu.weekNumber}, {menu.year}
                  </h4>
                  <p className={styles.itemSubtext}>
                    {menu.slotCount} {menu.slotCount === 1 ? "ret" : "retter"}{" "}
                    tilføjet
                  </p>
                </div>
                <Badge status={menu.menuStatus} />
              </div>
            ))
          )}
        </div>
      )}

      <div className={styles.footer}>
        <SeeAllLink to="/admin/menus" text="Gå til menuplanlægning" />
      </div>
    </Card>
  );
};

export default MenuStatusCard;
