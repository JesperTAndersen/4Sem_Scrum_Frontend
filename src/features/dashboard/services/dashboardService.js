import apiClient from "@/api/apiclient";

const RESOURCE_URL = "/summary";

const getAll = async () => {
  return await apiClient(RESOURCE_URL);
};

export default
{
    getAll
}