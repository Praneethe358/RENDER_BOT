import { cn } from "../../utils/cn";

export const Table = ({ className, ...props }) => (
  <div className="overflow-x-auto rounded-2xl border border-[#f0e8e3]">
    <table className={cn("min-w-full bg-white", className)} {...props} />
  </div>
);

export const THead = ({ className, ...props }) => (
  <thead className={cn("bg-brand-accent/70", className)} {...props} />
);

export const TBody = ({ className, ...props }) => <tbody className={cn(className)} {...props} />;

export const TR = ({ className, ...props }) => (
  <tr className={cn("border-b border-[#f2ece8] last:border-b-0", className)} {...props} />
);

export const TH = ({ className, ...props }) => (
  <th className={cn("px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#7e6353]", className)} {...props} />
);

export const TD = ({ className, ...props }) => (
  <td className={cn("px-4 py-3 text-sm text-brand-primary", className)} {...props} />
);
