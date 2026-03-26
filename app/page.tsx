// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6">

      {/* Hero */}
      <div className="py-32 text-center">
        <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full mb-6">
          Now in Private Beta
        </div>
        <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
          Backtest against{" "}
          <span className="text-emerald-400">15 years</span>
          <br />
          of NSE data.
        </h1>
        <p className="text-zinc-400 text-xl mb-10 max-w-2xl mx-auto">
          India's first gamified quant backtesting platform. Write strategies
          in Python. Compete with quants. Ship alpha.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/register"
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-4 rounded-lg text-lg transition"
          >
            Start Backtesting Free
          </Link>
          <Link
            href="/leaderboard"
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 rounded-lg text-lg transition"
          >
            View Leaderboard
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-24">
        {[
          { value: "15+", label: "Years of NSE Data" },
          { value: "<2s", label: "Backtest Execution" },
          { value: "Free", label: "To Get Started" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="border border-zinc-800 rounded-xl p-8 text-center"
          >
            <div className="text-4xl font-bold text-emerald-400 mb-2">
              {stat.value}
            </div>
            <div className="text-zinc-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-6 mb-24">
        {[
          {
            title: "Python-First",
            desc: "Write strategies using Pandas and NumPy. Full access to the tools you know.",
          },
          {
            title: "Real NSE Data",
            desc: "Backtest against actual historical price data from NSE and BSE.",
          },
          {
            title: "Compete & Rank",
            desc: "Submit to weekly challenges. Win prizes. Prove your alpha on the leaderboard.",
          },
        ].map((f) => (
          <div key={f.title} className="border border-zinc-800 rounded-xl p-6">
            <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-zinc-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
}