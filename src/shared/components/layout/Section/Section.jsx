import styles from "./Section.module.css";
import Card from "../../ui/Card/Card";

const Section = ({ title, children }) => {
  return (
    <Card variant="flat">
      <h3 className={styles.title}>{title}</h3>
      {children}
    </Card>
  );
};

export default Section;
