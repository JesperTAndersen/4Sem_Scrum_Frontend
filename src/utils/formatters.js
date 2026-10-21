export const formatUserRole = (userRole) => {
  if (!userRole) return "-";

  const roleTranslations = {
    ADMIN: "Administrator",
    PROJECT_MANAGER: "Projektleder",
    EMPLOYEE: "Medarbejder",
  };

  return roleTranslations[userRole] || userRole;
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    maximumFractionDigits: 0,
  }).format(value);

export const formatNumber = (value) =>
  new Intl.NumberFormat("da-DK", { maximumFractionDigits: 1 }).format(value);
