import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  PieChart, 
  Sliders, 
  ShieldCheck, 
  Sparkles,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { FINANCIAL_12_MONTHS, FIVE_YEAR_PROJECTIONS } from '../data/mockInitialData';

export const PredictiveAnalyticsSandbox: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'12-month' | '5-year'>('12-month');
  const [reinvestmentPct, setReinvestmentPct] = useState<number>(37.5);
  const [aovSlider, setAovSlider] = useState<number>(40.45);
  const [governanceTau, setGovernanceTau] = useState<number>(0.633);

  // Dynamic sensitivity adjustments
  const aovRatio = aovSlider / 40.45;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
              Predictive Financial Horizons &amp; Reinvestment Engines
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Autonomous financial modeling driven by Hermes Above Agents. Enforces the two-phase capital engine: Phase 1 organic bootstrapping ($0 ad spend) transitioning in Month 4 to a disciplined 35%-40% profit reinvestment loop.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 font-mono text-xs">
          <button
            onClick={() => setSelectedView('12-month')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedView === '12-month'
                ? 'bg-cyan-600 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            12-Month Detailed
          </button>
          <button
            onClick={() => setSelectedView('5-year')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedView === '5-year'
                ? 'bg-cyan-600 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            5-Year Scale Horizon
          </button>
        </div>
      </div>

      {/* Interactive Sensitivity Controls */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>Profit Reinvestment Rate:</span>
            <span className="text-cyan-400 font-bold">{reinvestmentPct}%</span>
          </div>
          <input
            type="range"
            min="20"
            max="50"
            step="0.5"
            value={reinvestmentPct}
            onChange={(e) => setReinvestmentPct(parseFloat(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <span className="text-[10px] text-slate-500">Allocated to Meta &amp; TikTok ad scaling (Month 4+)</span>
        </div>

        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>Simulated Blended AOV:</span>
            <span className="text-emerald-400 font-bold">${aovSlider.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="30"
            max="65"
            step="0.5"
            value={aovSlider}
            onChange={(e) => setAovSlider(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <span className="text-[10px] text-slate-500">Base mix: 50% Tees, 35% Hoodies, 15% Cases</span>
        </div>

        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>Savings Governance (tau):</span>
            <span className="text-purple-400 font-bold">{(governanceTau * 100).toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min="0.50"
            max="0.80"
            step="0.005"
            value={governanceTau}
            onChange={(e) => setGovernanceTau(parseFloat(e.target.value))}
            className="w-full accent-purple-500 cursor-pointer"
          />
          <span className="text-[10px] text-slate-500">CostImplode target threshold for protocol yield</span>
        </div>
      </div>

      {selectedView === '12-month' ? (
        /* 12-Month Table & Forecast */
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white text-xs font-mono uppercase tracking-wide flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>12-Month Monthly Operational Financial Breakdown</span>
            </h3>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">
              Year 1 Aggregate: $416,837.25 Gross • $167,467.40 Net (40.2%)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                  <th className="py-2.5 px-3">MONTH</th>
                  <th className="py-2.5 px-3">OPERATIONAL MILESTONE &amp; FOCUS</th>
                  <th className="py-2.5 px-3 text-right">UNITS</th>
                  <th className="py-2.5 px-3 text-right">GROSS REV</th>
                  <th className="py-2.5 px-3 text-right">COGS</th>
                  <th className="py-2.5 px-3 text-right">PAID ADS</th>
                  <th className="py-2.5 px-3 text-right">NET PROFIT</th>
                  <th className="py-2.5 px-3 text-right">MARGIN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {FINANCIAL_12_MONTHS.map((m) => {
                  const simulatedGross = m.grossRevenue * aovRatio;
                  const simulatedNet = m.netProfit * aovRatio;

                  return (
                    <tr key={m.month} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3 font-bold text-white">M{m.month}</td>
                      <td className="py-3 px-3 text-slate-300 max-w-xs">{m.focus}</td>
                      <td className="py-3 px-3 text-right text-slate-300">{m.unitsSold.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right text-cyan-300 font-bold">
                        ${simulatedGross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-3 text-right text-slate-400">
                        ${m.cogs.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-3 text-right text-slate-400">
                        {m.adBudget === 0 ? <span className="text-slate-500">$0.00 (Organic)</span> : `$${m.adBudget.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                      </td>
                      <td className="py-3 px-3 text-right text-emerald-400 font-bold">
                        ${simulatedNet.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-3 text-right font-medium text-slate-200">
                        {m.marginPercent}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* 5-Year Enterprise Projections */
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-xs font-mono uppercase tracking-wide flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              <span>5-Year Enterprise Growth Horizon (Autonomous Scale)</span>
            </h3>
            <span className="text-[11px] font-mono text-purple-400 font-bold">
              Year 5 Target: $10.92M Gross Revenue • $4.29M Net EBITDA (39.3%)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {FIVE_YEAR_PROJECTIONS.map((y) => (
              <div key={y.year} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-white text-sm">YEAR {y.year}</span>
                  <span className="text-cyan-400 text-[10px] bg-cyan-950 px-1.5 py-0.5 rounded">
                    AOV: ${y.aov}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 text-[10px] block">ANNUAL VOLUME</span>
                  <span className="text-white font-bold">{y.units.toLocaleString()} units</span>
                </div>

                <div>
                  <span className="text-slate-500 text-[10px] block">GROSS REVENUE</span>
                  <span className="text-cyan-300 font-bold text-sm">
                    ${(y.revenue / 1000).toFixed(1)}k
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 text-[10px] block">NET OPERATING PROFIT</span>
                  <span className="text-emerald-400 font-bold text-sm">
                    ${(y.netProfit / 1000).toFixed(1)}k
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px]">
                  <span className="text-slate-500">Margin:</span>
                  <span className="text-emerald-400 font-bold">{y.margin}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed">
            <span className="text-cyan-400 font-bold block mb-1">Key Margin &amp; Economics Insights:</span>
            Over the 5-year horizon, owned audience monetization through automated email, SMS, and upload-post.com avatar video reaches over 30% of total sales volume. 
            Unit fulfillment COGS decreases from 41.3% in Year 1 to 37.0% in Year 5 through Printify volume enterprise tier discounts.
          </div>
        </div>
      )}
    </div>
  );
};
