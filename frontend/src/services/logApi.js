import api from "./api";

export const fetchLogs = async () => {
  const { data } = await api.get("/api/logs");
  return data;
};
