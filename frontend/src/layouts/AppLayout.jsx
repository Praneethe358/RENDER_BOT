import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, ListPlus, Logs, Menu, X } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/add-service", label: "Add Service", icon: ListPlus },
  { to: "/logs", label: "Logs", icon: Logs }
];

const AppLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto flex max-w-[1400px] gap-5 px-4 py-4 sm:px-6 lg:px-8">
        <aside
          className={`fixed inset-y-4 left-4 z-40 w-64 rounded-2xl border border-[#efe6df] bg-white p-5 shadow-card transition-transform duration-300 lg:static lg:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-[120%] lg:translate-x-0"
          }`}
        >
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-brand-primary">PulseKeep</h1>
              <p className="text-xs text-[#9a7f6f]">Uptime command center</p>
            </div>
            <button className="lg:hidden" onClick={() => setOpen(false)}>
              <X className="h-5 w-5 text-brand-primary" />
            </button>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-brand-primary text-white shadow-soft"
                        : "text-brand-primary hover:bg-brand-accent"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {open && (
          <button
            className="fixed inset-0 z-30 bg-black/20 lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          />
        )}

        <main className="w-full lg:pl-0">
          <header className="mb-6 flex items-center justify-between rounded-2xl border border-[#efe6df] bg-white px-4 py-3 shadow-soft">
            <div>
              <h2 className="text-lg font-bold text-brand-primary">Operations Dashboard</h2>
              <p className="text-xs text-[#997c6d]">Observe health, latency, and service stability</p>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="rounded-xl border border-[#eadfd7] bg-brand-accent p-2 text-brand-primary lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
          </header>
          <section className="page-enter">{children}</section>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
