import styles from "./Card.module.css";

const Card = ({ cols = 12, children, variant = "default" }) => {
  return (
    <div
      className={`${styles.card} ${styles[variant]}`}
      style={{ gridColumn: `span ${cols}` }}
    >
      {children}
    </div>
  );
};

export default Card;
