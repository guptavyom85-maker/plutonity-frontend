// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* Grid background */}
      <div
        className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#00ff88 1px, transparent 1px), linear-gradient(90deg, #00ff88 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Glow orb */}
      <div
        className="fixed top-[-20%] left-[50%] translate-x-[-50%] w-[800px] h-[500px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(ellipse, #00ff88 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Hero */}
        <div className="pt-24 pb-20">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 rounded-full mb-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-mono tracking-widest uppercase">
              Private Beta — Now Live
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-7xl font-black leading-none mb-6 tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Backtest against
            <br />
            <span className="text-emerald-400">15 years</span> of
            <br />
            NSE tick data.
          </h1>

          {/* Subline */}
          <p className="text-zinc-400 text-xl mb-4 max-w-xl leading-relaxed">
            India's first gamified quant backtesting platform.
            Write strategies in Python. Compete with quants.
          </p>

          {/* Live stat ticker */}
          <div className="flex items-center gap-6 mb-10 font-mono text-sm">
            <div className="flex items-center gap-2">
              <span className="text-zinc-600">NIFTY50</span>
              <span className="text-emerald-400">▲ 0.43%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-600">SENSEX</span>
              <span className="text-emerald-400">▲ 0.31%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-600">BANKNIFTY</span>
              <span className="text-red-400">▼ 0.12%</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-4">
            <Link
              href="/register"
              className="group relative bg-emerald-400 text-black font-bold px-8 py-4 rounded-lg text-lg overflow-hidden transition-all hover:bg-emerald-300"
            >
              Start Backtesting Free
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/leaderboard"
              className="border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white px-8 py-4 rounded-lg text-lg transition-all"
            >
              View Leaderboard
            </Link>
          </div>
        </div>

        {/* Terminal mockup */}
        <div className="border border-zinc-800 rounded-xl overflow-hidden mb-24 shadow-2xl">
          <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-3 text-zinc-500 text-sm font-mono">strategy.py</span>
            <div className="ml-auto flex items-center gap-2 text-xs font-mono">
              <span className="text-zinc-600">RELIANCE.NS</span>
              <span className="text-zinc-600">|</span>
              <span className="text-emerald-400">● RUNNING</span>
            </div>
          </div>
          <div className="bg-zinc-950 p-6 font-mono text-sm">
            <div className="grid grid-cols-2 gap-6">
              {/* Code side */}
              <div>
                <p className="text-zinc-600 mb-3 text-xs">// MA Crossover Strategy</p>
                <p><span className="text-purple-400">def</span> <span className="text-emerald-400">generate_signals</span><span className="text-white">(df):</span></p>
                <p className="pl-4 text-zinc-300">df<span className="text-zinc-500">['MA20'] =</span> df<span className="text-zinc-500">['Close']</span></p>
                <p className="pl-8 text-zinc-400">.rolling<span className="text-white">(</span><span className="text-orange-400">20</span><span className="text-white">)</span>.mean<span className="text-white">()</span></p>
                <p className="pl-4 text-zinc-300">df<span className="text-zinc-500">['signal'] =</span> <span className="text-orange-400">0</span></p>
                <p className="pl-4 text-zinc-400">df.loc<span className="text-white">[</span>df<span className="text-zinc-500">['MA20']</span> <span className="text-white">&gt;</span> df<span className="text-zinc-500">['MA50']</span><span className="text-white">]</span></p>
                <p className="pl-8 text-emerald-400">= <span className="text-orange-400">1</span>  <span className="text-zinc-600"># buy</span></p>
                <p className="pl-4 text-purple-400 mt-2">return <span className="text-white">df</span></p>
              </div>
              {/* Results side */}
              <div className="border-l border-zinc-800 pl-6">
                <p className="text-zinc-600 mb-3 text-xs">// Results — RELIANCE 2015-2024</p>
                <div className="space-y-3">
                  {[
                    { label: "Total Return", value: "+83.2%", color: "text-emerald-400" },
                    { label: "Sharpe Ratio", value: "1.847", color: "text-emerald-400" },
                    { label: "CAGR", value: "9.24%", color: "text-emerald-400" },
                    { label: "Max Drawdown", value: "-34.1%", color: "text-red-400" },
                    { label: "Win Rate", value: "54.3%", color: "text-emerald-400" },
                  ].map((m) => (
                    <div key={m.label} className="flex justify-between">
                      <span className="text-zinc-500">{m.label}</span>
                      <span className={`${m.color} font-bold`}>{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-px bg-zinc-800 border border-zinc-800 rounded-xl overflow-hidden mb-24">
          {[
            { value: "15+", label: "Years NSE Data", sub: "Adjusted for splits & dividends" },
            { value: "<2s", label: "Execution Time", sub: "Sub-second backtests" },
            { value: "₹0", label: "To Start", sub: "Free tier, always" },
          ].map((s) => (
            <div key={s.label} className="bg-black p-8">
              <div
                className="text-5xl font-black text-emerald-400 mb-1"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {s.value}
              </div>
              <div className="text-white font-semibold mb-1">{s.label}</div>
              <div className="text-zinc-500 text-sm">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-24">
          <h2
            className="text-4xl font-black mb-12 tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Built for serious quant research.
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                icon: "⌨",
                title: "Python-First",
                desc: "Write strategies using Pandas and NumPy. Full access to TA-Lib indicators. Deploy from your terminal.",
              },
              {
                icon: "📊",
                title: "Real NSE & BSE Data",
                desc: "Complete historical data for equities, F&O, and indices. Adjusted for splits, dividends, and corporate actions.",
              },
              {
                icon: "🏆",
                title: "LeetCode for Finance",
                desc: "Weekly algo challenges on real Indian market data. Ranked leaderboards. Prize pools in INR. Prove your alpha.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="border border-zinc-800 hover:border-zinc-600 rounded-xl p-6 transition-all group"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-2xl p-12 text-center mb-24">
          <h2
            className="text-5xl font-black mb-4 tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Ready to ship alpha?
          </h2>
          <p className="text-zinc-400 text-lg mb-8">
            Join India's fastest growing quant community.
          </p>
          <Link
            href="/register"
            className="inline-block bg-emerald-400 hover:bg-emerald-300 text-black font-bold px-10 py-4 rounded-lg text-lg transition-all"
          >
            Get Started Free
          </Link>
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-800 py-8 flex items-center justify-between text-zinc-600 text-sm mb-8">
          <div className="font-mono">
            Plutonity<span className="text-emerald-400">.</span> © 2026
          </div>
          <div className="flex gap-6">
            <span>IIM Amritsar</span>
            <span>Team Ghidorah</span>
            <span>SDG-9</span>
          </div>
        </div>

      </div>
    </div>
  );
}