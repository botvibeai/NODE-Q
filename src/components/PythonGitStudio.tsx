import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  GitBranch, 
  FileCode, 
  GitCommit as GitCommitIcon, 
  CheckCircle2, 
  Copy, 
  Clock, 
  RotateCw, 
  Sliders, 
  FolderGit2,
  Sparkles,
  Download
} from 'lucide-react';
import { PythonScript, GitCommit } from '../types';

interface PythonGitStudioProps {
  scripts: PythonScript[];
  commits: GitCommit[];
  onExecuteScript: (scriptId: string, customCode?: string) => Promise<any>;
}

export const PythonGitStudio: React.FC<PythonGitStudioProps> = ({
  scripts,
  commits,
  onExecuteScript
}) => {
  const [activeTab, setActiveTab] = useState<'python' | 'git'>('python');
  const [selectedScriptId, setSelectedScriptId] = useState<string>(scripts[0]?.id || '');
  const [codeEditorText, setCodeEditorText] = useState<string>(scripts[0]?.code || '');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);
  const [execDuration, setExecDuration] = useState<number | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Git state
  const [currentBranch, setCurrentBranch] = useState<string>('production-main');
  const [gitStatusOutput, setGitStatusOutput] = useState<string>('On branch production-main\nYour branch is up to date with \'origin/production-main\'.\n\nnothing to commit, working tree clean');
  const [commitMessage, setCommitMessage] = useState<string>('');
  const [localCommits, setLocalCommits] = useState<GitCommit[]>(commits);

  const selectedScript = scripts.find(s => s.id === selectedScriptId) || scripts[0];

  const handleSelectScript = (s: PythonScript) => {
    setSelectedScriptId(s.id);
    setCodeEditorText(s.code);
    setExecutionOutput(null);
  };

  const handleRun = async () => {
    setIsRunning(true);
    setExecutionOutput(null);
    try {
      const res = await onExecuteScript(selectedScript.id, codeEditorText);
      setExecDuration(res.durationMs);
      setExecutionOutput(res.stdout);
    } catch (e: any) {
      setExecutionOutput(`Traceback (most recent call last):\n  Error: ${e.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeEditorText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleGitCommit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commitMessage.trim()) return;

    const newCommit: GitCommit = {
      id: `commit-${Date.now()}`,
      hash: Math.random().toString(16).substring(2, 9),
      message: commitMessage,
      author: 'Hermes-Executive-NodeQ',
      timestamp: 'Just now',
      branch: currentBranch,
      appNode: 'Node Q Corporate Hub',
      filesChanged: 1
    };

    setLocalCommits([newCommit, ...localCommits]);
    setGitStatusOutput(`[${currentBranch} ${newCommit.hash}] ${commitMessage}\n 1 file changed, 14 insertions(+)\n`);
    setCommitMessage('');
  };

  return (
    <div className="space-y-6">
      {/* Studio Header & Tab Switcher */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
              Python 3.11 (uv) Runtime &amp; Git Branch Orchestrator
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Hermes agents execute native mathematical modules, supply chain solvers, and Kindle geometry formulas via high-speed sandboxed Python environments. 
            All child applications sync state via decentralized Git branches.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 font-mono text-xs">
          <button
            onClick={() => setActiveTab('python')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'python'
                ? 'bg-cyan-600 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Python Environment</span>
          </button>
          <button
            onClick={() => setActiveTab('git')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'git'
                ? 'bg-cyan-600 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Git Repositories</span>
          </button>
        </div>
      </div>

      {activeTab === 'python' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Script Catalog (3 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono text-slate-400 font-bold px-1 flex items-center justify-between">
              <span>STANDARDIZED HERMES MODULES</span>
              <span className="text-[10px] text-cyan-400">PYTHON 3.11</span>
            </div>

            {scripts.map((script) => {
              const isSelected = script.id === selectedScriptId;
              return (
                <div
                  key={script.id}
                  onClick={() => handleSelectScript(script)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-slate-900 border-cyan-500 shadow-md ring-1 ring-cyan-500/30' 
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                      {script.filename}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300">
                      {script.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {script.description}
                  </p>
                </div>
              );
            })}

            {/* Runtime Info box */}
            <div className="bg-slate-950/90 border border-slate-800 p-3.5 rounded-xl text-xs font-mono space-y-2">
              <span className="text-[10px] text-slate-500 uppercase block font-bold">CONTAINER RUNTIME SPEC</span>
              <div className="text-slate-300 text-[11px] flex justify-between">
                <span>Interpreter:</span>
                <span className="text-cyan-400 font-bold">Python 3.11.8 (uv)</span>
              </div>
              <div className="text-slate-300 text-[11px] flex justify-between">
                <span>Process Daemon:</span>
                <span className="text-slate-200">supervisord 0.4.1</span>
              </div>
              <div className="text-slate-300 text-[11px] flex justify-between">
                <span>Memory Layer:</span>
                <span className="text-emerald-400">Cloud Storage FUSE Mount</span>
              </div>
            </div>
          </div>

          {/* Right Column: Code Editor & Execution Output (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Code Editor Header */}
            <div className="bg-slate-950 border border-slate-800 rounded-t-xl px-4 py-2.5 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>{selectedScript.filename}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1 transition-all"
                  title="Copy code"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow transition-all disabled:opacity-50"
                >
                  {isRunning ? (
                    <>
                      <RotateCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Executing...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Execute Script</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Textarea / Editor */}
            <div className="relative">
              <textarea
                value={codeEditorText}
                onChange={(e) => setCodeEditorText(e.target.value)}
                rows={13}
                className="w-full bg-[#070b14] border border-t-0 border-slate-800 rounded-b-xl p-4 font-mono text-xs text-cyan-200 focus:outline-none focus:border-cyan-500 leading-relaxed resize-y selection:bg-cyan-900"
                spellCheck={false}
              />
            </div>

            {/* Execution Output Console */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
              <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-bold">EXECUTION STDOUT / TERMINAL OUTPUT</span>
                </div>
                {execDuration !== null && (
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Completed in {execDuration}ms</span>
                  </span>
                )}
              </div>

              <div className="p-4 bg-[#050811] text-xs font-mono min-h-36 max-h-64 overflow-y-auto">
                {isRunning ? (
                  <div className="text-cyan-400 flex items-center gap-2">
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Spawning Python 3.11 worker thread and compiling bytecode...</span>
                  </div>
                ) : executionOutput ? (
                  <pre className="text-emerald-300 whitespace-pre-wrap leading-relaxed">
                    {executionOutput}
                  </pre>
                ) : (
                  <div className="text-slate-500 italic">
                    Press "Execute Script" above to run this Hermes agent module in Python.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Git Branch & Repository Manager Tab */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-bold flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-cyan-400" />
                  <span>ACTIVE BRANCH</span>
                </span>
                <select
                  value={currentBranch}
                  onChange={(e) => setCurrentBranch(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-cyan-300 text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="production-main">production-main (Lone Wolf &amp; Mudline)</option>
                  <option value="edge-v2-stable">edge-v2-stable (CostImplodeAI)</option>
                  <option value="kdp-calculator-v3">kdp-calculator-v3 (OmniPublish)</option>
                  <option value="main">main (Node Q Core)</option>
                </select>
              </div>

              <div className="bg-[#050811] p-3 rounded-lg border border-slate-800 text-slate-300 font-mono text-[11px] whitespace-pre-wrap">
                {gitStatusOutput}
              </div>

              {/* Commit form */}
              <form onSubmit={handleGitCommit} className="space-y-2 pt-2">
                <label className="block text-slate-400 text-[11px]">Dispatch Swarm Commit</label>
                <input
                  type="text"
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  placeholder="e.g. feat(arbitrage): optimize prompt caching headers"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold text-xs shadow transition-all flex items-center justify-center gap-1.5"
                >
                  <GitCommitIcon className="w-3.5 h-3.5" />
                  <span>Commit &amp; Push to Hermes Swarm</span>
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-xs font-mono flex items-center gap-2">
                <GitCommitIcon className="w-4 h-4 text-emerald-400" />
                <span>CROSS-APP GIT COMMIT HISTORY</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-500">Decentralized SSH Sync</span>
            </div>

            <div className="space-y-3">
              {localCommits.map((c) => (
                <div key={c.id} className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-xs font-mono hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-cyan-400 font-bold flex items-center gap-1">
                      <span className="text-slate-500">commit</span>
                      <span>{c.hash}</span>
                    </span>
                    <span className="text-slate-500 text-[10px]">{c.timestamp}</span>
                  </div>
                  <div className="text-slate-200 font-medium mb-1.5">{c.message}</div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">{c.author}</span>
                      <span>•</span>
                      <span className="text-purple-400 bg-purple-950/40 px-1.5 rounded">{c.appNode}</span>
                    </div>
                    <span className="text-slate-400">{c.branch}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
