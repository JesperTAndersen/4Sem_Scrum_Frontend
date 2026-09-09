import apiClient from "@/api/apiclient";

const login = async (credentials) => {
  const loginData = await apiClient("/auth/login", {
    method: "POST",
    body: credentials,
  });

  const fullProfile = await apiClient("/users/me", {
    token: loginData.token,
  });

  return {
    user: fullProfile,
    token: loginData.token,
  };
};

const register = async (user) => {
  return await apiClient("/auth/register", {
    method: "POST",
    body: user,
  });
};

export default { login, register };
