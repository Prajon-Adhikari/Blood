import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export default function SignUpForm() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 px-4 py-10 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-100 ring-1 ring-white/10">
            Sign up
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">Create your account</h1>
          <p className="text-sm text-slate-200/80 sm:text-base">
            Join the portal to manage blood donors and requests. Set your API base URL in{" "}
            <code className="rounded bg-white/10 px-1">frontend/.env</code> so this form can reach
            the backend.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-200/70">
            <span className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/10">
              Quick signup
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/10">
              Secure passwords
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/10">
              Mobile friendly
            </span>
          </div>
        </div>

        <div className="flex-1">
          <div className="rounded-2xl bg-white/10 p-1 ring-1 ring-white/10 backdrop-blur">
            <div className="rounded-xl bg-white p-8 text-slate-900 shadow-2xl">
              <div className="mb-6 flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Sign up</h2>
                  <p className="text-sm text-slate-600">Create a new account.</p>
                </div>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">
                  New
                </span>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
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
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-indigo-500 focus:ring-2"
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
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-indigo-500 focus:ring-2"
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
                  <div className="relative">
                    <input
                      id="signup-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 pr-10 text-slate-900 outline-none ring-indigo-500 focus:ring-2"
                      placeholder="At least 6 characters"
                      autoComplete="new-password"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-2 flex items-center text-slate-500 hover:text-slate-700"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
                >
                  {loading ? "Please wait..." : "Create account"}
                </button>

                <p className="text-center text-sm text-slate-600">
                  Already have an account?{" "}
                  <Link to="/api/auth/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
