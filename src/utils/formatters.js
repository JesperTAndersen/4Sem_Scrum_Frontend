export const formatUserRole = (userRole) => {
  if (!userRole) return "-";

  const roleTranslations = {
    ADMIN: "Administrator",
    PROJECT_MANAGER: "Projektleder",
  };

  return roleTranslations[userRole] || userRole;
};

export const createStationOptions = (stations) => {
  return [
    { value: "ALL", label: "Alle stationer" },

    ...stations.map((station) => ({
      value: station.name.toUpperCase(),
      label: station.name,
    })),
  ];
};
