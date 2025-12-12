import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export default function SignInForm() {
  const [form, setForm] = useState({ email: "", password: "" });
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
      console.log(API_BASE_URL);
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("login_token", data.token);
      navigate("/");
    } catch (err) {
      console.log(" error while signin", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" px-4 ">
      <div className="mx-auto h-screen flex max-w-xl flex-col gap-8 lg:flex-row lg:items-center">
        <div className="flex-1">
          <div className="rounded-2xl bg-white/10 p-1 ring-1 ring-white/10 backdrop-blur">
            <div className="rounded-xl bg-white p-8 text-slate-900 shadow-2xl">
              <div className="mb-6 flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    Sign in
                  </h2>
                  <p className="text-sm text-slate-600">Access your account.</p>
                </div>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">
                  Auth
                </span>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <label
                    className="block text-sm font-medium text-slate-700"
                    htmlFor="login-email"
                  >
                    Email
                  </label>
                  <input
                    id="login-email"
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
                    htmlFor="login-password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="login-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 pr-10 text-slate-900 outline-none ring-indigo-500 focus:ring-2"
                      placeholder="Your password"
                      autoComplete="current-password"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-2 flex items-center text-slate-500 hover:text-slate-700"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible size={20} />
                      ) : (
                        <AiOutlineEye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
                >
                  {loading ? "Please wait..." : "Sign In"}
                </button>

                <p className="text-center text-sm text-slate-600">
                  No account?{" "}
                  <Link
                    to="/api/auth/signup"
                    className="font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Create one
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
