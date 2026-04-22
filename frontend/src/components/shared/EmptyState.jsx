import { DatabaseZap } from "lucide-react";
import { Card } from "../ui/card";

const EmptyState = ({ title, subtitle }) => (
  <Card className="flex flex-col items-center justify-center gap-2 py-12 text-center animate-fade-in">
    <DatabaseZap className="h-10 w-10 text-brand-secondary" />
    <h3 className="text-lg font-semibold text-brand-primary">{title}</h3>
    <p className="max-w-md text-sm text-[#836958]">{subtitle}</p>
  </Card>
);

export default EmptyState;
