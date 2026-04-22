import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/useAuth.jsx";
import { useToast } from "../components/shared/ToastProvider";

const LoginPage = () => {
  const { login } = useAuth();
  const { pushToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      pushToast("Email and password are required", "error");
      return;
    }

    setSubmitting(true);
    try {
      await login({ email: form.email.trim(), password: form.password });
      pushToast("Welcome back", "success");
      navigate("/dashboard");
    } catch (error) {
      pushToast(error?.response?.data?.message || "Unable to sign in", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="animate-fade-in">
      <h2 className="text-2xl font-bold text-brand-primary">Sign in</h2>
      <p className="mt-1 text-sm text-[#8f7161]">Monitor uptime across your services.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-primary">Email</label>
          <Input
            type="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="you@company.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-primary">Password</label>
          <Input
            type="password"
            value={form.password}
            onChange={(event) => update("password", event.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="mt-4 text-sm text-[#907563]">
        New to PulseKeep?{" "}
        <Link to="/register" className="font-semibold text-brand-primary">
          Create an account
        </Link>
      </p>
    </Card>
  );
};

export default LoginPage;
