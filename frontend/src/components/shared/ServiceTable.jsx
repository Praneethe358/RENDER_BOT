import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Table, TBody, TD, TH, THead, TR } from "../ui/table";
import StatusBadge from "./StatusBadge";
import { formatDateTime, formatResponseTime } from "../../utils/formatters";

const ServiceTable = ({ services, onDelete }) => {
  return (
    <Card className="animate-fade-in">
      <Table>
        <THead>
          <TR>
            <TH>Service Name</TH>
            <TH>Status</TH>
            <TH>Response Time</TH>
            <TH>Last Ping</TH>
            <TH>Interval</TH>
            <TH className="text-right">Actions</TH>
          </TR>
        </THead>
        <TBody>
          {services.map((service) => (
            <TR key={service._id} className="hover:bg-[#fcfaf9] transition-colors">
              <TD className="font-semibold">{service.name}</TD>
              <TD>
                <StatusBadge status={service.status} />
              </TD>
              <TD>{formatResponseTime(service.responseTime)}</TD>
              <TD>{formatDateTime(service.lastPing)}</TD>
              <TD>{service.interval} min</TD>
              <TD className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-brand-danger hover:bg-[#fbeeee]"
                  onClick={() => onDelete(service._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </Card>
  );
};

export default ServiceTable;
