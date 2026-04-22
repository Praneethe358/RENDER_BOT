import api from "./api";

export const loginUser = async (payload) => {
  const { data } = await api.post("/api/auth/login", payload);
  return data;
};

export const registerUser = async (payload) => {
  const { data } = await api.post("/api/auth/register", payload);
  return data;
};

export const fetchProfile = async () => {
  const { data } = await api.get("/api/auth/me");
  return data;
};
