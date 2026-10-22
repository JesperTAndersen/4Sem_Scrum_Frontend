import apiClient from "@/api/apiclient";

const RESOURCE_URL = "/employee";

const getOverAllocations = async (startDate, endDate) => {
  return await apiClient(`${RESOURCE_URL}/over-allocations`, {
    params: {
      startDate,
      endDate,
    },
  });
};

const getAvailability = async (date, competenceId) => {
  const params = { date };
  if (competenceId) {
    params.competenceId = competenceId;
  }
  return await apiClient(`${RESOURCE_URL}/availability`, {
    params,
  });
};

export default {
  getOverAllocations,
  getAvailability,
};
