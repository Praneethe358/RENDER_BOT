import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

const AnalyticsPanel = ({ analytics, loading }) => {
  if (loading) {
    return (
      <Card className="space-y-3">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-40 w-full" />
      </Card>
    );
  }

  if (!analytics) {
    return null;
  }

  const series = (analytics.series || []).map((entry) => ({
    time: new Date(entry.timestamp).toLocaleTimeString(),
    responseTime: entry.responseTime ?? 0,
    status: entry.status
  }));

  return (
    <Card className="animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-[#8a6f60]">Uptime percentage</p>
          <h4 className="text-3xl font-extrabold text-brand-primary">{analytics.uptimePercentage}%</h4>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#8a6f60]">Checks analyzed</p>
          <p className="text-lg font-semibold text-brand-primary">{analytics.totalChecks}</p>
        </div>
      </div>
      <div className="mt-6 h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <defs>
              <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5E3C" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#8B5E3C" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#eadfd7" />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#7d6051" }} />
            <YAxis tick={{ fontSize: 11, fill: "#7d6051" }} />
            <Tooltip contentStyle={{ borderRadius: 14, borderColor: "#eadfd7" }} />
            <Area
              type="monotone"
              dataKey="responseTime"
              stroke="#5C4033"
              fillOpacity={1}
              fill="url(#colorLatency)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default AnalyticsPanel;
