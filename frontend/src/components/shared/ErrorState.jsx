import { AlertTriangle } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const ErrorState = ({ message, onRetry }) => (
  <Card className="flex flex-col items-start gap-3 border-[#f2d5d5] bg-[#fff8f8] animate-fade-in">
    <div className="flex items-center gap-2 text-brand-danger">
      <AlertTriangle className="h-5 w-5" />
      <h3 className="font-semibold">Something went wrong</h3>
    </div>
    <p className="text-sm text-[#8a6464]">{message}</p>
    <Button variant="secondary" onClick={onRetry}>
      Retry
    </Button>
  </Card>
);

export default ErrorState;
