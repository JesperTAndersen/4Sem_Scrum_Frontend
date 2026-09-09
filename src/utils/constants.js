export const ROLE_OPTIONS = [
  { value: "HEAD_CHEF", label: "Køkkenchef" },
  { value: "SOUS_CHEF", label: "Souschef" },
  { value: "LINE_COOK", label: "Kok" },
  { value: "CUSTOMER", label: "Kunde" },
];

export const roleRoutes = {
  HEAD_CHEF: "/admin/dashboard",
  SOUS_CHEF: "/admin/dashboard",
  LINE_COOK: "/kitchen",
  CUSTOMER: "/",
};
