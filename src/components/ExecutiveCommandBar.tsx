import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Loader2, 
  CheckCircle2, 
  Cpu, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp,
  RotateCcw,
  Globe
} from 'lucide-react';
import { executeExecutiveDirective, SwarmExecutiveResponse } from '../services/geminiService';
import { User } from 'firebase/auth';
import { saveDirectiveToFirestore } from '../services/firebase';

interface ExecutiveCommandBarProps {
  onDirectiveComplete: (res: SwarmExecutiveResponse) => void;
  currentUser?: User | null;
}

export const ExecutiveCommandBar: React.FC<ExecutiveCommandBarProps> = ({
  onDirectiveComplete,
  currentUser
}) => {
  const [command, setCommand] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [lastResponse, setLastResponse] = useState<SwarmExecutiveResponse | null>(null);

  const sampleDirectives = [
    'Reroute Midwest orders to SwiftPOD to avoid Ohio storm delay',
    'Audit token arbitrage yield on CostImplode gateway (tau = 0.633)',
    'Synthesize 3 realistic avatar videos for Mudline Mafia hoodie drop',
    'Verify KDP cover thickness for 248-page cream paper manuscript'
  ];

  const handleExecute = async (inputStr?: string) => {
    const textToRun = inputStr || command;
    if (!textToRun.trim()) return;

    setIsProcessing(true);
    setLastResponse(null);

    try {
      let response: SwarmExecutiveResponse;
      try {
        const serverRes = await fetch('/api/gemini/directive', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ command: textToRun })
        });
        if (serverRes.ok) {
          response = await serverRes.json();
        } else {
          response = await executeExecutiveDirective(textToRun);
        }
      } catch {
        response = await executeExecutiveDirective(textToRun);
      }

      setLastResponse(response);
      onDirectiveComplete(response);

      // Persist to Firestore if user logged in
      if (currentUser) {
        saveDirectiveToFirestore(currentUser.uid, {
          id: `dir-${Date.now()}`,
          command: textToRun,
          classification: response.classification,
          modelSelected: response.modelSelected,
          outcome: response.operationalOutcome
        }).catch(err => console.warn('Firestore directive save error:', err));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-900/90 via-[#0a101d] to-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-700/60 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
            EXECUTIVE COMMAND BAR // MICHAEL BOTVIBE APEX CONSOLE
          </span>
        </div>

        <span className="text-[11px] font-mono text-slate-400">
          Inference Router: <strong className="text-cyan-300">Gemini Flash (Class 1) &bull; Gemini Pro (Class 2)</strong>
        </span>
      </div>

      {/* Input form */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleExecute();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Issue high-level corporate directive across logistics, model arbitrage, or child apps..."
          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-500 shadow-inner"
        />
        <button
          type="submit"
          disabled={isProcessing}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs font-mono shadow-md transition-all disabled:opacity-50 shrink-0"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Orchestrating...</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Execute Directive</span>
            </>
          )}
        </button>
      </form>

      {/* Quick sample chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
        <span className="text-[10px] text-slate-500 font-mono shrink-0 mr-1">SUGGESTED DIRECTIVES:</span>
        {sampleDirectives.map((sample, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setCommand(sample);
              handleExecute(sample);
            }}
            className="text-[11px] font-mono bg-slate-950/70 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 rounded-lg px-2.5 py-1 whitespace-nowrap transition-all"
          >
            {sample}
          </button>
        ))}
      </div>

      {/* Deliberation Trace & Result Box */}
      {lastResponse && (
        <div className="mt-4 p-4 rounded-xl bg-[#060a14] border border-cyan-900/40 text-xs font-mono space-y-3 animate-fade-in shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 text-[10px] font-bold">
                {lastResponse.classification}
              </span>
              <span className="text-slate-400 text-[11px]">
                Model: <strong className="text-white">{lastResponse.modelSelected}</strong>
              </span>
            </div>
            <span className="text-emerald-400 text-[11px] font-bold">
              Delivered Token Savings: {lastResponse.tokenSavingsPercent}%
            </span>
          </div>

          {/* Deliberation steps */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-slate-500 uppercase block font-bold">HERMES SWARM DELIBERATION TRACE</span>
            {lastResponse.deliberationTrace.map((t, i) => (
              <div key={i} className="flex items-start gap-2 text-[11px] text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-cyan-400 font-semibold">{t.agent}:</strong> {t.action}
                </span>
              </div>
            ))}
          </div>

          {/* Outcome */}
          <div className="bg-slate-950/90 p-3 rounded-lg border border-slate-800/80">
            <span className="text-[10px] text-slate-500 uppercase block font-bold mb-1">OPERATIONAL OUTCOME</span>
            <p className="text-emerald-300 text-xs leading-relaxed">
              {lastResponse.operationalOutcome}
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <div className="flex items-center gap-1.5">
              <span>Synchronized Systems:</span>
              {lastResponse.affectedSystems.map((s, idx) => (
                <span key={idx} className="bg-slate-800 px-1.5 py-0.2 rounded text-slate-300 text-[10px]">
                  {s}
                </span>
              ))}
            </div>
            {lastResponse.recommendedScript && (
              <span className="text-cyan-400">
                Executable Module: <code>{lastResponse.recommendedScript}</code>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
