import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  Zap, 
  Sparkles, 
  Layers, 
  Filter, 
  ShieldCheck, 
  ArrowUpRight,
  PieChart as PieIcon,
  BarChart3
} from 'lucide-react';

type TimeRange = '24h' | '30d' | '12m';

export const AiArbitrageSavingsVisualizer: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');
  const [freeTierSharePct, setFreeTierSharePct] = useState<number>(35); // 35% routed to Cloudflare free tier
  const [multilingualTaxPct, setMultilingualTaxPct] = useState<number>(30); // 30% non-Latin scripts

  // Generate synthetic yet mathematically accurate historical and projected time-series
  const data = useMemo(() => {
    // Multiplier for direct cost based on non-Latin token tax
    const directTaxMultiplier = 1.0 + (multilingualTaxPct / 100) * 1.8;
    // Multiplier for aggregated cost based on Cloudflare free tier and rebates
    const freeTierDiscount = (freeTierSharePct / 100) * 0.95; // 95% off for free tier portion

    if (timeRange === '24h') {
      return Array.from({ length: 24 }).map((_, i) => {
        const hour = (new Date().getHours() - (23 - i) + 24) % 24;
        const label = `${hour.toString().padStart(2, '0')}:00`;
        const baseVolume = 80000 + Math.sin(i / 2.5) * 35000 + (i * 2000);
        
        // Direct cost without arbitrage (unoptimized frontier tokens)
        const directCost = ((baseVolume * directTaxMultiplier) / 1000000) * 4.20;
        // Aggregated multi-model cost through CostImplode (with rebates + free tier)
        const unreducedAgg = ((baseVolume) / 1000000) * 0.85;
        const aggCost = unreducedAgg * (1.0 - freeTierDiscount);
        
        const savingsUsd = Math.max(0, directCost - aggCost);
        const protocolYieldUsd = savingsUsd * 0.367;
        const clientDeliveredSavingsUsd = savingsUsd * 0.633;

        return {
          label,
          directCost: Number(directCost.toFixed(2)),
          aggregatedCost: Number(aggCost.toFixed(2)),
          savingsUsd: Number(savingsUsd.toFixed(2)),
          protocolYieldUsd: Number(protocolYieldUsd.toFixed(2)),
          clientSavingsUsd: Number(clientDeliveredSavingsUsd.toFixed(2)),
          savingsPercent: directCost > 0 ? Number(((savingsUsd / directCost) * 100).toFixed(1)) : 63.3
        };
      });
    }

    if (timeRange === '12m') {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months.map((m, idx) => {
        // Growth curve from month 1 to month 12
        const scaleFactor = 1.0 + (idx * 0.45);
        const monthlyTokensMillion = 120 * scaleFactor;
        
        const directCost = monthlyTokensMillion * directTaxMultiplier * 3.80;
        const unreducedAgg = monthlyTokensMillion * 0.72;
        const aggCost = unreducedAgg * (1.0 - freeTierDiscount);
        
        const savingsUsd = directCost - aggCost;
        const protocolYieldUsd = savingsUsd * 0.367;
        const clientDeliveredSavingsUsd = savingsUsd * 0.633;

        return {
          label: m,
          directCost: Math.round(directCost),
          aggregatedCost: Math.round(aggCost),
          savingsUsd: Math.round(savingsUsd),
          protocolYieldUsd: Math.round(protocolYieldUsd),
          clientSavingsUsd: Math.round(clientDeliveredSavingsUsd),
          savingsPercent: Number(((savingsUsd / directCost) * 100).toFixed(1))
        };
      });
    }

    // Default: '30d' (Past 30 days)
    return Array.from({ length: 30 }).map((_, i) => {
      const dayNum = i + 1;
      const label = `Day ${dayNum}`;
      const dailyTokensMillion = 3.5 + (i * 0.12) + (Math.sin(i / 3) * 0.8);
      
      const directCost = dailyTokensMillion * directTaxMultiplier * 3.90;
      const unreducedAgg = dailyTokensMillion * 0.75;
      const aggCost = unreducedAgg * (1.0 - freeTierDiscount);
      
      const savingsUsd = directCost - aggCost;
      const protocolYieldUsd = savingsUsd * 0.367;
      const clientDeliveredSavingsUsd = savingsUsd * 0.633;

      return {
        label,
        directCost: Number(directCost.toFixed(2)),
        aggregatedCost: Number(aggCost.toFixed(2)),
        savingsUsd: Number(savingsUsd.toFixed(2)),
        protocolYieldUsd: Number(protocolYieldUsd.toFixed(2)),
        clientSavingsUsd: Number(clientDeliveredSavingsUsd.toFixed(2)),
        savingsPercent: Number(((savingsUsd / directCost) * 100).toFixed(1))
      };
    });
  }, [timeRange, freeTierSharePct, multilingualTaxPct]);

  // Aggregate totals
  const totalDirect = data.reduce((acc, d) => acc + d.directCost, 0);
  const totalAggregated = data.reduce((acc, d) => acc + d.aggregatedCost, 0);
  const totalSaved = data.reduce((acc, d) => acc + d.savingsUsd, 0);
  const totalProtocolYield = data.reduce((acc, d) => acc + d.protocolYieldUsd, 0);
  const overallSavingsPct = totalDirect > 0 ? ((totalSaved / totalDirect) * 100).toFixed(1) : '63.3';

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const current = payload[0].payload;
      return (
        <div className="bg-slate-950/95 border border-slate-700 p-3 rounded-xl shadow-2xl font-mono text-xs space-y-1.5 backdrop-blur-md">
          <div className="font-bold text-white border-b border-slate-800 pb-1 flex items-center justify-between gap-4">
            <span>{label}</span>
            <span className="text-emerald-400 font-bold">{current.savingsPercent}% Arbitrage Savings</span>
          </div>
          <div className="space-y-1 pt-0.5 text-[11px]">
            <div className="flex justify-between gap-4 text-rose-400">
              <span>Direct Model Cost:</span>
              <span className="font-bold">${current.directCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4 text-cyan-400">
              <span>Aggregated Multi-Model:</span>
              <span className="font-bold">${current.aggregatedCost.toLocaleString()}</span>
            </div>
            <div className="pt-1 border-t border-slate-800/80 flex justify-between gap-4 text-emerald-400 font-bold">
              <span>Net Arbitrage Saved:</span>
              <span>+${current.savingsUsd.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4 text-purple-400 text-[10px]">
              <span>Protocol Yield (&Delta;S 36.7%):</span>
              <span>+${current.protocolYieldUsd.toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-5 font-mono">
      {/* Sub-component Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans flex items-center gap-2">
              <span>AI Arbitrage Savings Visualizer</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                Direct vs. Aggregated Multi-Model
              </span>
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time differential between frontier retail invoices and CostImplode multi-cloud arbitrage with free edge offloading.
          </p>
        </div>

        {/* Range and Chart Type Selectors */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Chart format toggle */}
          <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setChartType('area')}
              className={`px-2.5 py-1 rounded text-xs transition-all ${
                chartType === 'area' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Differential Area
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-2.5 py-1 rounded text-xs transition-all ${
                chartType === 'bar' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Comparative Bars
            </button>
          </div>

          {/* Time range buttons */}
          <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex items-center gap-1">
            {(['24h', '30d', '12m'] as TimeRange[]).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-2.5 py-1 rounded text-xs transition-all ${
                  timeRange === r ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {r === '24h' ? '24 Hours' : r === '30d' ? '30 Days' : '12 Months'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Highlights Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
          <span className="text-[10px] text-rose-400 block mb-1">DIRECT STANDALONE COST</span>
          <div className="text-xl font-bold text-white font-mono">
            ${totalDirect.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Unoptimized Frontier Baseline</span>
        </div>

        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
          <span className="text-[10px] text-cyan-400 block mb-1">AGGREGATED MULTI-MODEL COST</span>
          <div className="text-xl font-bold text-cyan-300 font-mono">
            ${totalAggregated.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">CostImplode Blended Invoice</span>
        </div>

        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-emerald-900/60 bg-emerald-950/10">
          <span className="text-[10px] text-emerald-400 block mb-1 font-bold">TOTAL ARBITRAGE SAVED</span>
          <div className="text-xl font-bold text-emerald-400 font-mono">
            +${totalSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <span className="text-[10px] text-emerald-300 mt-1 block font-bold">{overallSavingsPct}% Gross Delta</span>
        </div>

        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-purple-900/60 bg-purple-950/10">
          <span className="text-[10px] text-purple-400 block mb-1 font-bold">PROTOCOL YIELD CAPTURED</span>
          <div className="text-xl font-bold text-purple-300 font-mono">
            +${totalProtocolYield.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <span className="text-[10px] text-purple-400/80 mt-1 block">&tau; Governance Surplus (&Delta;S)</span>
        </div>
      </div>

      {/* Main Chart Canvas */}
      <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800/90">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  {/* Direct Cost Gradient (Rose / Red) */}
                  <linearGradient id="directGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                  </linearGradient>
                  {/* Aggregated Cost Gradient (Cyan) */}
                  <linearGradient id="aggGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                  {/* Savings Delta Gradient (Emerald) */}
                  <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
                <XAxis 
                  dataKey="label" 
                  stroke="#64748b" 
                  tick={{ fontSize: 10, fill: '#94a3b8' }} 
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis 
                  stroke="#64748b" 
                  tick={{ fontSize: 10, fill: '#94a3b8' }} 
                  axisLine={{ stroke: '#334155' }}
                  tickFormatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  formatter={(value) => {
                    if (value === 'directCost') return <span className="text-rose-400 text-xs font-mono">Direct Model Costs (Frontier Retail)</span>;
                    if (value === 'aggregatedCost') return <span className="text-cyan-400 text-xs font-mono">Aggregated Multi-Model (CostImplode)</span>;
                    if (value === 'savingsUsd') return <span className="text-emerald-400 text-xs font-mono">Net Arbitrage Delta</span>;
                    return value;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="directCost" 
                  stroke="#f43f5e" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#directGradient)" 
                  name="directCost"
                />
                <Area 
                  type="monotone" 
                  dataKey="aggregatedCost" 
                  stroke="#06b6d4" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#aggGradient)" 
                  name="aggregatedCost"
                />
              </AreaChart>
            ) : (
              <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
                <XAxis 
                  dataKey="label" 
                  stroke="#64748b" 
                  tick={{ fontSize: 10, fill: '#94a3b8' }} 
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis 
                  stroke="#64748b" 
                  tick={{ fontSize: 10, fill: '#94a3b8' }} 
                  axisLine={{ stroke: '#334155' }}
                  tickFormatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  formatter={(value) => {
                    if (value === 'directCost') return <span className="text-rose-400 text-xs font-mono">Direct Model Costs</span>;
                    if (value === 'aggregatedCost') return <span className="text-cyan-400 text-xs font-mono">Aggregated Multi-Model</span>;
                    return value;
                  }}
                />
                <Bar dataKey="directCost" fill="#f43f5e" radius={[4, 4, 0, 0]} name="directCost" />
                <Bar dataKey="aggregatedCost" fill="#06b6d4" radius={[4, 4, 0, 0]} name="aggregatedCost" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Interactive Scenario Tuning Sliders */}
      <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span className="font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Arbitrage Scenario Simulation</span>
          </span>
          <span className="text-[11px] text-cyan-400">
            Dynamically shifts model cost spread in real-time
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
          {/* Slider 1: Cloudflare Workers AI Free Tier Offload Share */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Cloudflare Workers AI Free Tier Share:</span>
              <span className="text-emerald-400 font-bold">{freeTierSharePct}% of queries ($0.00)</span>
            </div>
            <input 
              type="range"
              min="0"
              max="70"
              step="5"
              value={freeTierSharePct}
              onChange={(e) => setFreeTierSharePct(parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0% (Frontier Only)</span>
              <span>35% (Current Production)</span>
              <span>70% (Aggressive Edge Offload)</span>
            </div>
          </div>

          {/* Slider 2: Non-Latin Multilingual Share */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Multilingual Ingress Ratio (TokenTax):</span>
              <span className="text-cyan-400 font-bold">{multilingualTaxPct}% non-Latin prompts</span>
            </div>
            <input 
              type="range"
              min="0"
              max="60"
              step="5"
              value={multilingualTaxPct}
              onChange={(e) => setMultilingualTaxPct(parseInt(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0% (English Only)</span>
              <span>30% (Standard International)</span>
              <span>60% (High Devanagari/Arabic)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
