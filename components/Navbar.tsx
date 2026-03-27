"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [username, setUsername] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Re-read auth state every time the route changes
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("username");
    setUsername(stored);
  }, [pathname]); // ← this is the key fix: runs on every page change

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    setUsername(null);
    router.push("/login");
  };

  // Don't render anything until mounted
  // Prevents hydration mismatch between server and client
  if (!mounted) return (
    <nav className="border-b border-zinc-800 bg-black px-6 py-4 h-[65px]" />
  );

  return (
    <nav className="border-b border-zinc-800 bg-black px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white">
          Plutonity<span className="text-emerald-400">.</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className={`text-sm transition ${pathname === "/dashboard" ? "text-white" : "text-zinc-400 hover:text-white"}`}
          >
            Dashboard
          </Link>
          <Link
            href="/leaderboard"
            className={`text-sm transition ${pathname === "/leaderboard" ? "text-white" : "text-zinc-400 hover:text-white"}`}
          >
            Leaderboard
          </Link>

          {username ? (
            <div className="flex items-center gap-4">
              <span className="text-zinc-400 text-sm font-mono">@{username}</span>
              <button
                onClick={handleLogout}
                className="text-sm bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm text-zinc-400 hover:text-white transition"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="text-sm bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-2 rounded-lg transition"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}