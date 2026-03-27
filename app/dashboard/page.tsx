// app/dashboard/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { submitBacktest, getBacktestStatus } from "@/lib/api";

// Monaco editor must be loaded dynamically
// (it doesn't work with server-side rendering)
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

const DEFAULT_STRATEGY = `def generate_signals(df):
    # Calculate moving averages
    df['MA20'] = df['Close'].rolling(window=20).mean()
    df['MA50'] = df['Close'].rolling(window=50).mean()
    
    # Default: hold
    df['signal'] = 0
    
    # Buy when MA20 crosses above MA50
    df.loc[df['MA20'] > df['MA50'], 'signal'] = 1
    
    # Sell when MA20 crosses below MA50
    df.loc[df['MA20'] < df['MA50'], 'signal'] = -1
    
    return df
`;

const TICKERS = [
  "RELIANCE", "TCS", "INFY", "HDFCBANK",
  "WIPRO", "TATAMOTORS", "SBIN", "ICICIBANK", "NIFTY50"
];

export default function Dashboard() {
  const router = useRouter();
  const [code, setCode] = useState(DEFAULT_STRATEGY);
  const [strategyName, setStrategyName] = useState("My Strategy");
  const [ticker, setTicker] = useState("RELIANCE");
  const [startDate, setStartDate] = useState("2018-01-01");
  const [endDate, setEndDate] = useState("2023-01-01");
  const [capital, setCapital] = useState(100000);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  // Redirect if not logged in
  useEffect(() => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    router.push("/login");
  }
}, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setStatus("Submitting strategy...");

    try {
      // Submit backtest
      const submission = await submitBacktest({
        strategy_name: strategyName,
        code,
        ticker,
        start_date: startDate,
        end_date: endDate,
        initial_capital: capital,
      });

      const { job_id, strategy_id } = submission;
      setStatus("Backtest queued. Running...");

      // Poll for result every 3 seconds
      const poll = setInterval(async () => {
        try {
          const statusData = await getBacktestStatus(job_id);

          if (statusData.status === "completed") {
            clearInterval(poll);
            setStatus("Completed!");
            setLoading(false);
            // Navigate to results page
            router.push(`/results/${strategy_id}`);
          } else if (statusData.status === "failed") {
            clearInterval(poll);
            setError(statusData.error || "Backtest failed");
            setLoading(false);
            setStatus("");
          } else {
            setStatus(`Running backtest... (${statusData.status})`);
          }
        } catch (err) {
          clearInterval(poll);
          setError("Failed to get status");
          setLoading(false);
        }
      }, 3000);

    } catch (err: any) {
      setError(err.response?.data?.detail || "Submission failed");
      setLoading(false);
      setStatus("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">Strategy Editor</h1>
      <p className="text-zinc-400 mb-8">
        Write your strategy below. Your function must be named{" "}
        <code className="text-emerald-400 bg-zinc-900 px-1 rounded">
          generate_signals(df)
        </code>
      </p>

      <div className="grid grid-cols-3 gap-6">

        {/* Code Editor — takes up 2/3 of the width */}
        <div className="col-span-2">
          <div className="border border-zinc-800 rounded-xl overflow-hidden">
            <div className="bg-zinc-900 px-4 py-2 flex items-center gap-2 border-b border-zinc-800">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-zinc-400 text-sm ml-2">strategy.py</span>
            </div>
            <MonacoEditor
              height="500px"
              language="python"
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val || "")}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                padding: { top: 16 },
              }}
            />
          </div>
        </div>

        {/* Settings Panel — takes up 1/3 */}
        <div className="space-y-4">
          <div className="border border-zinc-800 rounded-xl p-6 space-y-4">
            <h2 className="text-white font-semibold">Backtest Settings</h2>

            <div>
              <label className="text-zinc-400 text-sm block mb-1">
                Strategy Name
              </label>
              <input
                value={strategyName}
                onChange={(e) => setStrategyName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-zinc-400 text-sm block mb-1">Ticker</label>
              <select
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
              >
                {TICKERS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-zinc-400 text-sm block mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-zinc-400 text-sm block mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-zinc-400 text-sm block mb-1">
                Initial Capital (₹)
              </label>
              <input
                type="number"
                value={capital}
                onChange={(e) => setCapital(Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            {status && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-2 rounded-lg text-sm">
                {status}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-semibold py-3 rounded-lg transition"
            >
              {loading ? "Running..." : "▶ Run Backtest"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}