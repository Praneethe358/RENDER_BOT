import { Badge } from "../ui/badge";

const StatusBadge = ({ status }) => {
  const normalized = status === "UP" ? "UP" : "DOWN";
  return <Badge status={normalized}>{normalized}</Badge>;
};

export default StatusBadge;
