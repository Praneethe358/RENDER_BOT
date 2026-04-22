import { useState } from "react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { INTERVAL_OPTIONS } from "../utils/constants";
import { useServices } from "../hooks/useServices";
import { useToast } from "../components/shared/ToastProvider";

const isValidUrl = (url) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (_error) {
    return false;
  }
};

const AddServicePage = () => {
  const { addService } = useServices({ autoLoad: false });
  const { pushToast } = useToast();

  const [form, setForm] = useState({
    name: "",
    url: "",
    interval: 10
  });
  const [submitting, setSubmitting] = useState(false);

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.url.trim()) {
      pushToast("Name and URL are required", "error");
      return;
    }

    if (!isValidUrl(form.url)) {
      pushToast("Please enter a valid http/https URL", "error");
      return;
    }

    if (Number(form.interval) < 5) {
      pushToast("Interval must be at least 5 minutes", "error");
      return;
    }

    setSubmitting(true);
    try {
      await addService({
        name: form.name.trim(),
        url: form.url.trim(),
        interval: Number(form.interval)
      });
      setForm({ name: "", url: "", interval: 10 });
      pushToast("Service added successfully", "success");
    } catch (err) {
      pushToast(err?.response?.data?.message || "Failed to add service", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto max-w-2xl animate-fade-in">
      <h3 className="text-2xl font-bold text-brand-primary">Add New Service</h3>
      <p className="mt-1 text-sm text-[#8e7060]">Configure endpoint monitoring and keep-alive checks.</p>

      <form className="mt-6 space-y-5" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-primary">Service Name</label>
          <Input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Production API"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-primary">Service URL</label>
          <Input
            value={form.url}
            onChange={(e) => update("url", e.target.value)}
            placeholder="https://example.com/health"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-primary">Ping Interval</label>
          <Select value={form.interval} onChange={(e) => update("interval", Number(e.target.value))}>
            {INTERVAL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <Button type="submit" disabled={submitting} className="w-full">
          {submitting ? "Adding..." : "Add Service"}
        </Button>
      </form>
    </Card>
  );
};

export default AddServicePage;
