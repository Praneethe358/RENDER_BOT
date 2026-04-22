import { cn } from "../../utils/cn";

export const Card = ({ className, ...props }) => (
  <div
    className={cn(
      "rounded-2xl border border-[#efe7e2] bg-white p-5 shadow-card transition-all duration-200",
      className
    )}
    {...props}
  />
);
