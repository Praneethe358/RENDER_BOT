import { useCallback, useEffect, useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Select } from "../components/ui/select";
import EmptyState from "../components/shared/EmptyState";
import ErrorState from "../components/shared/ErrorState";
import LoadingState from "../components/shared/LoadingState";
import ServiceTable from "../components/shared/ServiceTable";
import ResponseChart from "../components/shared/ResponseChart";
import AnalyticsPanel from "../components/shared/AnalyticsPanel";
import { useServices } from "../hooks/useServices";
import { useIntervalRefresh } from "../hooks/useIntervalRefresh";
import { useToast } from "../components/shared/ToastProvider";
import { useAnalytics } from "../hooks/useAnalytics";

const DashboardPage = () => {
  const { services, loading, error, loadServices, deleteService } = useServices();
  const { pushToast } = useToast();
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const { data: analytics, loading: analyticsLoading, error: analyticsError, loadAnalytics } =
    useAnalytics(selectedServiceId);

  useIntervalRefresh(loadServices, 12000);
  useIntervalRefresh(loadAnalytics, 15000);

  const handleDelete = useCallback(
    async (id) => {
      try {
        await deleteService(id);
        pushToast("Service removed successfully", "success");
      } catch (err) {
        pushToast(err?.response?.data?.message || "Failed to delete service", "error");
      }
    },
    [deleteService, pushToast]
  );

  const upCount = services.filter((service) => service.status === "UP").length;

  useEffect(() => {
    if (!selectedServiceId && services.length > 0) {
      setSelectedServiceId(services[0]._id);
    }
  }, [selectedServiceId, services]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-sm text-[#86695b]">Total Services</p>
          <p className="mt-2 text-3xl font-extrabold text-brand-primary">{services.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-[#86695b]">Currently UP</p>
          <p className="mt-2 text-3xl font-extrabold text-brand-success">{upCount}</p>
        </Card>
        <Card>
          <p className="text-sm text-[#86695b]">Currently DOWN</p>
          <p className="mt-2 text-3xl font-extrabold text-brand-danger">{services.length - upCount}</p>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button variant="secondary" onClick={loadServices}>
          Refresh now
        </Button>
      </div>

      {loading ? <LoadingState /> : null}
      {!loading && error ? <ErrorState message={error} onRetry={loadServices} /> : null}
      {!loading && !error && services.length === 0 ? (
        <EmptyState
          title="No services added yet"
          subtitle="Start by adding your first endpoint to monitor uptime and keep services awake."
        />
      ) : null}
      {!loading && !error && services.length > 0 ? (
        <div className="space-y-5">
          <ServiceTable services={services} onDelete={handleDelete} />
          <ResponseChart services={services} />
          <Card className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-brand-primary">Analytics</h3>
              <p className="text-sm text-[#8d7060]">Uptime trends for a selected service.</p>
            </div>
            <div className="w-[220px]">
              <Select
                value={selectedServiceId}
                onChange={(event) => setSelectedServiceId(event.target.value)}
              >
                {services.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.name}
                  </option>
                ))}
              </Select>
            </div>
          </Card>
          {analyticsError ? (
            <ErrorState message={analyticsError} onRetry={loadAnalytics} />
          ) : (
            <AnalyticsPanel analytics={analytics} loading={analyticsLoading} />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default DashboardPage;
