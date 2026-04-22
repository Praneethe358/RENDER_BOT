import { Link } from "react-router-dom";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto flex min-h-screen max-w-[1200px] flex-col items-center justify-center px-4 py-10">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-brand-primary">PulseKeep</h1>
          <p className="text-sm text-[#8f7161]">Secure access to your uptime command center</p>
        </div>
        <div className="w-full max-w-lg">{children}</div>
        <p className="mt-6 text-xs text-[#a1897b]">
          By continuing, you agree to the PulseKeep terms and privacy policy.
        </p>
        <Link className="mt-3 text-xs font-semibold text-brand-primary" to="/dashboard">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
};

export default AuthLayout;
