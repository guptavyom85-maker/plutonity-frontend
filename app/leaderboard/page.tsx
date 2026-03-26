// app/leaderboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import { getLeaderboard } from "@/lib/api";

export default function Leaderboard() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const data = await getLeaderboard();
      setEntries(data.entries);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">Leaderboard</h1>
      <p className="text-zinc-400 mb-8">Top strategies ranked by Sharpe Ratio.</p>

      <div className="border border-zinc-800 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-5 bg-zinc-900 px-6 py-3 text-zinc-400 text-sm font-medium">
          <div>#</div>
          <div>User</div>
          <div>Strategy</div>
          <div>Sharpe</div>
          <div>Return</div>
        </div>

        {/* Rows */}
        {loading ? (
          <div className="px-6 py-12 text-center text-zinc-400">
            Loading...
          </div>
        ) : entries.length === 0 ? (
          <div className="px-6 py-12 text-center text-zinc-400">
            No entries yet. Be the first to submit a strategy.
          </div>
        ) : (
          entries.map((entry, i) => (
            <div
              key={i}
              className="grid grid-cols-5 px-6 py-4 border-t border-zinc-800 hover:bg-zinc-900/50 transition"
            >
              <div className="text-zinc-400 font-mono">
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
              </div>
              <div className="text-white">@{entry.username}</div>
              <div className="text-zinc-300">{entry.strategy_name}</div>
              <div className="text-emerald-400 font-mono">
                {entry.score?.toFixed(3)}
              </div>
              <div className={entry.total_return > 0 ? "text-emerald-400" : "text-red-400"}>
                {(entry.total_return * 100).toFixed(1)}%
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}