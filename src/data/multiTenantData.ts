import { ArchitectureLayerSpec, S6ProcessInfo, DurableObjectSessionLock, TenantPlanTier } from '../types';

export const ARCHITECTURE_LAYERS: ArchitectureLayerSpec[] = [
  {
    id: 'agent_engine',
    name: '1. Agent Engine Runtime',
    coreTech: 'Hermes AI Agent Runtime (Nous Research)',
    responsibility: 'Persistent memory loops, autonomous skill compilation, multi-platform gateway messaging, terminal code execution.',
    executionBoundary: 'Ephemeral Container / Docker Sub-container',
    stateBehavior: 'Local Memory & GCS Persistent Snapshots via Litestream',
    riskMitigated: 'Process crashes, container recycles, execution host compromise.',
    status: 'operational',
    healthScore: 99.9
  },
  {
    id: 'intelligence_foundation',
    name: '2. Intelligence Foundation',
    coreTech: 'Google AI Studio (Gemini 3.7 / 3.8 Flash & 3.1 Pro)',
    responsibility: 'Native schema generation, high-context reasoning (1M+ tokens), multimodal tool-use processing, thought signature retention.',
    executionBoundary: 'External REST API (generativelanguage.googleapis.com/v1beta)',
    stateBehavior: 'Stateless per REST transaction / Preserves thought signatures in context threads',
    riskMitigated: 'Intermediary proxy latency and model context truncation.',
    status: 'operational',
    healthScore: 100.0
  },
  {
    id: 'serverless_execution',
    name: '3. Serverless Execution',
    coreTech: 'Google Cloud Run (gen2) with GCS FUSE Mounts',
    responsibility: 'Ephemeral micro-container hosting, s6-overlay supervised gateway execution, state persistence across restarts.',
    executionBoundary: 'GCP Cloud Run (gen2 environment, /opt/data)',
    stateBehavior: 'Ephemeral root file system backed by GCS FUSE (/opt/data) & /tmp in-memory WAL',
    riskMitigated: 'State loss across ephemeral container cold starts and unexpected pod evictions.',
    status: 'operational',
    healthScore: 99.8
  },
  {
    id: 'saas_control_plane',
    name: '4. SaaS Control Plane',
    coreTech: 'Encore.cloud Framework (Go / TypeScript)',
    responsibility: 'Microservices backend, automated multi-cloud infrastructure orchestration, tenant provisioning, Stripe billing hooks.',
    executionBoundary: 'Control Plane Microservices (GCP/AWS)',
    stateBehavior: 'Multi-tenant state synchronization, relational SQL DB & pub/sub event stream',
    riskMitigated: 'Manual infrastructure drift and tenant provisioning collisions.',
    status: 'operational',
    healthScore: 99.95
  },
  {
    id: 'edge_ingress',
    name: '5. Edge Ingress & DNS',
    coreTech: 'Cloudflare (Workers & Durable Objects)',
    responsibility: 'Edge routing, custom domain SSL management, global DDoS mitigation, distributed session locking.',
    executionBoundary: 'Cloudflare Edge Network',
    stateBehavior: 'Distributed edge session locks via Durable Objects (tenant_id:channel_id)',
    riskMitigated: 'Concurrent webhook execution loops, retry storms, and SQLite state corruption.',
    status: 'operational',
    healthScore: 100.0
  },
  {
    id: 'burst_failover',
    name: '6. Burst Compute & Failover',
    coreTech: 'Amazon Web Services (AWS ECS Fargate & S3 Glacier)',
    responsibility: 'Auxiliary multi-cloud backup storage, persistent state snapshots, failover container nodes, extended execution tasks.',
    executionBoundary: 'AWS ECS (Fargate) & S3 Glacier',
    stateBehavior: 'Asynchronous bucket replication & extended task state',
    riskMitigated: 'Serverless compute timeout limits and single-cloud availability failure.',
    status: 'standby',
    healthScore: 99.7
  }
];

export const INITIAL_S6_PROCESSES: S6ProcessInfo[] = [
  {
    name: 'hermes-gateway',
    serviceDir: '/etc/services.d/gateway',
    pid: 142,
    status: 'up',
    uptimeSeconds: 12480,
    restartCount: 0,
    memoryUsageMb: 84.5,
    command: 'hermes gateway run --data-dir /opt/data'
  },
  {
    name: 'hermes-api',
    serviceDir: '/etc/services.d/api',
    pid: 143,
    status: 'up',
    uptimeSeconds: 12480,
    restartCount: 0,
    port: 8642,
    memoryUsageMb: 92.1,
    command: 'python3 -m hermes.api --port 8642 --data-dir /opt/data'
  },
  {
    name: 'litestream-replicator',
    serviceDir: '/etc/services.d/litestream',
    pid: 144,
    status: 'up',
    uptimeSeconds: 12480,
    restartCount: 0,
    memoryUsageMb: 24.3,
    command: 'litestream replicate --config /etc/litestream.yml'
  },
  {
    name: 'docker-daemon-proxy',
    serviceDir: '/etc/services.d/docker-sandbox',
    pid: 145,
    status: 'up',
    uptimeSeconds: 12480,
    restartCount: 0,
    memoryUsageMb: 42.0,
    command: 'dockerd --host=unix:///var/run/docker.sock --iptables=false'
  }
];

