import styles from "./StatCard.module.css";
import Card from "@/shared/components/ui/Card/Card";
import LoadingSpinner from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";

const StatCard = ({ title, value, subtext, cols, isLoading }) => {
  return (
    <Card cols={cols}>
      <div className={styles.statCard}>
        <span className={styles.title}>{title}</span>
        {isLoading ? (
          <LoadingSpinner text="Henter data..." inline />
        ) : (
          <>
            <span className={styles.value}>{value}</span>
            {subtext && <span className={styles.subtext}>{subtext}</span>}
          </>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
