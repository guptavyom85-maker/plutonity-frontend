// components/Navbar.tsx
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    router.push("/login");
  };

  const username =
    typeof window !== "undefined" ? localStorage.getItem("username") : null;

  return (
    <nav className="border-b border-zinc-800 bg-black px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white">
          Plutonity<span className="text-emerald-400">.</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-zinc-400 hover:text-white text-sm transition"
          >
            Dashboard
          </Link>
          <Link
            href="/leaderboard"
            className="text-zinc-400 hover:text-white text-sm transition"
          >
            Leaderboard
          </Link>

          {username ? (
            <div className="flex items-center gap-4">
              <span className="text-zinc-400 text-sm">@{username}</span>
              <button
                onClick={handleLogout}
                className="text-sm bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-2 rounded-lg transition"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}