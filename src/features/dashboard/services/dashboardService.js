import apiClient from "@/api/apiclient";

const RESOURCE_URL = "/dashboard";

const getSummary = async () => {
  return await apiClient(`${RESOURCE_URL}/summary`);
};

export default {
  getSummary,
};
