import { cn } from "../../utils/cn";

export const Input = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-2xl border border-[#e9e1dc] bg-white px-3 text-sm text-brand-primary shadow-sm transition-colors",
        "placeholder:text-[#a99588] focus:outline-none focus:ring-2 focus:ring-brand-secondary",
        className
      )}
      {...props}
    />
  );
};
