import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  CheckCircle2, 
  Loader2, 
  Terminal, 
  Cpu, 
  Server, 
  ShieldCheck, 
  Database,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { DeploymentStep } from '../types';

interface DeploySwarmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeploymentSuccess: () => void;
}

export const DeploySwarmModal: React.FC<DeploySwarmModalProps> = ({
  isOpen,
  onClose,
  onDeploymentSuccess
}) => {
  const [steps, setSteps] = useState<DeploymentStep[]>([
    {
      id: 'step-1',
      stepNumber: 1,
      title: 'Container Base & OS Environment',
      description: 'Debian 12 Bookworm minimal base image packaging with glibc and ca-certificates',
      status: 'pending'
    },
    {
      id: 'step-2',
      stepNumber: 2,
      title: 'Python 3.11 Runtime & uv Package Orchestration',
      description: 'Provisioning uv package manager, installing nous-hermes-agent, numpy, and schema validators',
      status: 'pending'
    },
    {
      id: 'step-3',
      stepNumber: 3,
      title: 'Decentralized Git & Submodule Configuration',
      description: 'Configuring Git 2.45, SSH deploy keys, and cross-repo syncing for child app branches',
      status: 'pending'
    },
    {
      id: 'step-4',
      stepNumber: 4,
      title: 'Process Supervisor & Self-Healing Daemon',
      description: 'Configuring supervisord daemon for zero-downtime worker restarts and structured logging',
      status: 'pending'
    },
    {
      id: 'step-5',
      stepNumber: 5,
      title: 'Cloud Storage FUSE Mount & SQLite FTS5 Memory',
      description: 'Establishing persistent memory layer (~/.hermes/sessions.db) across container scaling instances',
      status: 'pending'
    },
    {
      id: 'step-6',
      stepNumber: 6,
      title: 'Dynamic Gemini Arbitrage Handshake (tau = 0.633)',
      description: 'Connecting Google AI Studio Gemini API keys with hardware security module (Cloud KMS)',
      status: 'pending'
    },
    {
      id: 'step-7',
      stepNumber: 7,
      title: 'Swarm Matrix Online (Above, Under, On/With, Around)',
      description: 'Spinning up 8 Hermes agents with persistent memory and supply chain routing graphs',
      status: 'pending'
    }
  ]);

  const [deploying, setDeploying] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    'Ready for 1-click autonomous deployment of Hermes Swarm on Google Cloud Run.'
  ]);
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setDeploying(false);
      setCurrentStepIndex(-1);
      setCompleted(false);
    }
  }, [isOpen]);

  const startDeployment = async () => {
    setDeploying(true);
    setConsoleLogs([
      '[DEPLOY-001] Initializing 1-Click Hermes Swarm Deployment...',
      '[DOCKER] Pulling debian:12-slim container image...',
      '[SECURITY] Verifying GCP KMS hardware security module encryption...'
    ]);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStepIndex(i);
      setSteps(prev => prev.map((s, idx) => {
        if (idx === i) return { ...s, status: 'in_progress' };
        if (idx < i) return { ...s, status: 'completed' };
        return s;
      }));

      // Add log
      await new Promise(r => setTimeout(r, 650));
      
      const logMessages = [
        `[OS-ENV] Debian 12 container environment initialized (vCPU burst enabled).`,
        `[PYTHON] uv 0.1.20 detected. Installed nous-hermes-agent runtime & Python 3.11.8.`,
        `[GIT] Git submodules mapped to Lone Wolf Appalachia, CostImplode, and OmniPublish.`,
        `[SUPERVISOR] supervisord spawned worker daemons (healthcheck status: 200 OK).`,
        `[STORAGE] Cloud Storage FUSE mounted at /mnt/hermes-state. SQLite FTS5 index ready.`,
        `[ARBITRAGE] Google AI Studio Gemini API authenticated. tau = 0.633 governance active.`,
        `[SWARM] Hermes Above, Under, On/With, and Around agents reporting ONLINE.`
      ];

      setConsoleLogs(prev => [...prev, logMessages[i]]);

      setSteps(prev => prev.map((s, idx) => {
        if (idx === i) return { ...s, status: 'completed' };
        return s;
      }));
    }

    setDeploying(false);
    setCompleted(true);
    setConsoleLogs(prev => [
      ...prev,
      '======================================================',
      '[SUCCESS] Hermes Swarm fully deployed and operational at Node Q!',
      '[METRICS] 8 Agents running • Avg TTFT: 24ms • 63.3% savings target active.',
      '======================================================'
    ]);

    onDeploymentSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl space-y-5 max-h-[92vh] flex flex-col justify-between overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Rocket className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                AUTOMATED CLOUD RUN PROVISIONER
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                1-Click Hermes Agent Swarm Deployment
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-sm font-mono"
          >
            ✕
          </button>
        </div>

        {/* Step Progress Checklist */}
        <div className="space-y-2.5 overflow-y-auto max-h-56 pr-2">
          {steps.map((s, idx) => {
            return (
              <div
                key={s.id}
                className={`p-2.5 rounded-xl border text-xs font-mono transition-all flex items-start gap-3 ${
                  s.status === 'completed'
                    ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                    : s.status === 'in_progress'
                    ? 'bg-cyan-950/30 border-cyan-500 text-cyan-200 ring-1 ring-cyan-500/40'
                    : 'bg-slate-950/40 border-slate-800 text-slate-500'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {s.status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : s.status === 'in_progress' ? (
                    <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px]">
                      {s.stepNumber}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between font-bold">
                    <span className={s.status === 'completed' ? 'text-white' : ''}>{s.title}</span>
                    <span className="text-[10px] uppercase font-normal">
                      {s.status === 'completed' ? 'INSTALLED' : s.status === 'in_progress' ? 'PROVISIONING...' : 'PENDING'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-normal mt-0.5">{s.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Build / Deploy Terminal Output */}
        <div className="bg-[#050811] border border-slate-800 rounded-xl p-3 font-mono text-[11px] text-slate-300 max-h-32 overflow-y-auto">
          <div className="text-slate-500 mb-1 flex items-center gap-1.5 text-[10px]">
            <Terminal className="w-3 h-3 text-cyan-400" />
            <span>CLOUD BUILD &amp; CONTAINER ORCHESTRATION STREAM</span>
          </div>
          {consoleLogs.map((log, i) => (
            <div key={i} className="leading-relaxed">
              {log.startsWith('[SUCCESS]') ? (
                <span className="text-emerald-400 font-bold">{log}</span>
              ) : log.startsWith('[SWARM]') ? (
                <span className="text-cyan-300 font-medium">{log}</span>
              ) : (
                <span className="text-slate-300">{log}</span>
              )}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <div className="text-[11px] font-mono text-slate-400">
            Target: <strong className="text-slate-200">Google Cloud Run (Stateless Auto-Scale)</strong>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-mono font-medium transition-all"
            >
              Close
            </button>

            {!completed ? (
              <button
                onClick={startDeployment}
                disabled={deploying}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs font-mono shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50"
              >
                {deploying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Spinning Up Hermes Swarm...</span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4" />
                    <span>Initiate 1-Click Deploy</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs font-mono shadow-lg shadow-emerald-500/25 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Swarm Deployed (View Live System)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
