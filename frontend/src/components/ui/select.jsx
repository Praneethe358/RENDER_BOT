import { cn } from "../../utils/cn";

export const Select = ({ className, children, ...props }) => {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-2xl border border-[#e9e1dc] bg-white px-3 text-sm text-brand-primary shadow-sm",
        "focus:outline-none focus:ring-2 focus:ring-brand-secondary",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
};
