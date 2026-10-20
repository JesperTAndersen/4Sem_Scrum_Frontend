import apiClient from "@/api/apiclient";

const RESOURCE_URL = "/tasks";

const getAll = async () => {
  return await apiClient(RESOURCE_URL);
};

const getById = async (id) => {
  return await apiClient(`${RESOURCE_URL}/${id}`);
};

const create = async (body) => {
  return await apiClient(RESOURCE_URL, {
    method: "POST",
    body,
  });
};

const update = async (id, body) => {
  return await apiClient(`${RESOURCE_URL}/${id}`, {
    method: "PUT",
    body,
  });
};

const remove = async (id) => {
  return await apiClient(`${RESOURCE_URL}/${id}`, {
    method: "DELETE",
  });
};

const addPredecessor = async (taskId, predecessorId) => {
  return await apiClient(
    `${RESOURCE_URL}/${taskId}/predecessors/${predecessorId}`,
    {
      method: "POST",
    },
  );
};

const removePredecessor = async (taskId, predecessorId) => {
  return await apiClient(
    `${RESOURCE_URL}/${taskId}/predecessors/${predecessorId}`,
    {
      method: "DELETE",
    },
  );
};

const replaceEmployees = async (taskId, employeeIds) => {
  return await apiClient(`${RESOURCE_URL}/${taskId}/employees`, {
    method: "PUT",
  });
};

const unAssignEmployees = async (taskId, employeeId) => {
  return await apiClient(`${RESOURCE_URL}/${taskId}/employees`, {
    method: "DELETE",
  });
};

const assignEmployees = async (taskId, employeeId) => {
  return await apiClient(`${RESOURCE_URL}/${taskId}/employees`, {
    method: "POST",
  });
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
  addPredecessor,
  removePredecessor,
  replaceEmployees,
  unAssignEmployees,
  assignEmployees
};
