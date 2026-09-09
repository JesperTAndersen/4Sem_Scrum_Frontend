export const formatUserRole = (userRole) => {
  if (!userRole) return "-";

  const roleTranslations = {
    ADMIN: "Administrator",
    PROJECT_MANAGER: "Projektleder",
  };

  return roleTranslations[userRole] || userRole;
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    maximumFractionDigits: 0,
  }).format(value);
