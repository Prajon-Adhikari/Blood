import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export default function SignUpForm() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Signup failed");

      navigate("/api/auth/login");
    } catch (err) {
      console.log("Error while signup", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-xl font-semibold text-slate-900">Sign Up</h2>
      <p className="mb-4 text-sm text-slate-600">Create a new account.</p>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label
            className="block text-sm font-medium text-slate-700"
            htmlFor="signup-name"
          >
            Full Name
          </label>
          <input
            id="signup-name"
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
            placeholder="Jane Doe"
            autoComplete="name"
          />
        </div>

        <div className="space-y-1">
          <label
            className="block text-sm font-medium text-slate-700"
            htmlFor="signup-email"
          >
            Email
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            className="block text-sm font-medium text-slate-700"
            htmlFor="signup-password"
          >
            Password
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
            placeholder="At least 6 characters"
            autoComplete="new-password"
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
        >
          {loading ? "Please wait..." : "Create account"}
        </button>
      </form>
    </div>
  );
}
