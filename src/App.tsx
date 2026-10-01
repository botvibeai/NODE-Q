/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { GlobalLogisticsRadar } from './components/GlobalLogisticsRadar';
import { HermesSwarmMatrix } from './components/HermesSwarmMatrix';
import { BranchNetworkMesh } from './components/BranchNetworkMesh';
import { PythonGitStudio } from './components/PythonGitStudio';
import { PredictiveAnalyticsSandbox } from './components/PredictiveAnalyticsSandbox';
import { InteractiveHermesTerminal } from './components/InteractiveHermesTerminal';
import { DeploySwarmModal } from './components/DeploySwarmModal';
import { ExecutiveCommandBar } from './components/ExecutiveCommandBar';
import { MultiTenantRoadmapView } from './components/MultiTenantRoadmapView';
import { CostImplodeGatewayView } from './components/CostImplodeGatewayView';
import { FloatingHermesChatbot } from './components/FloatingHermesChatbot';
import { CloudflareWorkersMonitor } from './components/CloudflareWorkersMonitor';
import { 
  auth, 
  googleProvider, 
  testFirestoreConnection, 
  syncUserProfileToFirestore 
} from './services/firebase';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { 
  INITIAL_HERMES_AGENTS, 
  INITIAL_CHILD_NODES, 
  INITIAL_LOGISTICS_NODES, 
  INITIAL_CONSIGNMENTS, 
  INITIAL_PYTHON_SCRIPTS, 
  INITIAL_GIT_COMMITS 
} from './data/mockInitialData';
import { 
  HermesAgent, 
  ChildAppNode, 
  LogisticsNode, 
  ActiveConsignment, 
  PythonScript, 
  GitCommit 
} from './types';
import { SwarmExecutiveResponse } from './services/geminiService';
import { CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [agents, setAgents] = useState<HermesAgent[]>(INITIAL_HERMES_AGENTS);
  const [childNodes, setChildNodes] = useState<ChildAppNode[]>(INITIAL_CHILD_NODES);
  const [logisticsNodes, setLogisticsNodes] = useState<LogisticsNode[]>(INITIAL_LOGISTICS_NODES);
  const [consignments, setConsignments] = useState<ActiveConsignment[]>(INITIAL_CONSIGNMENTS);
  const [scripts, setScripts] = useState<PythonScript[]>(INITIAL_PYTHON_SCRIPTS);
  const [commits, setCommits] = useState<GitCommit[]>(INITIAL_GIT_COMMITS);
  
  const [isDeployModalOpen, setIsDeployModalOpen] = useState<boolean>(false);
  const [isAutopilot, setIsAutopilot] = useState<boolean>(true);
  const [protocolYield, setProtocolYield] = useState<string>('$258,000 / mo');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Firebase auth & Firestore states
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isFirestoreConnected, setIsFirestoreConnected] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    testFirestoreConnection().then(ok => setIsFirestoreConnected(ok));

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        syncUserProfileToFirestore(user).catch(err => console.warn('User profile sync:', err));
        showToast(`Welcome, ${user.displayName || user.email}! Connected to Firestore.`);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      if (res.user) {
        await syncUserProfileToFirestore(res.user);
        showToast(`Signed in successfully as ${res.user.displayName || res.user.email}`);
      }
    } catch (error: any) {
      console.error('Sign-in error:', error);
      showToast(`Google Sign-In: ${error.message || 'Cancelled'}`);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      showToast('Signed out of Node Q.');
    } catch (error: any) {
      console.error('Sign-out error:', error);
    }
  };

  // Handler for rerouting an order
  const handleRerouteOrder = (orderId: string) => {
    setConsignments(prev => prev.map(c => {
      if (c.id === orderId) {
        return {
          ...c,
          status: 'Rerouted',
          anomalyDetected: false,
          anomalyReason: 'Hermes Agent rerouted to optimal domestic print provider. Transit delay resolved.',
          predictedEta: 'Optimized: Tomorrow, 11:30 AM'
        };
      }
      return c;
    }));
    showToast(`Order ${orderId} rerouted by Hermes On-OrderRouter. Delivery timeline recovered.`);
  };

  // Handler for global route optimization
  const handleOptimizeAllRoutes = () => {
    setConsignments(prev => prev.map(c => ({
      ...c,
      status: c.status === 'In Production' ? 'In Production' : 'In Transit',
      anomalyDetected: false,
      autoOptimized: true
    })));
    setLogisticsNodes(prev => prev.map(n => ({
      ...n,
      capacityUtil: Math.min(88, n.capacityUtil + 2),
      ordersHandledToday: n.ordersHandledToday + 12
    })));
    showToast('Hermes Swarm: Global fulfillment corridors re-balanced across Monster Digital and SwiftPOD.');
  };

  // Synthetic ping on agent
  const handleTriggerProbe = (agentId: string) => {
    const randomLatency = Math.floor(Math.random() * 15) + 16; // 16 - 31 ms
    setAgents(prev => prev.map(a => {
      if (a.id === agentId) {
        return {
          ...a,
          ttftMs: randomLatency,
          lastActionTime: 'Just now'
        };
      }
      return a;
    }));
    showToast(`Synthetic TTFT probe complete for ${agentId}: ${randomLatency}ms response time.`);
  };

  // Synchronize child app node
  const handleSyncNode = (nodeId: string) => {
    setChildNodes(prev => prev.map(n => {
      if (n.id === nodeId) {
        return {
          ...n,
          status: 'online',
          lastSyncTimestamp: 'Just now'
        };
      }
      return n;
    }));
    showToast(`Node ${nodeId} synchronized with Node Q executive parameters.`);
  };

  // Add new child node to empire
  const handleAddNewNode = (newNode: ChildAppNode) => {
    setChildNodes(prev => [newNode, ...prev]);
    showToast(`Satellite node "${newNode.name}" registered into Node Q mesh hierarchy.`);
  };

  // Dispatch directive to specific child node
  const handleDispatchDirectiveToNode = (nodeId: string, directive: string) => {
    showToast(`Directive dispatched to node [${nodeId}]: "${directive}"`);
  };

  // Execution solver for Python scripts
  const handleExecuteScript = async (scriptId: string, customCode?: string): Promise<any> => {
    await new Promise(r => setTimeout(r, 450));

    if (scriptId === 'py-supply-optimizer') {
      const output = `[
  {
    "order": "LWA-9204",
    "allocated_provider": "Monster Digital",
    "transit_distance_approx_deg": 1.309,
    "locked_margin_pct": 55.1,
    "shipping_service": "USPS Priority",
    "status": "DISPATCH_AUTHORIZED"
  },
  {
    "order": "MDM-8193",
    "allocated_provider": "Monster Digital",
    "transit_distance_approx_deg": 3.167,
    "locked_margin_pct": 58.7,
    "shipping_service": "FedEx Ground",
    "status": "DISPATCH_AUTHORIZED"
  },
  {
    "order": "LWA-9205",
    "allocated_provider": "Monster Digital",
    "transit_distance_approx_deg": 1.748,
    "locked_margin_pct": 56.2,
    "shipping_service": "USPS Priority",
    "status": "DISPATCH_AUTHORIZED"
  }
]
[Hermes Optimizer] 3/3 domestic print allocations completed. Defect probability: 0.28%. Margin locked at 55.1%.`;
      return { status: 'success', durationMs: 24, stdout: output };
    }

    if (scriptId === 'py-arbitrage-solver') {
      const output = `c_base: $0.01000 per request
c_raw: $0.00080 per request
s_raw_pct: 92.0%
delivered_savings_pct: 63.3% (tau target cap)
protocol_yield_margin_pct: 28.7%
daily_user_savings_usd: $6,330.00
daily_protocol_yield_usd: $2,870.00
monthly_protocol_yield_usd: $86,100.00
[CostImplode Governance] 1,000,000 calls evaluated. Protocol yield captured with 100% margin stability.`;
      return { status: 'success', durationMs: 18, stdout: output };
    }

    if (scriptId === 'py-kdp-calculator') {
      const output = `KDP Geometry Pre-Flight Results:
  page_count: 248
  paper_stock: white (thickness: 0.002252 in/page)
  spine_width_in: 0.5585
  total_width_in: 12.8085
  total_height_in: 9.2500
  canvas_pixels_300dpi: 3843 x 2775
  spine_pixels_300dpi: 168
  amazon_preflight_pass: True
[OmniPublish Engine] Cover geometry adheres to Amazon KDP 300 DPI pre-flight specifications without rejection.`;
      return { status: 'success', durationMs: 15, stdout: output };
    }

    // Default sync daemon
    const output = `[Node-Q-Hermes] Initiating enterprise cross-platform heartbeat...
  [OK] Synchronized: Shopify API (status: 200 OK, latency: <19ms)
  [OK] Synchronized: Printify Fulfillment (status: 200 OK, latency: <24ms)
  [OK] Synchronized: Cloudflare KV (status: 200 OK, latency: <12ms)
  [OK] Synchronized: Encore PubSub (status: 200 OK, latency: <15ms)
  [OK] Synchronized: Cloud Run HSM (status: 200 OK, latency: <18ms)
[Node-Q-Hermes] All 4 child app nodes synchronized with Node Q state.`;
    return { status: 'success', durationMs: 22, stdout: output };
  };

  const handleDirectiveComplete = (res: SwarmExecutiveResponse) => {
    if (res.affectedSystems.includes('Printify') || res.affectedSystems.includes('USPS Priority Dispatch')) {
      handleOptimizeAllRoutes();
    }
  };

  const handleDeploymentSuccess = () => {
    setAgents(prev => prev.map(a => ({ ...a, status: 'active', ttftMs: Math.max(14, a.ttftMs - 4) })));
    showToast('Hermes Swarm successfully deployed on Google Cloud Run with FUSE memory mount.');
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-cyan-500/60 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-mono animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
        isAutopilot={isAutopilot}
        setIsAutopilot={setIsAutopilot}
        activeAgentsCount={agents.length}
        protocolYield={protocolYield}
        currentUser={currentUser}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
        isFirestoreConnected={isFirestoreConnected}
      />

      {/* Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Executive Directive Command Bar */}
        <ExecutiveCommandBar
          onDirectiveComplete={handleDirectiveComplete}
          currentUser={currentUser}
        />

        {/* Tab Views */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <CloudflareWorkersMonitor />
            <GlobalLogisticsRadar
              nodes={logisticsNodes}
              consignments={consignments}
              onRerouteOrder={handleRerouteOrder}
              onOptimizeAllRoutes={handleOptimizeAllRoutes}
              isAutopilot={isAutopilot}
            />
          </div>
        )}

        {activeTab === 'costimplode' && (
          <CostImplodeGatewayView />
        )}

        {activeTab === 'swarm' && (
          <HermesSwarmMatrix
            agents={agents}
            onTriggerProbe={handleTriggerProbe}
          />
        )}

        {activeTab === 'mesh' && (
          <BranchNetworkMesh
            nodes={childNodes}
            agents={agents}
            onSyncNode={handleSyncNode}
            onAddNewNode={handleAddNewNode}
            onDispatchDirectiveToNode={handleDispatchDirectiveToNode}
          />
        )}

        {activeTab === 'roadmap' && (
          <MultiTenantRoadmapView />
        )}

        {activeTab === 'python-git' && (
          <PythonGitStudio
            scripts={scripts}
            commits={commits}
            onExecuteScript={handleExecuteScript}
          />
        )}

        {activeTab === 'financials' && (
          <PredictiveAnalyticsSandbox />
        )}

        {activeTab === 'terminal' && (
          <InteractiveHermesTerminal
            onOpenDeployModal={() => setIsDeployModalOpen(true)}
            onExecuteScript={handleExecuteScript}
          />
        )}
      </main>

      {/* 1-Click Deploy Swarm Modal */}
      <DeploySwarmModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        onDeploymentSuccess={handleDeploymentSuccess}
      />

      {/* Floating Hermes Self-Training Chatbot (On Every Page) */}
      <FloatingHermesChatbot currentUser={currentUser} />

      {/* Footer */}
      <footer className="border-t border-slate-800/60 bg-slate-950/80 px-4 py-4 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">NODE Q</span>
            <span>&bull; Corporate Executive Command Matrix</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Powered by Open-Source Nous Research Hermes Agents</span>
          </div>
          <div>
            <span>Stateless Containerization on Google Cloud Run &bull; Cloud Storage FUSE &bull; Debian 12</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
