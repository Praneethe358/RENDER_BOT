import { useCallback, useEffect, useState } from "react";
import { fetchServiceAnalytics } from "../services/analyticsApi";

export const useAnalytics = (serviceId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadAnalytics = useCallback(async () => {
    if (!serviceId) {
      return;
    }

    setLoading(true);
    try {
      setError("");
      const response = await fetchServiceAnalytics(serviceId);
      setData(response);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load analytics");
    } finally {
      setLoading(false);
    }
  }, [serviceId]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  return { data, loading, error, loadAnalytics };
};
