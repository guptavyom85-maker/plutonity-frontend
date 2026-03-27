// app/results/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBacktestResult } from "@/lib/api";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function Results() {
  const params = useParams();
  const router = useRouter();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Extract id safely — handle both string and array
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    router.push("/login");
  }
}, []);

  const fetchResult = async () => {
    try {
      const data = await getBacktestResult(id as string);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-zinc-400">Loading results...</div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-400">Results not found</div>
      </div>
    );
  }

  const metrics = [
    { label: "Total Return", value: `${(result.total_return * 100).toFixed(2)}%`, positive: result.total_return > 0 },
    { label: "CAGR", value: `${(result.cagr * 100).toFixed(2)}%`, positive: result.cagr > 0 },
    { label: "Sharpe Ratio", value: result.sharpe_ratio?.toFixed(3), positive: result.sharpe_ratio > 1 },
    { label: "Max Drawdown", value: `${(result.max_drawdown * 100).toFixed(2)}%`, positive: false },
    { label: "Win Rate", value: `${(result.win_rate * 100).toFixed(1)}%`, positive: result.win_rate > 0.5 },
    { label: "Final Value", value: `₹${result.final_value?.toLocaleString()}`, positive: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Backtest Results</h1>
          <p className="text-zinc-400 mt-1">
            Status:{" "}
            <span className={result.status === "completed" ? "text-emerald-400" : "text-red-400"}>
              {result.status}
            </span>
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          ← New Backtest
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {metrics.map((m) => (
          <div key={m.label} className="border border-zinc-800 rounded-xl p-6">
            <div className="text-zinc-400 text-sm mb-1">{m.label}</div>
            <div className={`text-2xl font-bold ${m.positive ? "text-emerald-400" : "text-red-400"}`}>
              {m.value ?? "—"}
            </div>
          </div>
        ))}
      </div>

      {/* Back to leaderboard */}
      <div className="text-center mt-8">
        <button
          onClick={() => router.push("/leaderboard")}
          className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 rounded-lg transition"
        >
          View Leaderboard →
        </button>
      </div>
    </div>
  );
}