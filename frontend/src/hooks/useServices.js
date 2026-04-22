import { useCallback, useEffect, useState } from "react";
import { createService, fetchServices, removeService } from "../services/serviceApi";

export const useServices = ({ autoLoad = true } = {}) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadServices = useCallback(async () => {
    try {
      setError("");
      const data = await fetchServices();
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load services");
    } finally {
      setLoading(false);
    }
  }, []);

  const addService = async (payload) => {
    const created = await createService(payload);
    setServices((prev) => [created, ...prev]);
    return created;
  };

  const deleteService = async (id) => {
    await removeService(id);
    setServices((prev) => prev.filter((service) => service._id !== id));
  };

  useEffect(() => {
    if (autoLoad) {
      loadServices();
    } else {
      setLoading(false);
    }
  }, [autoLoad, loadServices]);

  return {
    services,
    loading,
    error,
    loadServices,
    addService,
    deleteService
  };
};
