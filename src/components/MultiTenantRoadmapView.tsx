import React, { useState, useEffect } from 'react';
import { 
  Server, 
  ShieldCheck, 
  Cpu, 
  Lock, 
  Database, 
  Cloud, 
  Terminal, 
  DollarSign, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCw, 
  Zap, 
  Layers, 
  ArrowRight, 
  FileCode, 
  ChevronRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { 
  ARCHITECTURE_LAYERS, 
  INITIAL_S6_PROCESSES, 
  INITIAL_DURABLE_OBJECT_LOCKS, 
  TENANT_PLAN_TIERS,
  LITESTREAM_CONFIG_TEMPLATE,
  PYTHON_SIGNAL_HANDLER_CODE
} from '../data/multiTenantData';
import { ArchitectureLayerSpec, S6ProcessInfo, DurableObjectSessionLock, TenantPlanTier } from '../types';

export const MultiTenantRoadmapView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'architecture' | 's6_supervisor' | 'concurrency_litestream' | 'durable_objects' | 'economics' | 'gemini_protocol'>('architecture');
  const [selectedLayer, setSelectedLayer] = useState<ArchitectureLayerSpec>(ARCHITECTURE_LAYERS[0]);
  const [s6Processes, setS6Processes] = useState<S6ProcessInfo[]>(INITIAL_S6_PROCESSES);
  const [sessionLocks, setSessionLocks] = useState<DurableObjectSessionLock[]>(INITIAL_DURABLE_OBJECT_LOCKS);
  const [selectedTier, setSelectedTier] = useState<TenantPlanTier>(TENANT_PLAN_TIERS[1]); // Default Pro
  
  // SIGTERM simulation state
  const [isSimulatingSigterm, setIsSimulatingSigterm] = useState<boolean>(false);
  const [sigtermLogs, setSigtermLogs] = useState<string[] | null>(null);

  // Restart s6 process simulation
  const handleRestartProcess = (processName: string) => {
    setS6Processes(prev => prev.map(p => {
      if (p.name === processName) {
        return {
          ...p,
          status: 'restarting',
          restartCount: p.restartCount + 1,
          uptimeSeconds: 0
        };
      }
      return p;
    }));

    setTimeout(() => {
      setS6Processes(prev => prev.map(p => {
        if (p.name === processName) {
          return {
            ...p,
            status: 'up',
            uptimeSeconds: 1
          };
        }
        return p;
      }));
    }, 1200);
  };

  // Simulate Cloud Run SIGTERM grace period
  const runSigtermSimulation = async () => {
    setIsSimulatingSigterm(true);
    setSigtermLogs([
      '[T-00.00s] Cloud Run container receives SIGTERM from Google infrastructure supervisor...',
      '[T-00.12s] Python signal.SIGTERM listener intercepts signal inside container pid 142.'
    ]);

    await new Promise(r => setTimeout(r, 700));
    setSigtermLogs(prev => [
      ...(prev || []),
      '[T-00.85s] Executing SQLite statement: PRAGMA wal_checkpoint(FULL);',
      '[T-01.20s] Flushed 84 dirty memory pages from /tmp/hermes.db-wal to /tmp/hermes.db.'
    ]);

    await new Promise(r => setTimeout(r, 800));
    setSigtermLogs(prev => [
      ...(prev || []),
      '[T-02.10s] Litestream replication sidecar flushes LSN (Log Sequence Number) to /opt/data/db-replica.',
      '[T-03.45s] Synchronous binary snapshot verified on Google Cloud Storage: gs://hermes-agent-tenant-data/wal-snapshots.',
      '[T-04.10s] Grace period exit 0. Zero data loss verified across container shutdown.'
    ]);
    setIsSimulatingSigterm(false);
  };

  // Simulate webhook edge mutex lock
  const handleTriggerWebhookRace = () => {
    const newLock: DurableObjectSessionLock = {
      id: `lock-${Date.now()}`,
      key: `tenant_test_org:slack_chan_3012`,
      tenantId: 'tenant_test_org',
      channel: 'slack',
      status: 'locked',
      heldByRequest: `req_${Math.random().toString(36).substring(2, 8)}`,
      queueDepth: 1,
      ttlMs: 3500,
      lastAcquired: 'Just now'
    };

    setSessionLocks(prev => [newLock, ...prev.slice(0, 3)]);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a1224] to-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h2 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                Multi-Tenant Hermes AI Agent Architecture &amp; Production Roadmap
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-[10px] font-mono">
                ENTERPRISE BLUEPRINT
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Decoupled multi-tenant SaaS control plane orchestrating Google Cloud Run (gen2), Cloud Storage FUSE mounts, 
              s6-overlay process supervision, Cloudflare Durable Objects distributed session locking, and native Gemini 3.7/3.8 Flash &amp; 3.1 Pro protocols.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-mono font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>terminal.backend: docker (MANDATORY)</span>
            </span>
          </div>
        </div>

        {/* Section Sub-Navigation */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
          {[
            { id: 'architecture', label: '6 Architectural Layers', icon: Layers },
            { id: 's6_supervisor', label: 's6-Overlay Supervisor', icon: Cpu },
            { id: 'concurrency_litestream', label: 'Litestream & POSIX WAL', icon: Database },
            { id: 'durable_objects', label: 'Cloudflare Edge Mutex', icon: Lock },
            { id: 'economics', label: 'Hermes Corporation Builder ($49/$199/$899)', icon: DollarSign },
            { id: 'gemini_protocol', label: 'Native Gemini REST Protocol', icon: Sparkles }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 font-semibold'
                    : 'bg-slate-950/70 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 1: 6 ARCHITECTURAL LAYERS EXPLORER */}
      {activeSection === 'architecture' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Layer Cards */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-mono text-slate-400 font-bold block px-1">
              SYSTEM ARCHITECTURE &amp; COMPONENT MAPPING
            </span>
            {ARCHITECTURE_LAYERS.map((layer) => {
              const isSelected = selectedLayer.id === layer.id;
              return (
                <div
                  key={layer.id}
                  onClick={() => setSelectedLayer(layer)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-slate-900 border-cyan-500 shadow-lg ring-1 ring-cyan-500/40' 
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-white">{layer.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-400 font-medium">
                      {layer.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[11px] text-cyan-400 font-mono mt-1 font-semibold">
                    {layer.coreTech}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {layer.responsibility}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Deep Layer Inspector */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider block">
                    ARCHITECTURAL LAYER SPECIFICATION
                  </span>
                  <h3 className="text-base font-bold text-white font-mono">{selectedLayer.name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 font-mono block">HEALTH SCORE</span>
                  <span className="text-emerald-400 font-mono font-bold text-sm">{selectedLayer.healthScore}%</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-xs font-mono">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block mb-0.5 font-bold">CORE TECHNOLOGY</span>
                  <span className="text-white font-medium">{selectedLayer.coreTech}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block mb-0.5 font-bold">EXECUTION BOUNDARY</span>
                  <span className="text-cyan-300 font-medium">{selectedLayer.executionBoundary}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 md:col-span-2">
                  <span className="text-slate-500 text-[10px] block mb-0.5 font-bold">STRATEGIC RESPONSIBILITY</span>
                  <span className="text-slate-300 leading-relaxed">{selectedLayer.responsibility}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block mb-0.5 font-bold">STATE BEHAVIOR</span>
                  <span className="text-amber-300 text-[11px] leading-relaxed">{selectedLayer.stateBehavior}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block mb-0.5 font-bold">PRIMARY RISK MITIGATED</span>
                  <span className="text-emerald-400 text-[11px] leading-relaxed">{selectedLayer.riskMitigated}</span>
                </div>
              </div>

              {/* Enhanced Isolation Architecture Note */}
              <div className="mt-4 p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs font-mono">
                <span className="text-cyan-300 font-bold block mb-1">
                  Key Decoupling Rule:
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Execution isolation ensures that memory-intensive agent loops and dynamic skill compilations run exclusively within isolated Cloud Run or AWS ECS containers. Ingress locking is delegated to Cloudflare Durable Objects to guarantee zero state contamination across parallel webhook deliveries.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono flex items-center justify-between">
              <span>ENVIRONMENT: Google Cloud Run (gen2) &bull; Cloud Storage FUSE (/opt/data)</span>
              <span>CONTROL PLANE: Encore.cloud Microservices</span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: S6-OVERLAY SUPERVISOR STATUS */}
      {activeSection === 's6_supervisor' && (
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>s6-Overlay Process Supervision Dashboard (Zero-Downtime Daemon Engine)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  s6-overlay supervises the always-on Hermes messaging gateway, the HTTP API server on port 8642, the Litestream replication sidecar, and the Docker sandbox proxy.
                </p>
              </div>

              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono text-xs border border-slate-700">
                ENTRYPOINT: <code>/init</code> (s6-overlay v3.1.5.0)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {s6Processes.map((proc) => {
                return (
                  <div key={proc.name} className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${proc.status === 'up' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-spin'}`} />
                        {proc.name}
                      </span>
                      <span className="text-[10px] text-slate-500">PID: {proc.pid}</span>
                    </div>

                    <div className="space-y-1 text-[11px] text-slate-400">
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="text-emerald-400 font-bold uppercase">{proc.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Uptime:</span>
                        <span className="text-slate-200">{(proc.uptimeSeconds / 60).toFixed(1)} mins</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Restarts:</span>
                        <span className={proc.restartCount > 0 ? 'text-amber-400 font-bold' : 'text-slate-400'}>
                          {proc.restartCount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Memory:</span>
                        <span className="text-cyan-300 font-bold">{proc.memoryUsageMb} MB</span>
                      </div>
                      {proc.port && (
                        <div className="flex justify-between">
                          <span>HTTP Port:</span>
                          <span className="text-purple-400 font-bold">{proc.port}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <div className="text-[10px] text-slate-500 truncate mb-2" title={proc.command}>
                        <code>{proc.command}</code>
                      </div>
                      <button
                        onClick={() => handleRestartProcess(proc.name)}
                        className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-700 text-[11px] font-semibold flex items-center justify-center gap-1 transition-all"
                      >
                        <RotateCw className="w-3 h-3 text-cyan-400" />
                        <span>Restart Daemon (s6-svc -t)</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dockerfile & Service Script Reference */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-[#050811] p-3.5 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">
                  s6 Gateway Run Script (/etc/services.d/gateway/run):
                </span>
                <pre className="text-slate-300 text-[11px] whitespace-pre-wrap leading-relaxed">
{`#!/bin/sh
exec hermes gateway run --data-dir /opt/data`}
                </pre>
              </div>

              <div className="bg-[#050811] p-3.5 rounded-xl border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">
                  s6 API Server Run Script (/etc/services.d/api/run):
                </span>
                <pre className="text-slate-300 text-[11px] whitespace-pre-wrap leading-relaxed">
{`#!/bin/sh
exec python3 -m hermes.api --port 8642 --data-dir /opt/data`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: LITESTREAM & POSIX WAL CONCURRENCY */}
      {activeSection === 'concurrency_litestream' && (
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span>POSIX Byte-Range Locking Protection &amp; Litestream WAL Replication</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  SQLite relies on POSIX locks unsupported by Cloud Storage FUSE. All active writes target local in-memory WAL disk (/tmp/hermes.db) with sub-second replication to /opt/data and GCS.
                </p>
              </div>

              <button
                onClick={runSigtermSimulation}
                disabled={isSimulatingSigterm}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white rounded-xl text-xs font-mono font-bold shadow-lg transition-all disabled:opacity-50"
              >
                {isSimulatingSigterm ? (
                  <>
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Handling SIGTERM Grace Period...</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Simulate Cloud Run SIGTERM (10s Window)</span>
                  </>
                )}
              </button>
            </div>

            {/* Visual Storage Flow */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] text-cyan-400 uppercase font-bold block">1. ACTIVE LOCAL WRITE DISK</span>
                <span className="text-white font-bold text-sm block">/tmp/hermes.db</span>
                <span className="text-[11px] text-slate-400 block">PRAGMA journal_mode=WAL;</span>
                <span className="text-[10px] text-emerald-400 block font-medium">Fast sub-millisecond writes</span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] text-emerald-400 uppercase font-bold block">2. LITESTREAM SIDECAR</span>
                <span className="text-white font-bold text-sm block">500ms Frame Sync</span>
                <span className="text-[11px] text-slate-400 block">Reads /tmp/hermes.db-wal</span>
                <span className="text-[10px] text-cyan-300 block font-medium">Continuous replication</span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] text-purple-400 uppercase font-bold block">3. GCS FUSE PERSISTENCE</span>
                <span className="text-white font-bold text-sm block">/opt/data/db-replica</span>
                <span className="text-[11px] text-slate-400 block">Mounted GCS Bucket</span>
                <span className="text-[10px] text-slate-300 block font-medium">Preserved across cold starts</span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] text-amber-400 uppercase font-bold block">4. MULTI-CLOUD COLD BACKUP</span>
                <span className="text-white font-bold text-sm block">AWS S3 Glacier</span>
                <span className="text-[11px] text-slate-400 block">Daily snapshot replication</span>
                <span className="text-[10px] text-emerald-400 block font-medium">Disaster recovery guaranteed</span>
              </div>
            </div>

            {/* SIGTERM Terminal Output Trace */}
            {sigtermLogs && (
              <div className="bg-[#050811] p-4 rounded-xl border border-amber-600/40 font-mono text-xs space-y-1 text-slate-200">
                <div className="text-[10px] text-amber-400 uppercase font-bold mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Cloud Run SIGTERM Grace Period Execution Log</span>
                </div>
                {sigtermLogs.map((log, i) => (
                  <div key={i} className="leading-relaxed">
                    {log.includes('Full WAL checkpoint') || log.includes('Zero data loss') ? (
                      <span className="text-emerald-400 font-bold">{log}</span>
                    ) : (
                      <span className="text-slate-300">{log}</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Code Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-[#050811] p-3.5 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">
                  Litestream Config Schema (/etc/litestream.yml):
                </span>
                <pre className="text-slate-300 text-[11px] whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
{LITESTREAM_CONFIG_TEMPLATE}
                </pre>
              </div>

              <div className="bg-[#050811] p-3.5 rounded-xl border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">
                  Python SIGTERM Grace Handler:
                </span>
                <pre className="text-slate-300 text-[11px] whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
{PYTHON_SIGNAL_HANDLER_CODE}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: CLOUDFLARE DURABLE OBJECTS EDGE MUTEX */}
      {activeSection === 'durable_objects' && (
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide flex items-center gap-2">
                  <Lock className="w-4 h-4 text-cyan-400" />
                  <span>Cloudflare Workers &amp; Durable Objects Distributed Edge Session Locks</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Distributed edge session locks keyed to <code>tenant_id:channel_id</code>. Intercepts webhooks at the edge and prevents parallel execution loops that corrupt agent state on disk.
                </p>
              </div>

              <button
                onClick={handleTriggerWebhookRace}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-mono font-semibold transition-all shadow"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Simulate Concurrent Webhook Arrival</span>
              </button>
            </div>

            {/* Active Lock Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                    <th className="py-2.5 px-3">MUTEX LOCK KEY</th>
                    <th className="py-2.5 px-3">CHANNEL</th>
                    <th className="py-2.5 px-3">STATUS</th>
                    <th className="py-2.5 px-3">HELD BY</th>
                    <th className="py-2.5 px-3">QUEUE DEPTH</th>
                    <th className="py-2.5 px-3 text-right">TTL MS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {sessionLocks.map(l => (
                    <tr key={l.id} className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-bold text-cyan-300">
                        {l.key}
                      </td>
                      <td className="py-2.5 px-3 uppercase text-slate-300">
                        {l.channel}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          l.status === 'locked' ? 'bg-red-950 text-red-400 border border-red-800' :
                          l.status === 'queued' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                          'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}>
                          {l.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">
                        {l.heldByRequest}
                      </td>
                      <td className="py-2.5 px-3 text-slate-300">
                        {l.queueDepth > 0 ? (
                          <span className="text-amber-400 font-bold">{l.queueDepth} requests queued</span>
                        ) : (
                          <span className="text-slate-500">0 queued</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-200">
                        {l.ttlMs > 0 ? `${l.ttlMs} ms` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Zero-Scale Cold-Start Mitigation Note */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2">
              <span className="text-cyan-400 font-bold block">
                Cold-Start &amp; Webhook Timeout Mitigation Architecture:
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                When Google Cloud Run scales to zero (<code className="text-cyan-300">min-instances=0</code>), incoming webhooks from Telegram or Discord can trigger cold starts lasting 3 to 5 seconds. 
                The Cloudflare Worker intercepts the payload, acquires the Durable Object lock, immediately sends an HTTP 200 ACK and a typing indicator to the user, and asynchronously forwards the request to Cloud Run using <code className="text-cyan-300">context.waitUntil()</code>. This completely eliminates webhook retry storms!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: COMMERCIAL ECONOMICS & SCALE FINANCIALS */}
      {activeSection === 'economics' && (
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Hermes Corporation Builder &bull; Multi-Tier Commercial Economics</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Delivers high-performance agent capabilities while sustaining target gross margins above 70% across Starter ($49/mo), Professional ($199/mo), and Enterprise ($899/mo).
                </p>
              </div>

              {/* Tier selector */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 font-mono text-xs">
                {TENANT_PLAN_TIERS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTier(t)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      selectedTier.id === t.id
                        ? 'bg-cyan-600 text-white font-bold shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t.name.split(' ')[0]} (${t.pricePerMonth})
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Tier Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-3">
                <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                  <span className="font-bold text-white text-base">{selectedTier.name}</span>
                  <span className="text-emerald-400 font-bold text-lg">${selectedTier.pricePerMonth} <span className="text-xs text-slate-500 font-normal">/ mo</span></span>
                </div>
                <div className="text-slate-400 text-[11px]">{selectedTier.targetAudience}</div>
                <div className="space-y-1.5 pt-2 text-[11px] text-slate-300">
                  <div className="flex justify-between">
                    <span>Active Agent Fleet:</span>
                    <span className="text-cyan-400 font-bold">{selectedTier.activeFleetSize} instances</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Parallel Workers:</span>
                    <span className="text-purple-400 font-bold">{selectedTier.concurrentSubagents} workers</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Persistent Storage:</span>
                    <span className="text-slate-200 font-bold">{selectedTier.storageGb} GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sandbox Backend:</span>
                    <span className="text-emerald-400 font-bold">{selectedTier.sandboxBackend}</span>
                  </div>
                </div>
              </div>

              {/* Unit Economics & COGS Breakdown */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-3">
                <span className="text-[10px] text-slate-500 uppercase block font-bold border-b border-slate-800 pb-2">
                  MONTHLY UNIT COGS BREAKDOWN
                </span>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between text-slate-400">
                    <span>Cloud Compute (Cloud Run):</span>
                    <span className="text-white">${selectedTier.cogsBreakdown.compute.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>GCS Storage &amp; FUSE Egress:</span>
                    <span className="text-white">${selectedTier.cogsBreakdown.storage.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Gemini API Token Consumption:</span>
                    <span className="text-white">${selectedTier.cogsBreakdown.geminiApi.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300 pt-1 border-t border-slate-800/80 font-bold">
                    <span>Total Cost of Goods Sold:</span>
                    <span className="text-amber-400">${selectedTier.cogsBreakdown.totalCogs.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Profit & Margin Retention */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-3">
                <span className="text-[10px] text-emerald-400 uppercase block font-bold border-b border-slate-800 pb-2">
                  GROSS PROFIT &amp; MARGIN RETENTION
                </span>
                <div className="space-y-2 pt-1">
                  <div>
                    <span className="text-slate-500 text-[10px] block">NET GROSS PROFIT PER USER</span>
                    <span className="text-2xl font-bold text-emerald-400">
                      +${selectedTier.cogsBreakdown.grossProfit.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">GROSS MARGIN PERCENT</span>
                    <span className="text-xl font-bold text-cyan-300">
                      {selectedTier.cogsBreakdown.grossMarginPercent}%
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Target exceeds 70% threshold</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scale Horizon Callout */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between">
              <div>
                <span className="text-cyan-400 font-bold">5-Year ARR Trajectory:</span>
                <span className="text-slate-400 ml-2">Scales from $2.19M ARR (Year 1) to $98.0M ARR (Year 5) with 31.0% normalized EBITDA margin.</span>
              </div>
              <span className="text-emerald-400 font-bold shrink-0">65,000 Active Fleets</span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: NATIVE GEMINI PROTOCOL & THOUGHT SIGNATURES */}
      {activeSection === 'gemini_protocol' && (
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Google AI Studio Direct Integration &bull; Native Gemini REST Mapping</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Bypasses translation abstraction layers by mapping internal Hermes agent message constructs directly into native Gemini REST API primitives on <code>https://generativelanguage.googleapis.com/v1beta</code>.
              </p>
            </div>

            {/* Hierarchical Model Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300 text-sm">gemini-3.7-flash</span>
                  <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">Workhorse</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Balanced operational workhorse for standard tasks, local file parsing, and web search synthesis. Supports native context windows exceeding 1,000,000 tokens.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-300 text-sm">gemini-3.8-flash</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">Agentic Coding</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Specialized development engine for complex software engineering, dynamic skill compilation, and multi-step tool loops requiring elevated structural accuracy.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-300 text-sm">gemini-3.1-pro-preview</span>
                  <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800">Top-Tier Reasoning</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Reserved for top-tier enterprise reasoning, long-horizon architectural design, full codebase analysis over 1M+ contexts, and complex financial modeling.
                </p>
              </div>
            </div>

            {/* Direct Schema Translation Matrix */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono space-y-3">
              <span className="text-cyan-400 font-bold block text-[11px]">
                HERMES AGENT TO GEMINI REST SCHEMA MAPPING:
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">HERMES CONTEXT</span>
                  <span className="text-white font-bold">&rarr; contents[]</span>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">SYSTEM PROMPT</span>
                  <span className="text-cyan-300 font-bold">&rarr; systemInstruction</span>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">TOOL REGISTRY</span>
                  <span className="text-emerald-300 font-bold">&rarr; functionDeclarations</span>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">TOOL RETURNS</span>
                  <span className="text-purple-300 font-bold">&rarr; functionResponse</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
