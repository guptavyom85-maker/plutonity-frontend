// app/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/lib/api";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(form.email, form.password);

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("username", data.username);

      router.push("/dashboard");
    } catch (err: any) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-zinc-400 mb-8">
          No account?{" "}
          <Link href="/register" className="text-emerald-400 hover:underline">
            Sign up free
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["email", "password"].map((field) => (
            <div key={field}>
              <label className="text-zinc-400 text-sm block mb-1 capitalize">
                {field}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                value={form[field as keyof typeof form]}
                onChange={(e) =>
                  setForm({ ...form, [field]: e.target.value })
                }
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
          ))}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}