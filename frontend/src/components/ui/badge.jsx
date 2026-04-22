import { cn } from "../../utils/cn";

const styles = {
  UP: "bg-[#eaf7ef] text-brand-success border-[#cdebd7]",
  DOWN: "bg-[#fcebeb] text-brand-danger border-[#efcaca]",
  ALL: "bg-brand-accent text-brand-primary border-[#eee]"
};

export const Badge = ({ status = "ALL", children, className }) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
      styles[status] || styles.ALL,
      className
    )}
  >
    {children || status}
  </span>
);
