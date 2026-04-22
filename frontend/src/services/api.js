import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  timeout: 10000
});

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("pulsekeep_auth");
  if (stored) {
    try {
      const { token } = JSON.parse(stored);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (_error) {
      localStorage.removeItem("pulsekeep_auth");
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("pulsekeep_auth");
      window.dispatchEvent(new Event("pulsekeep:logout"));
    }
    return Promise.reject(error);
  }
);

export default api;
