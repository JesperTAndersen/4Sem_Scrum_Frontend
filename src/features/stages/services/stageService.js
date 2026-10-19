import apiClient from "@/api/apiclient";

const RESOURCE_URL = "/stages";

const getAll = async () => {
  return await apiClient(RESOURCE_URL);
};

const getById = async (id) => {
  return await apiClient(`${RESOURCE_URL}/${id}`);
};

const create = async (body) => {
  return await apiClient(RESOURCE_URL, {
    method: "POST",
    body: body,
  });
};

const update = async (id, body) => {
  return await apiClient(`${RESOURCE_URL}/${id}`, {
    method: "PUT",
    body: body,
  });
};

const addPredecessor = async (stageId, predecessorId) => {
  return await apiClient(
    `${RESOURCE_URL}/${stageId}/predecessors/${predecessorId}`,
    { method: "POST" },
  );
};

const removePredecessor = async (stageId, predecessorId) => {
  return await apiClient(
    `${RESOURCE_URL}/${stageId}/predecessors/${predecessorId}`,
    { method: "DELETE" },
  );
};

const remove = async (id) => {
  return await apiClient(`${RESOURCE_URL}/${id}`, {
    method: "DELETE",
  });
};

export default {
  getAll,
  getById,
  create,
  update,
  addPredecessor,
  removePredecessor,
  remove,
};
