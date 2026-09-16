import apiClient from "@/api/apiclient";

const RESOURCE_URL = '/competences';

const getAll = async () => {
  return await apiClient(RESOURCE_URL);
};


const getById = async (id) => {
  return await apiClient(`${RESOURCE_URL}/${id}`);
};

const create = async (body) => {
  return await apiClient(RESOURCE_URL, {
    method: 'POST',
    body: body,
  });
};

const update = async (id, body) => {
  return await apiClient(`${RESOURCE_URL}/${id}`, {
    method: 'PUT',
    body: body,
  });
};

const remove = async (id) => {
  return await apiClient(`${RESOURCE_URL}/${id}`, {
    method: 'DELETE',
  });
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
