"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBacktestResult } from "@/lib/api";

export default function Results() {
  const params = useParams();
  const router = useRouter();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.push("/login");
      return;
    }
    if (id) fetchResult();
  }, [id]);

  const fetchResult = async () => {
    try{
      console.log("Fetching result for strategy_id:", id);
      const data = await getBacktestResult(id as string);
      console.log("Got result:", data);
      setResult(data);
    } catch (err: any) {
      console.error("Full error:", err);
      const msg = err?.response?.data?.detail || err?.message || "Failed to load results";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <div className="text-zinc-400">Loading results...</div>
          <div className="text-zinc-600 text-sm mt-2 font-mono">{id}</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <div className="text-red-400 text-lg mb-2">Failed to load results</div>
          <div className="text-zinc-500 text-sm font-mono bg-zinc-900 p-4 rounded-lg mb-4">{error}</div>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-zinc-400">No results found</div>
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