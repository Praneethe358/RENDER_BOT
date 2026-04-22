import { useCallback } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import EmptyState from "../components/shared/EmptyState";
import ErrorState from "../components/shared/ErrorState";
import LoadingState from "../components/shared/LoadingState";
import ServiceTable from "../components/shared/ServiceTable";
import ResponseChart from "../components/shared/ResponseChart";
import { useServices } from "../hooks/useServices";
import { useIntervalRefresh } from "../hooks/useIntervalRefresh";
import { useToast } from "../components/shared/ToastProvider";

const DashboardPage = () => {
  const { services, loading, error, loadServices, deleteService } = useServices();
  const { pushToast } = useToast();

  useIntervalRefresh(loadServices, 12000);

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
        </div>
      ) : null}
    </div>
  );
};

export default DashboardPage;
