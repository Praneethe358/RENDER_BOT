import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/useAuth.jsx";
import { useToast } from "../components/shared/ToastProvider";

const RegisterPage = () => {
  const { register } = useAuth();
  const { pushToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [submitting, setSubmitting] = useState(false);

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      pushToast("Email and password are required", "error");
      return;
    }

    if (form.password.length < 8) {
      pushToast("Password must be at least 8 characters", "error");
      return;
    }

    if (form.password !== form.confirm) {
      pushToast("Passwords do not match", "error");
      return;
    }

    setSubmitting(true);
    try {
      await register({ email: form.email.trim(), password: form.password });
      pushToast("Account created", "success");
      navigate("/dashboard");
    } catch (error) {
      pushToast(error?.response?.data?.message || "Unable to register", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="animate-fade-in">
      <h2 className="text-2xl font-bold text-brand-primary">Create account</h2>
      <p className="mt-1 text-sm text-[#8f7161]">Start monitoring in minutes.</p>

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
            placeholder="Minimum 8 characters"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-primary">Confirm password</label>
          <Input
            type="password"
            value={form.confirm}
            onChange={(event) => update("confirm", event.target.value)}
            placeholder="Re-enter password"
          />
        </div>
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="mt-4 text-sm text-[#907563]">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-brand-primary">
          Sign in
        </Link>
      </p>
    </Card>
  );
};

export default RegisterPage;
