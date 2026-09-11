import apiClient from "../../../api/apiClient";

const RESOURCE = "/users";

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

const getMe = async () => {
  return await apiClient(`${RESOURCE}/me`);
};

const assignRole = async (id, body) => {
  return await apiClient(`${RESOURCE}/${id}/role`, {
    method: "PATCH",
    body: body,
  });
};

const assignStation = async (userId, stationId) => {
  return await apiClient(`${RESOURCE}/${userId}/station/${stationId}`, {
    method: "PATCH",
  });
};

const changeEmail = async (id, body) => {
  return await apiClient(`${RESOURCE}/${id}/email`, {
    method: "PATCH",
    body: body,
  });
};

const changePassword = async (id, body) => {
  return await apiClient(`${RESOURCE}/${id}/password`, {
    method: "PATCH",
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
  getMe,
  update,
  assignRole,
  assignStation,
  changeEmail,
  changePassword,
  remove,
};
