import api from "./api";

export const fetchServices = async () => {
  const { data } = await api.get("/api/services");
  return data;
};

export const createService = async (payload) => {
  const { data } = await api.post("/api/services", payload);
  return data;
};

export const removeService = async (id) => {
  const { data } = await api.delete(`/api/services/${id}`);
  return data;
};
