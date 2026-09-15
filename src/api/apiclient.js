const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";

const createError = (message, statusCode, data = null) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.data = data;
  return error;
};

const readBody = async (response) => {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
};

const apiClient = async (
  endpoint,
  {
    method = "GET",
    body = null,
    params = null,
    token: overrideToken = null,
    signal,
  } = {},
) => {
  const token = overrideToken ?? localStorage.getItem("token");
  const query = params ? `?${new URLSearchParams(params)}` : "";

  const config = {
    method,
    signal,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  let response;
  try {
    response = await fetch(`${BASE_URL}${endpoint}${query}`, config);
    console.log(response);
  } catch (err) {
    if (err.name === "AbortError") throw err;
    console.log(err);
    throw createError("Kunne ikke få forbindelse til serveren.", 0);
  }

  const isAuthEndpoint = endpoint.startsWith("/auth/");

  if (response.status === 401 && !isAuthEndpoint) {
    const message = "Din session er udløbet. Log ind igen.";
    window.dispatchEvent(
      new CustomEvent("auth:unauthorized", { detail: { message } }),
    );
    throw createError(message, 401);
  }

  if (response.status === 403 && !isAuthEndpoint) {
    const message = "Du har ikke adgang til denne handling.";
    window.dispatchEvent(
      new CustomEvent("auth:forbidden", { detail: { message } }),
    );
    throw createError(message, 403);
  }

  if (response.status === 204) return null;

  const data = await readBody(response);

  if (!response.ok) {
    throw createError(
      data?.message ?? `Der skete en fejl (${response.status})`,
      response.status,
      data,
    );
  }

  return data;
};

export default apiClient;
