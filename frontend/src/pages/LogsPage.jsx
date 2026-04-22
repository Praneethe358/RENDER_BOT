import { useMemo, useState } from "react";
import { Card } from "../components/ui/card";
import { Select } from "../components/ui/select";
import { Table, TBody, TD, TH, THead, TR } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import EmptyState from "../components/shared/EmptyState";
import ErrorState from "../components/shared/ErrorState";
import LoadingState from "../components/shared/LoadingState";
import StatusBadge from "../components/shared/StatusBadge";
import { STATUS_OPTIONS } from "../utils/constants";
import { formatDateTime, formatResponseTime } from "../utils/formatters";
import { useLogs } from "../hooks/useLogs";
import { useIntervalRefresh } from "../hooks/useIntervalRefresh";

const LogsPage = () => {
  const { logs, loading, error, loadLogs } = useLogs();
  const [statusFilter, setStatusFilter] = useState("ALL");

  useIntervalRefresh(loadLogs, 15000);

  const filteredLogs = useMemo(() => {
    if (statusFilter === "ALL") {
      return logs;
    }
    return logs.filter((log) => log.status === statusFilter);
  }, [logs, statusFilter]);

  return (
    <div className="space-y-5">
      <Card className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-brand-primary">Ping Logs</h3>
          <p className="text-sm text-[#8d7060]">Track uptime outcomes across all monitored services.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#7f6352]">Status Filter</span>
          <div className="w-[150px]">
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </Card>

      {loading ? <LoadingState /> : null}
      {!loading && error ? <ErrorState message={error} onRetry={loadLogs} /> : null}
      {!loading && !error && filteredLogs.length === 0 ? (
        <EmptyState
          title="No logs available"
          subtitle="As services are pinged, run history and response metrics will appear here."
        />
      ) : null}

      {!loading && !error && filteredLogs.length > 0 ? (
        <Card className="animate-fade-in">
          <Table>
            <THead>
              <TR>
                <TH>Service Name</TH>
                <TH>Status</TH>
                <TH>Response Time</TH>
                <TH>Timestamp</TH>
              </TR>
            </THead>
            <TBody>
              {filteredLogs.map((log) => (
                <TR key={log._id || `${log.serviceId}-${log.timestamp}`} className="hover:bg-[#fcfaf9]">
                  <TD className="font-semibold">{log.serviceName || log.service?.name || "Unknown Service"}</TD>
                  <TD>
                    <StatusBadge status={log.status} />
                  </TD>
                  <TD>{formatResponseTime(log.responseTime)}</TD>
                  <TD>{formatDateTime(log.timestamp)}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </Card>
      ) : null}

      <div className="flex items-center gap-2">
        <Badge status="ALL">Live refresh</Badge>
        <span className="text-xs text-[#8d7161]">Logs refresh every 15 seconds</span>
      </div>
    </div>
  );
};

export default LogsPage;
