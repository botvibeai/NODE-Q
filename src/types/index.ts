export type AgentTier = 'ABOVE' | 'UNDER' | 'ON_WITH' | 'AROUND';

export interface HermesAgent {
  id: string;
  name: string;
  tier: AgentTier;
  role: string;
  status: 'active' | 'executing' | 'optimizing' | 'standby';
  currentTask: string;
  targetNodeId?: string; // Connected child app node
  ttftMs: number; // Time-to-first-token latency
  memoryIndexSize: string; // SQLite + FTS5 memory footprint
  uptime: string;
  lastActionTime: string;
  modelRoute: string; // e.g. "Gemini 2.5 Flash-Lite", "Gemini 2.5 Pro", "Gemini 3.8 Flash"
  arbitrageSavingsPercent: number; // e.g. 63.3%
}

export interface ChildAppNode {
  id: string;
  name: string;
  code: string; // e.g. "NODE-01", "NODE-02"
  description: string;
  category: 'e-commerce' | 'infrastructure' | 'publishing' | 'media' | 'custom';
  status: 'online' | 'degraded' | 'syncing' | 'paused';
  gitRepo: string;
  gitBranch: string;
  deploymentTarget: 'Google Cloud Run' | 'Cloudflare Edge' | 'Encore.cloud' | 'AWS Fargate';
  assignedAgents: string[]; // Agent IDs
  monthlyVolume: string;
  grossMargin: string;
  keyMetricLabel: string;
  keyMetricValue: string;
  lastSyncTimestamp: string;
  config: {
    webhookUrl: string;
    autoArbitrage: boolean;
    governanceThreshold: number; // e.g. 0.633
    adSpendUnlocked: boolean;
    cogsTarget: number;
  };
}

export interface LogisticsNode {
  id: string;
  name: string;
  type: 'fulfillment_center' | 'transit_hub' | 'port_gateway' | 'edge_cache';
  location: string;
  coordinates: [number, number]; // [lat, lng]
  provider: 'Monster Digital' | 'SwiftPOD' | 'Direct Print' | 'Cloudflare Edge' | 'Central Warehouse';
  capacityUtil: number; // 0 - 100%
  defectRate: number; // e.g. 0.35%
  averageTurnaroundHours: number; // e.g. 48 hrs
  status: 'optimal' | 'warning' | 'throttled';
  weatherAlert?: string;
  ordersHandledToday: number;
}

export interface ActiveConsignment {
  id: string;
  orderNumber: string;
  brand: 'Lone Wolf Appalachia' | 'Mudline Mafia' | 'CostImplode Telemetry' | 'OmniPublish';
  sku: string;
  skuName: string;
  quantity: number;
  originNodeId: string;
  destinationCity: string;
  destinationCoords: [number, number];
  carrier: 'USPS Priority' | 'FedEx Ground' | 'DHL Express' | 'OnTrac';
  trackingNumber: string;
  status: 'In Production' | 'Routed' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Rerouted';
  predictedEta: string;
  anomalyDetected: boolean;
  anomalyReason?: string;
  retailPrice: number;
  cogs: number;
  netMargin: number;
  autoOptimized: boolean;
}

export interface PythonScript {
  id: string;
  filename: string;
  description: string;
  runtime: 'Python 3.11 (uv)' | 'Python 3.12';
  category: 'Logistics' | 'Arbitrage' | 'KDP Geometry' | 'Sync Daemon';
  code: string;
  lastRunOutput?: {
    status: 'success' | 'error';
    durationMs: number;
    stdout: string;
    metrics?: Record<string, string | number>;
  };
}

export interface GitCommit {
  id: string;
  hash: string;
  message: string;
  author: string;
  timestamp: string;
  branch: string;
  appNode: string;
  filesChanged: number;
}

export interface FinancialMilestone {
  month: number;
  focus: string;
  unitsSold: number;
  grossRevenue: number;
  cogs: number;
  adBudget: number;
  softwareFees: number;
  netProfit: number;
  marginPercent: number;
}

export interface DeploymentStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  details?: string[];
  durationMs?: number;
}

export type ArchitectureLayerId = 
  | 'agent_engine' 
  | 'intelligence_foundation' 
  | 'serverless_execution' 
  | 'saas_control_plane' 
  | 'edge_ingress' 
  | 'burst_failover';

export interface ArchitectureLayerSpec {
  id: ArchitectureLayerId;
  name: string;
  coreTech: string;
  responsibility: string;
  executionBoundary: string;
  stateBehavior: string;
  riskMitigated: string;
  status: 'operational' | 'scaling' | 'standby';
  healthScore: number;
}

export interface S6ProcessInfo {
  name: string;
  serviceDir: string;
  pid: number;
  status: 'up' | 'restarting' | 'down';
  uptimeSeconds: number;
  restartCount: number;
  port?: number;
  memoryUsageMb: number;
  command: string;
}

export interface DurableObjectSessionLock {
  id: string;
  key: string; // e.g. "tenant_4892:telegram_chat_8102"
  tenantId: string;
  channel: 'telegram' | 'discord' | 'slack' | 'whatsapp' | 'api';
  status: 'locked' | 'unlocked' | 'queued';
  heldByRequest: string;
  queueDepth: number;
  ttlMs: number;
  lastAcquired: string;
}

export interface TenantPlanTier {
  id: 'starter' | 'pro' | 'enterprise';
  name: string;
  pricePerMonth: number;
  targetAudience: string;
  activeFleetSize: number;
  modelAccess: string[];
  gateways: string[];
  concurrentSubagents: number;
  storageGb: number;
  sandboxBackend: string;
  sla: string;
  cogsBreakdown: {
    compute: number;
    storage: number;
    geminiApi: number;
    totalCogs: number;
    grossProfit: number;
    grossMarginPercent: number;
  };
}

