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

const activate = async (id) => {
  return await apiClient(`${RESOURCE}/${id}/activate`, {
    method: 'PATCH',
  });
};

const deActivate = async (id) => {
  return await apiClient(`${RESOURCE}/${id}/deactivate`, {
    method: 'PATCH',
  });
};

const update = async (id, body) => {
  return await apiClient(`${RESOURCE_URL}/${id}`, {
    method: "PUT",
    body: body,
  });
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
  activate,
  deActivate,
  update,
  remove,
};
