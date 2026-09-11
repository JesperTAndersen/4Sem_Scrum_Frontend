import apiClient from "@/api/apiclient";

const RESOURCE = "/projects";

const getAll = async () => {
  return await apiClient(RESOURCE);
};

const getById = async (id) => {
  return await apiClient(`${RESOURCE}/${id}`);
};

const update = async (id, body) => {
  return await apiClient(`${RESOURCE}/${id}`, {
    method: "PUT",
    body: body,
  });
};

const create = async (body) => {
  return await apiClient(RESOURCE, {
    method: "POST",
    body: body,
  });
};

const remove = async (id) => {
  return await apiClient(`${RESOURCE}/${id}`, {
    method: "DELETE",
  });
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
