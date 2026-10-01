import React from 'react';
import { 
  Cpu, 
  Globe, 
  Rocket, 
  ShieldCheck, 
  Zap, 
  GitBranch, 
  Terminal, 
  TrendingUp,
  Layers,
  Sparkles,
  Server
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDeployModal: () => void;
  isAutopilot: boolean;
  setIsAutopilot: (val: boolean) => void;
  activeAgentsCount: number;
  protocolYield: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenDeployModal,
  isAutopilot,
  setIsAutopilot,
  activeAgentsCount,
  protocolYield
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-[#090d16]/95 backdrop-blur-md sticky top-0 z-40">
      {/* Top Telemetry Ticker */}
      <div className="border-b border-slate-800/40 bg-slate-950/60 px-4 py-1.5 text-xs font-mono flex items-center justify-between text-slate-400">
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 text-emerald-400 shrink-0 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>NODE Q // APEX ORCHESTRATOR ONLINE</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="shrink-0 text-slate-300">
            HERMES SWARM: <span className="text-cyan-400 font-bold">{activeAgentsCount} ACTIVE</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="shrink-0 text-slate-300">
            SAVINGS GOVERNANCE: <span className="text-emerald-400 font-bold">τ = 0.633 (63.3%)</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="shrink-0 text-slate-300">
            BLENDED MARGIN: <span className="text-amber-400 font-bold">55.1% ($22.28/unit)</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="shrink-0 text-slate-300">
            PROTOCOL YIELD MTD: <span className="text-purple-400 font-bold">{protocolYield}</span>
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <span className="text-slate-500 text-[11px]">CONTAINER: DEBIAN 12 • PYTHON 3.11 (uv) • GIT 2.45</span>
          <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-[10px] tracking-wider uppercase">
            Google Cloud Run
          </span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-400/30">
              <span className="font-extrabold text-white text-lg tracking-tight font-mono">Q</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>NODE Q</span>
                <span className="text-xs font-mono font-normal text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                  v2.6.4 APEX
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Corporate Executive Command Center & Global Hermes Logistics Engine
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Autopilot toggle */}
          <button
            onClick={() => setIsAutopilot(!isAutopilot)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              isAutopilot 
                ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-300 hover:bg-emerald-900/40' 
                : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
            title="When active, Hermes agents execute rerouting, ad unlocks, and margin protection without manual human approval"
          >
            <Zap className={`w-3.5 h-3.5 ${isAutopilot ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`} />
            <span>Autopilot: <strong className="uppercase">{isAutopilot ? 'Autonomous' : 'Semi-Auto'}</strong></span>
          </button>

          {/* 1-Click Deploy Hermes Swarm Button */}
          <button
            onClick={onOpenDeployModal}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 text-white font-semibold text-xs shadow-lg shadow-cyan-500/25 hover:from-cyan-500 hover:to-blue-500 border border-cyan-400/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Rocket className="w-3.5 h-3.5 text-cyan-100 animate-bounce" />
            <span>1-Click Deploy Hermes Swarm</span>
          </button>
        </div>
      </div>

      {/* Executive Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto no-scrollbar gap-1 border-t border-slate-800/50">
        {[
          { id: 'dashboard', label: 'Global Logistics Radar', icon: Globe, badge: 'Live' },
          { id: 'swarm', label: 'Hermes Swarm Matrix', icon: Cpu, badge: '8 Units' },
          { id: 'mesh', label: 'Branch App Mesh (Empire)', icon: Layers, badge: '4 Nodes' },
          { id: 'roadmap', label: 'Multi-Tenant Architecture', icon: Server, badge: 'Enterprise' },
          { id: 'python-git', label: 'Python & Git Studio', icon: GitBranch, badge: 'uv 3.11' },
          { id: 'financials', label: 'Predictive Horizons', icon: TrendingUp, badge: '5-Year' },
          { id: 'terminal', label: 'Hermes CLI Console', icon: Terminal, badge: 'Bash' }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
