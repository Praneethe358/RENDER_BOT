import api from "./api";

export const fetchServiceAnalytics = async (serviceId) => {
  const { data } = await api.get(`/api/analytics/${serviceId}`);
  return data;
};
