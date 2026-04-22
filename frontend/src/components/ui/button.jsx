import { cn } from "../../utils/cn";

const variants = {
  default: "bg-brand-primary text-white hover:bg-[#4d352a]",
  secondary: "bg-brand-accent text-brand-primary hover:bg-[#ece8e6]",
  destructive: "bg-brand-danger text-white hover:bg-[#a63a3a]",
  ghost: "bg-transparent text-brand-primary hover:bg-brand-accent"
};

const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3",
  lg: "h-11 px-6"
};

export const Button = ({ className, variant = "default", size = "default", ...props }) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-secondary disabled:pointer-events-none disabled:opacity-50",
        "shadow-soft hover:-translate-y-0.5",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};
