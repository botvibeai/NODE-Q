import React, { useState } from 'react';
import { 
  Cpu, 
  Database, 
  Activity, 
  Zap, 
  Layers, 
  Terminal, 
  CheckCircle2, 
  Sliders, 
  ShieldCheck, 
  Search,
  Sparkles,
  TrendingDown
} from 'lucide-react';
import { HermesAgent, AgentTier } from '../types';

interface HermesSwarmMatrixProps {
  agents: HermesAgent[];
  onTriggerProbe: (agentId: string) => void;
}

export const HermesSwarmMatrix: React.FC<HermesSwarmMatrixProps> = ({
  agents,
  onTriggerProbe
}) => {
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [activeInspector, setActiveInspector] = useState<HermesAgent | null>(agents[0] || null);

  const filteredAgents = agents.filter(a => {
    if (selectedTier !== 'all' && a.tier !== selectedTier) return false;
    return true;
  });

  const tierColors: Record<AgentTier, { bg: string; text: string; border: string }> = {
    ABOVE: { bg: 'bg-purple-950/60', text: 'text-purple-300', border: 'border-purple-600/60' },
    UNDER: { bg: 'bg-blue-950/60', text: 'text-blue-300', border: 'border-blue-600/60' },
    ON_WITH: { bg: 'bg-cyan-950/60', text: 'text-cyan-300', border: 'border-cyan-600/60' },
    AROUND: { bg: 'bg-emerald-950/60', text: 'text-emerald-300', border: 'border-emerald-600/60' }
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0d1527] to-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <h2 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                Hermes Agent Matrix Architecture (Nous Research Swarm)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Operating across four specialized enterprise tiers (Above, Under, On/With, and Around). 
              Each agent maintains continuous SQLite + FTS5 persistent memory indexing to retain operational history, routing weights, and supply chain state across restarts.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl font-mono text-xs">
            <div>
              <span className="text-slate-500 text-[10px] block">TOTAL PERSISTENT STATE</span>
              <span className="text-cyan-300 font-bold">1,399 MB (SQLite + FTS5)</span>
            </div>
            <div className="w-px h-7 bg-slate-800 mx-2" />
            <div>
              <span className="text-slate-500 text-[10px] block">AVG TTFT LATENCY</span>
              <span className="text-emerald-400 font-bold">29.4 ms</span>
            </div>
          </div>
        </div>

        {/* Tier filter buttons */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800/60 overflow-x-auto no-scrollbar">
          <span className="text-xs text-slate-500 font-mono shrink-0 mr-1">AGENT TIER:</span>
          {[
            { id: 'all', label: 'All Swarm Layers (8)' },
            { id: 'ABOVE', label: 'Hermes Above (Strategic & Yield)', desc: 'Executive Treasury & Governance' },
            { id: 'UNDER', label: 'Hermes Under (Infrastructure & Edge)', desc: 'Cloud Run, TTFT & Latency Probes' },
            { id: 'ON_WITH', label: 'Hermes On/With (Execution & Arbitrage)', desc: 'Gemini Flash vs Pro Router' },
            { id: 'AROUND', label: 'Hermes Around (Media & SEO Hub)', desc: 'Avatar Video & Syndication' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTier(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                selectedTier === t.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-semibold'
                  : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Agent Cards & Deep Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Agent Cards List */}
        <div className="lg:col-span-2 space-y-3">
          {filteredAgents.map((agent) => {
            const styling = tierColors[agent.tier];
            const isSelected = activeInspector?.id === agent.id;

            return (
              <div
                key={agent.id}
                onClick={() => setActiveInspector(agent)}
                className={`bg-slate-900/80 border rounded-xl p-4 cursor-pointer transition-all hover:border-cyan-500/50 ${
                  isSelected 
                    ? 'border-cyan-500 ring-1 ring-cyan-500/30 bg-slate-900' 
                    : 'border-slate-800 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs font-mono">{agent.name}</span>
                        <span className={`px-2 py-0.2 rounded text-[10px] font-mono border ${styling.bg} ${styling.text} ${styling.border}`}>
                          {agent.tier}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          • {agent.uptime} uptime
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">{agent.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-[10px] font-mono font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {agent.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Current Task String */}
                <div className="mt-3 bg-slate-950/70 border border-slate-800/80 rounded-lg p-2.5 text-xs font-mono text-slate-300 flex items-start gap-2">
                  <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2 leading-relaxed">{agent.currentTask}</span>
                </div>

                {/* Quick stats footer */}
                <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-3">
                    <span>TTFT: <strong className="text-emerald-400">{agent.ttftMs}ms</strong></span>
                    <span>•</span>
                    <span>MEMORY: <strong className="text-slate-300">{agent.memoryIndexSize}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-cyan-400 font-medium">
                    <span>{agent.modelRoute}</span>
                    <span className="text-slate-600">|</span>
                    <span className="text-emerald-400">{agent.arbitrageSavingsPercent}% Sav</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 1 Col: Detailed Inspector Panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col justify-between">
          {activeInspector ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-cyan-400 font-mono block">AGENT TELEMETRY INSPECTOR</span>
                  <h3 className="font-bold text-white text-sm font-mono">{activeInspector.name}</h3>
                </div>
                <button
                  onClick={() => onTriggerProbe(activeInspector.id)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition-all flex items-center gap-1"
                >
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>Synthetic Ping</span>
                </button>
              </div>

              {/* State attributes */}
              <div className="space-y-2 text-xs font-mono">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                  <span className="text-slate-500 text-[10px] block">OPERATIONAL MISSION</span>
                  <span className="text-slate-200 leading-relaxed">{activeInspector.role}</span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                  <span className="text-slate-500 text-[10px] block">PERSISTENT MEMORY STORAGE</span>
                  <span className="text-cyan-300 font-medium">{activeInspector.memoryIndexSize}</span>
                  <span className="text-slate-500 block text-[10px] mt-0.5">
                    Backed by Cloud Storage FUSE mount &amp; SQLite FTS5 table
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                    <span className="text-slate-500 text-[10px] block">INFERENCE MODEL</span>
                    <span className="text-purple-300 font-semibold">{activeInspector.modelRoute}</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                    <span className="text-slate-500 text-[10px] block">SAVINGS DELIVERED</span>
                    <span className="text-emerald-400 font-semibold">{activeInspector.arbitrageSavingsPercent}% yield</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                  <span className="text-slate-500 text-[10px] block">ACTIVE REASONING TRACE</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed mt-1">
                    {activeInspector.currentTask}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Self-improving feedback loop synchronized</span>
                  </div>
                </div>
              </div>

              {/* Architectural notes */}
              <div className="bg-cyan-950/20 border border-cyan-800/40 p-3 rounded-xl text-xs">
                <span className="text-cyan-300 font-bold block mb-1 font-mono text-[11px]">
                  Nous Research Persistent Loop
                </span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Unlike ephemeral scripts, this Hermes agent retains memory in <code className="text-cyan-300">~/.hermes/sessions.db</code> and queries historical degradation curves across multi-month production windows.
                </p>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-500 text-xs font-mono">
              Select an agent to inspect internal persistent telemetry
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 mt-4 text-[10px] text-slate-500 font-mono flex items-center justify-between">
            <span>DAEMON: supervisord</span>
            <span>RUNTIME: uv Python 3.11</span>
          </div>
        </div>
      </div>
    </div>
  );
};
