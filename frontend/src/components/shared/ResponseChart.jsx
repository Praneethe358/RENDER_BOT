import { Card } from "../ui/card";
import { formatResponseTime } from "../../utils/formatters";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const ResponseChart = ({ services }) => {
  const data = services
    .filter((service) => typeof service.responseTime === "number")
    .map((service) => ({
      name: service.name,
      responseTime: service.responseTime
    }))
    .slice(0, 8);

  if (!data.length) {
    return null;
  }

  return (
    <Card className="animate-fade-in">
      <h3 className="mb-4 text-base font-bold text-brand-primary">Response Time Snapshot</h3>
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eadfd7" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#7d6051" }} />
            <YAxis tick={{ fontSize: 12, fill: "#7d6051" }} />
            <Tooltip
              formatter={(value) => formatResponseTime(value)}
              contentStyle={{ borderRadius: 14, borderColor: "#eadfd7" }}
            />
            <Line
              type="monotone"
              dataKey="responseTime"
              stroke="#8B5E3C"
              strokeWidth={3}
              dot={{ fill: "#5C4033", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ResponseChart;
