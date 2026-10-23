import { createElement } from "react";
import styles from "./CompetenceIcon.module.css";
import { getCompetenceIcon } from "../../utils/competenceIcons";

const ICON_SIZES = {
  xs: 14,
  sm: 18,
  md: 20,
  lg: 32,
};

const CompetenceIcon = ({ name, size = "sm" }) => {
  const Icon = getCompetenceIcon(name);

  return (
    <div className={`${styles.icon} ${styles[size]}`} title={name}>
      {Icon
        ? createElement(Icon, { size: ICON_SIZES[size], strokeWidth: 1.8 })
        : name?.charAt(0).toUpperCase() || "?"}
    </div>
  );
};

export default CompetenceIcon;
