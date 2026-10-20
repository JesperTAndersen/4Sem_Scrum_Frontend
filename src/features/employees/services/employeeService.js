import apiClient from "@/api/apiclient";

const RESOURCE_URL = "/employee";

const getAll = async (params) => {
  return await apiClient(RESOURCE_URL, { params });
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

const updateCompetences = async (id, competenceIds) => {
  return await apiClient(`${RESOURCE_URL}/${id}/competences`, {
    method: "PUT",
    body: { competenceIds },
  });
};

const getCapacity = async (params) => {
  return await apiClient(`${RESOURCE_URL}/capacity`, { params });
};

const activate = async (id) => {
  return await apiClient(`${RESOURCE_URL}/${id}/activate`, {
    method: "PATCH",
  });
};

const deActivate = async (id) => {
  return await apiClient(`${RESOURCE_URL}/${id}/deactivate`, {
    method: "PATCH",
  });
};

const remove = async (id) => {
  return await apiClient(`${RESOURCE_URL}/${id}`, {
    method: "DELETE",
  });
};

export default {
  getAll,
  getCapacity,
  getById,
  create,
  activate,
  deActivate,
  update,
  updateCompetences,
  remove,
};
