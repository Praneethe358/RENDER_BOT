import { useCallback, useEffect, useState } from "react";
import { fetchLogs } from "../services/logApi";

export const useLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLogs = useCallback(async () => {
    try {
      setError("");
      const data = await fetchLogs();
      setLogs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load logs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  return {
    logs,
    loading,
    error,
    loadLogs
  };
};