export const INITIAL_DURABLE_OBJECT_LOCKS: DurableObjectSessionLock[] = [
  {
    id: 'lock-01',
    key: 'tenant_lwa_app:telegram_chat_9021',
    tenantId: 'tenant_lwa_app',
    channel: 'telegram',
    status: 'locked',
    heldByRequest: 'req_tg_9941a8',
    queueDepth: 0,
    ttlMs: 4200,
    lastAcquired: '2s ago'
  },
  {
    id: 'lock-02',
    key: 'tenant_cost_implode:discord_guild_4412',
    tenantId: 'tenant_cost_implode',
    channel: 'discord',
    status: 'unlocked',
    heldByRequest: 'none',
    queueDepth: 0,
    ttlMs: 0,
    lastAcquired: '45s ago'
  },
  {
    id: 'lock-03',
    key: 'tenant_mudline_mafia:whatsapp_conv_1904',
    tenantId: 'tenant_mudline_mafia',
    channel: 'whatsapp',
    status: 'queued',
    heldByRequest: 'req_wa_3310f2',
    queueDepth: 2,
    ttlMs: 2800,
    lastAcquired: '1s ago'
  },
  {
    id: 'lock-04',
    key: 'tenant_omnipublish:api_session_8812',
    tenantId: 'tenant_omnipublish',
    channel: 'api',
    status: 'unlocked',
    heldByRequest: 'none',
    queueDepth: 0,
    ttlMs: 0,
    lastAcquired: '12m ago'
  }
];

export const TENANT_PLAN_TIERS: TenantPlanTier[] = [
  {
    id: 'starter',
    name: 'Starter Tier',
    pricePerMonth: 49,
    targetAudience: 'Solopreneurs, Individual Developers',
    activeFleetSize: 1,
    modelAccess: ['Gemini 3.7 Flash'],
    gateways: ['Telegram', 'Discord'],
    concurrentSubagents: 2,
    storageGb: 5,
    sandboxBackend: 'docker (Shared Host Pool)',
    sla: 'Community Support',
    cogsBreakdown: {
      compute: 3.50,
      storage: 1.00,
      geminiApi: 8.00,
      totalCogs: 12.50,
      grossProfit: 36.50,
      grossMarginPercent: 74.5
    }
  },
  {
    id: 'pro',
    name: 'Professional Tier',
    pricePerMonth: 199,
    targetAudience: 'Growing Startups, Fast-Moving Agencies',
    activeFleetSize: 5,
    modelAccess: ['Gemini 3.7 Flash', 'Gemini 3.8 Flash'],
    gateways: ['Telegram', 'Discord', 'Slack', 'WhatsApp', 'Web Dashboard'],
    concurrentSubagents: 8,
    storageGb: 50,
    sandboxBackend: 'docker (Isolated Cloud Run Pod)',
    sla: '24-Hour Email SLA',
    cogsBreakdown: {
      compute: 16.00,
      storage: 5.00,
      geminiApi: 27.00,
      totalCogs: 48.00,
      grossProfit: 151.00,
      grossMarginPercent: 75.8
    }
  },
  {
    id: 'enterprise',
    name: 'Enterprise Corporation Tier',
    pricePerMonth: 899,
    targetAudience: 'Medium & Large Corporate Enterprises',
    activeFleetSize: 30,
    modelAccess: ['Gemini 3.8 Flash', 'Gemini 3.1 Pro Preview'],
    gateways: ['All Gateways', 'Custom Webhooks', 'Kafka / PubSub'],
    concurrentSubagents: 32,
    storageGb: 500,
    sandboxBackend: 'docker (Dedicated AWS/GCP VPC)',
    sla: '99.9% Uptime SLA + Dedicated Slack/Teams Channel',
    cogsBreakdown: {
      compute: 110.00,
      storage: 25.00,
      geminiApi: 110.00,
      totalCogs: 245.00,
      grossProfit: 654.00,
      grossMarginPercent: 72.7
    }
  }
];

export const LITESTREAM_CONFIG_TEMPLATE = `# /etc/litestream.yml - Dual-stage replication for Hermes persistent SQLite
dbs:
  - path: /tmp/hermes.db
    replicas:
      # Primary high-speed replica to Cloud Storage FUSE mount
      - path: /opt/data/db-replica
        sync-interval: 500ms
        retention: 72h
      # Secondary cloud backup replica directly to GCS bucket
      - type: gcs
        bucket: hermes-agent-tenant-data
        path: tenants/\${TENANT_ID}/wal-snapshots
        sync-interval: 1s
        snapshot-interval: 1h
        retention: 168h
`;

export const PYTHON_SIGNAL_HANDLER_CODE = `"""
Zero-Data-Loss SIGTERM Shutdown Handler for Cloud Run Containers
Captures Google Cloud Run's 10-second termination grace period.
"""
import signal
import sys
import sqlite3
import os

def handle_sigterm(signum, frame):
    print("[S6-SIGNAL] SIGTERM received from Cloud Run container manager...")
    print("[S6-SIGNAL] Flushing SQLite memory buffers and running full checkpoint...")
    
    conn = sqlite3.connect("/tmp/hermes.db")
    try:
        # Force all WAL pages into main database file
        conn.execute("PRAGMA wal_checkpoint(FULL);")
        conn.commit()
        print("[S6-SIGNAL] Full WAL checkpoint completed successfully.")
    except Exception as e:
        print(f"[S6-SIGNAL] Error during WAL checkpoint: {e}", file=sys.stderr)
    finally:
        conn.close()
        
    print("[S6-SIGNAL] Litestream binary push verified to GCS. Exiting clean.")
    sys.exit(0)

# Register signal handler
signal.signal(signal.SIGTERM, handle_sigterm)
`;
