import styles from "./Badge.module.css";

const Badge = ({ status, label }) => {
  const normalizedStatus =
    typeof status === "boolean" ? (status ? "ACTIVE" : "DISABLED") : status;

  const statusColorMap = {
    PENDING: styles.warning,
    RESERVED: styles.warning,
    APPROVED: styles.success,
    PAID: styles.success,
    ACTIVE: styles.success,
    REJECTED: styles.danger,
    CANCELLED: styles.danger,
    SOLD_OUT: styles.danger,
    ENABLED: styles.success,
    DISABLED: styles.neutral,
    DRAFT: styles.neutral,
    PUBLISHED: styles.success,
    FINALIZED: styles.success,
  };

  const labelTranslations = {
    PENDING: "Afventer",
    RESERVED: "Reserveret",
    APPROVED: "Godkendt",
    PAID: "Betalt",
    ACTIVE: "Aktiv",
    REJECTED: "Afvist",
    CANCELLED: "Annulleret",
    SOLD_OUT: "Udsolgt",
    ENABLED: "Aktiv",
    DISABLED: "Deaktiveret",
    DRAFT: "Kladde",
    PUBLISHED: "Udgivet",
    FINALIZED: "Afsluttet",
  };

  const colorClass = statusColorMap[normalizedStatus] || styles.neutral;

  const displayLabel = labelTranslations[normalizedStatus] || normalizedStatus;

  return (
    <span className={`${styles.badge} ${colorClass}`}>{displayLabel}</span>
  );
};

export default Badge;
