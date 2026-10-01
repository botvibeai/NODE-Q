import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Zap, 
  DollarSign, 
  Layers, 
  Database, 
  Globe, 
  ShieldCheck, 
  RotateCw, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Flame, 
  Server, 
  Clock, 
  Play, 
  ExternalLink,
  Code2,
  Sparkles
} from 'lucide-react';
import { ArbitrageExecutionResult, CostImplodeGatewayStats, UpstreamProviderStatus } from '../types';
import { AiArbitrageSavingsVisualizer } from './AiArbitrageSavingsVisualizer';

export const CostImplodeGatewayView: React.FC = () => {
  const [stats, setStats] = useState<CostImplodeGatewayStats | null>(null);
  const [prompt, setPrompt] = useState<string>('Classify customer order intent and check domestic stock availability');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [preferFreeTier, setPreferFreeTier] = useState<boolean>(true);
  const [targetProvider, setTargetProvider] = useState<string>('auto');
  const [taskClass, setTaskClass] = useState<'class_1' | 'class_2' | 'auto'>('auto');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<ArbitrageExecutionResult | null>(null);

  // Token Tax Calculator state
  const [monthlySpend, setMonthlySpend] = useState<number>(5000);
  const [nonEnglishRatio, setNonEnglishRatio] = useState<number>(35);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/costimplode/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.warn('Could not fetch CostImplode stats:', e);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleRunArbitrage = async () => {
    if (!prompt.trim()) return;
    setIsExecuting(true);
    setLastResult(null);

    try {
      const res = await fetch('/api/costimplode/arbitrage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          language: selectedLanguage,
          preferFreeTier,
          targetProvider,
          taskClass
        })
      });

      if (res.ok) {
        const data: ArbitrageExecutionResult = await res.json();
        setLastResult(data);
        fetchStats();
      }
    } catch (e) {
      console.error('Arbitrage execution error:', e);
    } finally {
      setIsExecuting(false);
    }
  };

  // Language multipliers
  const languageOptions = [
    { name: 'English', script: 'Latin', multiplier: '1.00x', reduction: '63.3% (Base)' },
    { name: 'Hindi', script: 'Devanagari', multiplier: '4.47x Tax', reduction: '91.0% Net Savings' },
    { name: 'Arabic', script: 'Arabic', multiplier: '3.30x Tax', reduction: '90.0% Net Savings' },
    { name: 'Russian', script: 'Cyrillic', multiplier: '1.82x Tax', reduction: '87.0% Net Savings' },
    { name: 'Spanish', script: 'Latin', multiplier: '1.48x Tax', reduction: '84.0% Net Savings' }
  ];

  // TokenTax Audit calculations
  const rawInternationalCost = monthlySpend * (nonEnglishRatio / 100) * 2.8; // Average token tax inflation
  const englishBaselineCost = monthlySpend * (1 - nonEnglishRatio / 100);
  const totalUnoptimizedCost = rawInternationalCost + englishBaselineCost;
  const costimplodeCost = totalUnoptimizedCost * (1 - 0.78); // 78% blended compression
  const totalSavedMonthly = totalUnoptimizedCost - costimplodeCost;
  const protocolYieldCaptured = totalSavedMonthly * 0.367;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a1224] to-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h2 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                CostImplodeAI // Internal 1000 IQ Multi-Cloud Model Arbitrage Gateway
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-[10px] font-mono">
                QUAD-TIER CACHE &bull; &tau; = 0.633
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Decouples Node Q from upstream model lock-in. Dynamically routes prompts across 
              <strong> Cloudflare Workers AI (Zero-Cost Free Tier)</strong>, 
              <strong> CometAPI.com (220+ models, 10% rebate)</strong>, 
              <strong> AIMLAPI.com (200+ models, 30% commission)</strong>, and 
              <strong> Google AI Studio (Gemini Hierarchy)</strong>. 
              Delivered savings are governed at 63.3%, capturing surplus yield while eliminating non-English token taxes.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl font-mono text-xs">
            <div>
              <span className="text-slate-500 text-[10px] block">TOTAL ARBITRAGE SAVINGS</span>
              <span className="text-emerald-400 font-bold">${stats?.totalRawSavingsUsd.toLocaleString() || '18,450.40'}</span>
            </div>
            <div className="w-px h-7 bg-slate-800 mx-2" />
            <div>
              <span className="text-slate-500 text-[10px] block">PROTOCOL YIELD CAPTURED</span>
              <span className="text-purple-400 font-bold">${stats?.totalProtocolYieldUsd.toLocaleString() || '8,710.20'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Provider Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-mono text-xs">
        {stats?.providers.map((p) => {
          return (
            <div 
              key={p.id}
              className={`p-3.5 rounded-xl border space-y-2 relative overflow-hidden ${
                p.isFreeTier 
                  ? 'bg-emerald-950/20 border-emerald-700/60 ring-1 ring-emerald-500/20' 
                  : p.keyConfigured
                  ? 'bg-slate-950 border-cyan-800/60'
                  : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs truncate max-w-[130px]">{p.name.split(' ')[0]}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                  p.isFreeTier 
                    ? 'bg-emerald-900 text-emerald-300' 
                    : p.keyConfigured
                    ? 'bg-cyan-950 text-cyan-300'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {p.isFreeTier ? 'FREE TIER' : p.keyConfigured ? 'KEY ACTIVE' : 'CONNECTED'}
                </span>
              </div>

              <div className="text-[11px] text-slate-300 truncate font-semibold">
                {p.featuredModel}
              </div>

              <div className="space-y-0.5 text-[10px] text-slate-400">
                <div className="flex justify-between">
                  <span>Cost/1M:</span>
                  <span className={p.isFreeTier ? 'text-emerald-400 font-bold' : 'text-slate-200'}>{p.blendedCostPerMillion}</span>
                </div>
                <div className="flex justify-between">
                  <span>Latency:</span>
                  <span className="text-cyan-400">{p.ttftMs}ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Benefit:</span>
                  <span className="text-purple-400 truncate max-w-[100px]">{p.commissionOrRebate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Arbitrage Savings Over Time Visualizer Sub-Component */}
      <AiArbitrageSavingsVisualizer />

      {/* Main Grid: Interactive Arbitrage Playground & Quad-Tier Cache */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Dispatcher (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <h3 className="font-bold text-white uppercase tracking-wider text-xs">
                Real-Time Arbitrage Playground &bull; Upstream Dispatch
              </h3>
            </div>
            <span className="text-[10px] text-emerald-400">
              Savings Target: <strong>&tau; = 0.633 (63.3%)</strong>
            </span>
          </div>

          {/* Configuration Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] text-slate-500 mb-1">LANGUAGE / SCRIPT</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-cyan-300 text-xs focus:outline-none focus:border-cyan-500"
              >
                {languageOptions.map(l => (
                  <option key={l.name} value={l.name}>{l.name} ({l.multiplier})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 mb-1">UPSTREAM ROUTE</label>
              <select
                value={targetProvider}
                onChange={(e) => setTargetProvider(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-cyan-300 text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="auto">Auto Multi-Cloud Arbitrage</option>
                <option value="cloudflare_free">Cloudflare Workers AI (Free Tier)</option>
                <option value="cometapi">CometAPI.com (220+ Models)</option>
                <option value="aimlapi">AIMLAPI.com (30% Commission)</option>
                <option value="gemini">Google AI Studio (Gemini)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 mb-1">COMPLEXITY TIER</label>
              <select
                value={taskClass}
                onChange={(e) => setTaskClass(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-cyan-300 text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="auto">Auto-Classify Task</option>
                <option value="class_1">Class 1: Flash / Free Edge</option>
                <option value="class_2">Class 2: Frontier Reasoning</option>
              </select>
            </div>
          </div>

          {/* Free tier toggle */}
          <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <span className="text-slate-300 text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Prioritize Cloudflare Workers AI Free Tier (Zero-Cost Offloading)</span>
            </span>
            <input
              type="checkbox"
              checked={preferFreeTier}
              onChange={(e) => setPreferFreeTier(e.target.checked)}
              className="accent-cyan-500 w-4 h-4 cursor-pointer"
            />
          </div>

          {/* Prompt textarea */}
          <div>
            <label className="block text-[10px] text-slate-500 mb-1">TEST PROMPT PAYLOAD</label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter any agent instruction, code snippet, or query to run through CostImplode..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-cyan-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 leading-relaxed text-xs"
            />
          </div>

          {/* Execute button */}
          <button
            onClick={handleRunArbitrage}
            disabled={isExecuting}
            className="w-full py-2.5 bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
          >
            {isExecuting ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin" />
                <span>Evaluating Quad-Tier Cache &amp; Multi-Cloud Endpoints...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Execute Arbitrage Inference &bull; Lock &tau; = 0.633</span>
              </>
            )}
          </button>

          {/* Result Output Card */}
          {lastResult && (
            <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-cyan-800/60 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{lastResult.cacheTier}</span>
                </span>
                <span className="text-slate-400 text-[11px]">
                  Latency: <strong className="text-white">{lastResult.latencyMs}ms</strong>
                </span>
              </div>

              {/* Economic Yield Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1">
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">RETAIL BASELINE (C_base)</span>
                  <span className="text-white font-bold">${lastResult.cBaseUsd}</span>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">RAW EXECUTION (C_raw)</span>
                  <span className="text-cyan-300 font-bold">${lastResult.cRawUsd}</span>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">DELIVERED SAVINGS (&tau;)</span>
                  <span className="text-emerald-400 font-bold">63.3% (${lastResult.userSavingsUsd})</span>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">PROTOCOL YIELD (&Delta;S)</span>
                  <span className="text-purple-400 font-bold">{lastResult.protocolYieldPct}% (${lastResult.protocolYieldUsd})</span>
                </div>
              </div>

              {/* Model and Provider used */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Provider: <strong className="text-slate-200">{lastResult.providerUsed}</strong></span>
                <span>Model: <strong className="text-cyan-300">{lastResult.modelUsed}</strong></span>
              </div>

              {/* Completion text */}
              <div className="bg-black/60 p-3 rounded-lg border border-slate-800 text-slate-200 whitespace-pre-wrap leading-relaxed text-xs">
                {lastResult.completion}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Quad-Tier Caching & TokenTax Calculator (5 cols) */}
        <div className="lg:col-span-5 space-y-4 font-mono text-xs">
          {/* Quad-Tier Caching Status */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-3">
            <h3 className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Quad-Tier Edge Caching Hierarchy</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Operates sequentially at the edge to bypass upstream model fees:
            </p>

            <div className="space-y-2 pt-1 text-[11px]">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-cyan-400 font-bold block">Level 1: Exact Hash Match (&lt;20ms)</span>
                  <span className="text-slate-500 text-[10px]">SHA-256 hash against Workers KV</span>
                </div>
                <span className="text-emerald-400 font-bold">{stats?.cacheHits.l1Exact.toLocaleString() || '4,120'} hits</span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-blue-400 font-bold block">Level 2: Regional Cache Shield (&lt;50ms)</span>
                  <span className="text-slate-500 text-[10px]">High-frequency completion objects</span>
                </div>
                <span className="text-emerald-400 font-bold">{stats?.cacheHits.l2Shield.toLocaleString() || '1,980'} hits</span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-purple-400 font-bold block">Level 3: Semantic Vector Match (&lt;90ms)</span>
                  <span className="text-slate-500 text-[10px]">Vectorize similarity &gt; 0.96</span>
                </div>
                <span className="text-emerald-400 font-bold">{stats?.cacheHits.l3Semantic.toLocaleString() || '2,340'} hits</span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-amber-400 font-bold block">Level 4: Context Prefix Cache</span>
                  <span className="text-slate-500 text-[10px]">Prompt prefix caching (-22.7% tokens)</span>
                </div>
                <span className="text-emerald-400 font-bold">{stats?.cacheHits.l4Prefix.toLocaleString() || '3,110'} hits</span>
              </div>
            </div>
          </div>

          {/* Multilingual Token Tax Calculator (tokentax0.com) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>tokentax0.com Multilingual Audit</span>
              </h3>
              <span className="text-[10px] text-cyan-400 font-bold">PRE-TRANSLATION PIPELINE</span>
            </div>

            <p className="text-[11px] text-slate-400">
              Byte-Pair Encoding penalizes non-Latin scripts (Devanagari 4.47x, Arabic 3.30x). CostImplode pre-translates into compact English tokens before inference.
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                  <span>Monthly Inference Budget:</span>
                  <span className="text-emerald-400 font-bold">${monthlySpend.toLocaleString()}/mo</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="500"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                  <span>Non-English Prompt Share:</span>
                  <span className="text-cyan-400 font-bold">{nonEnglishRatio}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  step="5"
                  value={nonEnglishRatio}
                  onChange={(e) => setNonEnglishRatio(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* Calculator Results */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Unoptimized Provider Invoice:</span>
                  <span className="text-red-400 line-through">${totalUnoptimizedCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-300 font-bold">
                  <span>CostImplode Governed Invoice:</span>
                  <span className="text-emerald-400 text-sm">${costimplodeCost.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex justify-between text-[11px]">
                  <span className="text-cyan-400 font-bold">Net Client Savings:</span>
                  <span className="text-emerald-400 font-bold">+${totalSavedMonthly.toFixed(2)}/mo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
