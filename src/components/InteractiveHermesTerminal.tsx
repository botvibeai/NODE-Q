import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, CornerDownLeft, Sparkles, Trash2 } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'error';
  text: string;
}

interface InteractiveHermesTerminalProps {
  onOpenDeployModal: () => void;
  onExecuteScript: (scriptId: string) => Promise<any>;
}

export const InteractiveHermesTerminal: React.FC<InteractiveHermesTerminalProps> = ({
  onOpenDeployModal,
  onExecuteScript
}) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: '1', type: 'system', text: 'Node Q Supreme Operating System [Version 2.6.4-apex]' },
    { id: '2', type: 'system', text: 'Hermes Agent Swarm Runtime: Debian 12 (bookworm) • Python 3.11.8 (uv) • Git 2.45.1' },
    { id: '3', type: 'system', text: 'Persistent Memory: Cloud Storage FUSE Mount active (~/.hermes/sessions.db with FTS5 search index)' },
    { id: '4', type: 'output', text: 'Type "help" to view all available Hermes swarm management commands.' }
  ]);
  const [inputVal, setInputVal] = useState<string>('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const newLines: TerminalLine[] = [
      ...lines,
      { id: Math.random().toString(), type: 'input', text: `hermes@node-q:~$ ${cmd}` }
    ];

    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setLines([]);
      setInputVal('');
      return;
    }

    if (lower === 'help') {
      newLines.push({
        id: Math.random().toString(),
        type: 'output',
        text: `AVAILABLE NODE Q HERMES COMMANDS:
  hermes status                Display active swarm status, TTFT, and persistent memory
  hermes deploy                Trigger 1-click cloud container deployment
  hermes optimize              Execute supply chain optimization across Printify nodes
  hermes arbitrage --tau=0.633  Run 63.3% savings governance yield calculation
  python run supply            Execute supply_chain_optimizer.py
  python run kdp               Execute Amazon KDP cover geometry calculator
  python run arbitrage         Execute CostImplode token arbitrage solver
  git status                   Check Git branch synchronization across child apps
  git pull                     Rebase child application repositories
  mesh list                    Display all registered child nodes (LWA, Mudline, CostImplode)
  clear                        Clear terminal screen`
      });
    } else if (lower === 'hermes status') {
      newLines.push({
        id: Math.random().toString(),
        type: 'output',
        text: `[SWARM STATUS]
• Hermes Above (Treasury):    ACTIVE  [TTFT: 42ms | Memory: 184MB]
• Hermes Above (Governance):  ACTIVE  [TTFT: 38ms | Memory: 240MB]
• Hermes Under (EdgeProbe):   ACTIVE  [TTFT: 18ms | Memory: 96MB]
• Hermes Under (Fulfillment): ACTIVE  [TTFT: 24ms | Memory: 112MB]
• Hermes On (Arbitrage):      ACTIVE  [TTFT: 28ms | Memory: 310MB]
• Hermes On (OrderRouter):    ACTIVE  [TTFT: 31ms | Memory: 142MB]
• Hermes Around (AvatarMedia): ACTIVE [TTFT: 45ms | Memory: 290MB]
• Hermes Around (pSEO):       ACTIVE  [TTFT: 36ms | Memory: 215MB]
Summary: 8/8 agents online, 0 degraded, avg TTFT: 29.4ms`
      });
    } else if (lower.includes('deploy')) {
      newLines.push({
        id: Math.random().toString(),
        type: 'system',
        text: `Opening 1-Click Hermes Swarm Cloud Deployment Wizard...`
      });
      onOpenDeployModal();
    } else if (lower.includes('optimize') || lower.includes('supply')) {
      newLines.push({
        id: Math.random().toString(),
        type: 'system',
        text: `Executing supply_chain_optimizer.py across Monster Digital and SwiftPOD...`
      });
      const res = await onExecuteScript('py-supply-optimizer');
      newLines.push({
        id: Math.random().toString(),
        type: 'output',
        text: res.stdout
      });
    } else if (lower.includes('arbitrage')) {
      newLines.push({
        id: Math.random().toString(),
        type: 'system',
        text: `Solving Savings Governance Engine (tau = 0.633)...`
      });
      const res = await onExecuteScript('py-arbitrage-solver');
      newLines.push({
        id: Math.random().toString(),
        type: 'output',
        text: res.stdout
      });
    } else if (lower.includes('kdp')) {
      newLines.push({
        id: Math.random().toString(),
        type: 'system',
        text: `Computing Amazon KDP spine geometry at 300 DPI...`
      });
      const res = await onExecuteScript('py-kdp-calculator');
      newLines.push({
        id: Math.random().toString(),
        type: 'output',
        text: res.stdout
      });
    } else if (lower.includes('git')) {
      newLines.push({
        id: Math.random().toString(),
        type: 'output',
        text: `[GIT SYNC STATUS]
• lone-wolf-mudline:  branch 'production-main' (commit a7b8e21) [SYNCED]
• cost-implode:       branch 'edge-v2-stable'   (commit d3f910c) [SYNCED]
• omnipublish:        branch 'kdp-calc-v3'      (commit 90cb14a) [SYNCED]
• node-q-core:        branch 'main'             (commit fe482bc) [SYNCED]`
      });
    } else if (lower.includes('mesh')) {
      newLines.push({
        id: Math.random().toString(),
        type: 'output',
        text: `REGISTERED APP MESH SATELLITE NODES:
1. [NODE-01] Lone Wolf Appalachia & Mudline Mafia (E-Commerce POD Swarm)
2. [NODE-02] CostImplodeAI (Multi-Cloud Arbitrage & TokenTax Gateway)
3. [NODE-03] OmniPublish (Kindle KDP & Latenode Workflow Compiler)
4. [NODE-04] Upload-Post Avatar Video Network (Synthetic Creator Engine)`
      });
    } else {
      newLines.push({
        id: Math.random().toString(),
        type: 'error',
        text: `Command not recognized: "${cmd}". Type "help" to view supported commands.`
      });
    }

    setLines(newLines);
    setInputVal('');
  };

  return (
    <div className="bg-[#050811] border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-white text-xs font-mono uppercase tracking-wide">
            Interactive Hermes CLI Terminal // Root Execution Environment
          </h3>
        </div>

        <button
          onClick={() => setLines([])}
          className="text-slate-500 hover:text-slate-300 p-1 transition-all"
          title="Clear screen"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Terminal window scroll area */}
      <div className="h-80 sm:h-96 overflow-y-auto space-y-2 pr-2 text-xs font-mono">
        {lines.map((l) => (
          <div key={l.id} className="leading-relaxed">
            {l.type === 'input' && (
              <span className="text-cyan-300 font-bold">{l.text}</span>
            )}
            {l.type === 'output' && (
              <pre className="text-slate-200 whitespace-pre-wrap">{l.text}</pre>
            )}
            {l.type === 'system' && (
              <div className="text-emerald-400/90">{l.text}</div>
            )}
            {l.type === 'error' && (
              <div className="text-red-400">{l.text}</div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Interactive prompt input */}
      <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
        <span className="text-emerald-400 font-mono text-xs font-bold shrink-0">
          hermes@node-q:~$
        </span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder='Type a command (e.g. "hermes status", "hermes optimize", "help")...'
          className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-slate-600"
          autoFocus
        />
        <button
          type="submit"
          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition-all"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
