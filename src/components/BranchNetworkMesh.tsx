import React, { useState } from 'react';
import { 
  Layers, 
  GitBranch, 
  Plus, 
  RefreshCw, 
  ExternalLink, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  Sliders, 
  Send,
  Zap
} from 'lucide-react';
import { ChildAppNode, HermesAgent } from '../types';

interface BranchNetworkMeshProps {
  nodes: ChildAppNode[];
  agents: HermesAgent[];
  onSyncNode: (nodeId: string) => void;
  onAddNewNode: (newNode: ChildAppNode) => void;
  onDispatchDirectiveToNode: (nodeId: string, directive: string) => void;
}

export const BranchNetworkMesh: React.FC<BranchNetworkMeshProps> = ({
  nodes,
  agents,
  onSyncNode,
  onAddNewNode,
  onDispatchDirectiveToNode
}) => {
  const [showSpawnModal, setShowSpawnModal] = useState<boolean>(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodes[0]?.id || '');
  const [nodeDirective, setNodeDirective] = useState<string>('');
  const [activeSyncingId, setActiveSyncingId] = useState<string | null>(null);

  // New Node Form State
  const [formData, setFormData] = useState({
    name: '',
    code: `NODE-0${nodes.length + 1}`,
    description: '',
    category: 'e-commerce' as ChildAppNode['category'],
    gitRepo: 'git@botvibe.internal:apps/new-app.git',
    gitBranch: 'main',
    deploymentTarget: 'Google Cloud Run' as ChildAppNode['deploymentTarget'],
    monthlyVolume: '10,000 req/mo',
    keyMetricLabel: 'Efficiency Score',
    keyMetricValue: '99.4%',
    webhookUrl: 'https://ais-dev-2pxa5m7ziulyhm2d2ovr3i-169138870528.us-west1.run.app/api/webhooks/custom'
  });

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  const handleSync = (nodeId: string) => {
    setActiveSyncingId(nodeId);
    onSyncNode(nodeId);
    setTimeout(() => {
      setActiveSyncingId(null);
    }, 900);
  };

  const handleCreateNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newNode: ChildAppNode = {
      id: `node-${Date.now()}`,
      name: formData.name,
      code: formData.code,
      description: formData.description || 'Custom autonomous project governed by Node Q Hermes agents.',
      category: formData.category,
      status: 'online',
      gitRepo: formData.gitRepo,
      gitBranch: formData.gitBranch,
      deploymentTarget: formData.deploymentTarget,
      assignedAgents: ['agent-above-01', 'agent-on-01'],
      monthlyVolume: formData.monthlyVolume,
      grossMargin: '65.0%',
      keyMetricLabel: formData.keyMetricLabel,
      keyMetricValue: formData.keyMetricValue,
      lastSyncTimestamp: 'Just now',
      config: {
        webhookUrl: formData.webhookUrl,
        autoArbitrage: true,
        governanceThreshold: 0.633,
        adSpendUnlocked: false,
        cogsTarget: 5.0
      }
    };

    onAddNewNode(newNode);
    setSelectedNodeId(newNode.id);
    setShowSpawnModal(false);
  };

  const handleSendDirective = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nodeDirective.trim()) return;
    onDispatchDirectiveToNode(selectedNode.id, nodeDirective);
    setNodeDirective('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0e1628] to-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <h2 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                Empire Branch Network &amp; Connected Satellite Nodes
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Node Q serves as the supreme executive origin node. 
              As new projects, apps, and e-commerce storefronts are built, they branch out from Node Q, inheriting persistent Hermes agent governance, automated logistics, and multi-cloud deployment.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSpawnModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-500/20 border border-emerald-400/30 transition-all hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4" />
              <span>Spawn New Satellite App Node</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Child Apps Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {nodes.map((app) => {
          const isSelected = selectedNode?.id === app.id;
          const assignedAgentObjects = agents.filter(a => app.assignedAgents.includes(a.id));
          const isSyncing = activeSyncingId === app.id;

          return (
            <div
              key={app.id}
              onClick={() => setSelectedNodeId(app.id)}
              className={`bg-slate-900/80 border rounded-2xl p-5 cursor-pointer transition-all hover:border-cyan-500/50 shadow-xl ${
                isSelected 
                  ? 'border-cyan-500 ring-1 ring-cyan-500/40 bg-slate-900' 
                  : 'border-slate-800 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center font-mono font-bold text-cyan-400 text-sm shadow">
                    {app.code}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm tracking-tight">{app.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/70 border border-cyan-800/40 px-2 py-0.2 rounded-full uppercase">
                        {app.category}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {app.deploymentTarget}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSync(app.id);
                    }}
                    className={`p-1.5 rounded-lg border border-slate-700 bg-slate-800/60 text-slate-300 hover:text-cyan-300 transition-all ${
                      isSyncing ? 'animate-spin text-cyan-400 border-cyan-500' : ''
                    }`}
                    title="Force cross-platform sync with Node Q"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {app.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-3 leading-relaxed line-clamp-2">
                {app.description}
              </p>

              {/* Metrics & Git branch */}
              <div className="mt-4 pt-4 border-t border-slate-800/70 grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 block">SCALE VOLUME</span>
                  <span className="font-bold text-white">{app.monthlyVolume}</span>
                </div>
                <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 block">{app.keyMetricLabel.toUpperCase()}</span>
                  <span className="font-bold text-emerald-400">{app.keyMetricValue}</span>
                </div>
                <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 block">GROSS MARGIN</span>
                  <span className="font-bold text-cyan-300">{app.grossMargin}</span>
                </div>
              </div>

              {/* Git & Assigned Hermes Agents */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5 truncate max-w-[240px]">
                  <GitBranch className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate text-slate-300">{app.gitBranch}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px]">
                  <Cpu className="w-3 h-3 text-cyan-400" />
                  <span>{assignedAgentObjects.length} Hermes Agents</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail / Directive Control Room for Selected Node */}
      {selectedNode && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider">
                EXECUTIVE DIRECTIVE CONSOLE // {selectedNode.code}
              </span>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>{selectedNode.name}</span>
                <span className="text-xs font-mono font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  {selectedNode.gitRepo}
                </span>
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Target Cloud:</span>
              <span className="px-2 py-1 bg-cyan-950 border border-cyan-800 text-cyan-300 rounded font-bold">
                {selectedNode.deploymentTarget}
              </span>
            </div>
          </div>

          {/* Quick directive dispatch form */}
          <form onSubmit={handleSendDirective} className="flex gap-2">
            <input
              type="text"
              value={nodeDirective}
              onChange={(e) => setNodeDirective(e.target.value)}
              placeholder={`Issue executive directive to ${selectedNode.name} (e.g. "Reroute print provider" or "Audit token tax")...`}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold font-mono shadow-md transition-all shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Dispatch Directive</span>
            </button>
          </form>

          {/* Configuration & Autonomy Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2 text-xs font-mono">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block mb-1">AUTO-MODEL ARBITRAGE</span>
              <div className="flex items-center justify-between">
                <span className="text-emerald-400 font-bold">ACTIVE (tau = {selectedNode.config.governanceThreshold})</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block mb-1">PROGRAMMATIC AD SPEND</span>
              <div className="flex items-center justify-between">
                <span className={selectedNode.config.adSpendUnlocked ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                  {selectedNode.config.adSpendUnlocked ? 'UNLOCKED (ROAS >= 3.5x)' : 'GATED ($0 Organic Buffer)'}
                </span>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block mb-1">COGS TARGET PER UNIT</span>
              <span className="text-white font-bold">${selectedNode.config.cogsTarget.toFixed(2)}</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block mb-1">SYNCHRONIZATION WEBHOOK</span>
              <span className="text-slate-400 text-[10px] truncate block" title={selectedNode.config.webhookUrl}>
                {selectedNode.config.webhookUrl}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Spawn New Node Modal */}
      {showSpawnModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase">HERMES APP MESH REGISTRATION</span>
                <h3 className="text-base font-bold text-white">Spawn Satellite Child Node</h3>
              </div>
              <button
                onClick={() => setShowSpawnModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNode} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-slate-400 mb-1">Application Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Apex FinTech Clearinghouse"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="e-commerce">E-Commerce</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="publishing">Publishing</option>
                    <option value="media">Media &amp; Video</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Deployment Target</label>
                  <select
                    value={formData.deploymentTarget}
                    onChange={(e) => setFormData({ ...formData, deploymentTarget: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Google Cloud Run">Google Cloud Run</option>
                    <option value="Cloudflare Edge">Cloudflare Edge</option>
                    <option value="Encore.cloud">Encore.cloud</option>
                    <option value="AWS Fargate">AWS Fargate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Git Repository (SSH/HTTPS)</label>
                <input
                  type="text"
                  value={formData.gitRepo}
                  onChange={(e) => setFormData({ ...formData, gitRepo: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Branch Name</label>
                <input
                  type="text"
                  value={formData.gitBranch}
                  onChange={(e) => setFormData({ ...formData, gitBranch: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSpawnModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold"
                >
                  Register Node &amp; Allocate Hermes Swarm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
