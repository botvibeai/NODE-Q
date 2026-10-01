import {
  HermesAgent,
  ChildAppNode,
  LogisticsNode,
  ActiveConsignment,
  PythonScript,
  GitCommit,
  FinancialMilestone
} from '../types';

export const INITIAL_HERMES_AGENTS: HermesAgent[] = [
  {
    id: 'agent-above-01',
    name: 'Hermes-Above-Treasury',
    tier: 'ABOVE',
    role: 'Executive Strategy & Autonomous Capital Reinvestment',
    status: 'active',
    currentTask: 'Auditing net operating cash flow; gating paid TikTok/Meta ad spend until ROAS >= 3.5x',
    targetNodeId: 'node-lwa-mm',
    ttftMs: 42,
    memoryIndexSize: '184 MB (FTS5 indexed)',
    uptime: '99.98%',
    lastActionTime: '12s ago',
    modelRoute: 'Gemini 3.1 Pro',
    arbitrageSavingsPercent: 63.3
  },
  {
    id: 'agent-above-02',
    name: 'Hermes-Above-Governance',
    tier: 'ABOVE',
    role: 'Savings Governance Engine Controller (tau = 0.633)',
    status: 'optimizing',
    currentTask: 'Calculating Delta S(p) surplus capture on 1.4M BYOK prompt tokens',
    targetNodeId: 'node-cost-implode',
    ttftMs: 38,
    memoryIndexSize: '240 MB (FTS5 indexed)',
    uptime: '99.99%',
    lastActionTime: '4s ago',
    modelRoute: 'Gemini 3.8 Flash',
    arbitrageSavingsPercent: 63.3
  },
  {
    id: 'agent-under-01',
    name: 'Hermes-Under-EdgeProbe',
    tier: 'UNDER',
    role: 'Cloud Run & Edge Container Latency Monitor',
    status: 'active',
    currentTask: 'Synthetically pinging Google AI Studio, Cloudflare Workers KV & AWS Fargate failover',
    targetNodeId: 'node-cost-implode',
    ttftMs: 18,
    memoryIndexSize: '96 MB (FTS5 indexed)',
    uptime: '100%',
    lastActionTime: '1s ago',
    modelRoute: 'Gemini 2.5 Flash-Lite',
    arbitrageSavingsPercent: 88.5
  },
  {
    id: 'agent-under-02',
    name: 'Hermes-Under-Fulfillment',
    tier: 'UNDER',
    role: 'Printify Provider Defect & Transit Telemetry Monitor',
    status: 'active',
    currentTask: 'Tracking print node queues at Monster Digital vs SwiftPOD; 0 reshipments required today',
    targetNodeId: 'node-lwa-mm',
    ttftMs: 24,
    memoryIndexSize: '112 MB (FTS5 indexed)',
    uptime: '99.95%',
    lastActionTime: '6s ago',
    modelRoute: 'Gemini 2.5 Flash',
    arbitrageSavingsPercent: 74.2
  },
  {
    id: 'agent-on-01',
    name: 'Hermes-On-ArbitrageRouter',
    tier: 'ON_WITH',
    role: 'Dynamic Model Arbitrage & Ingress Prompt Classifier',
    status: 'executing',
    currentTask: 'Routing Class 1 tool calls to Gemini 2.5 Flash-Lite; Class 2 code logic to Gemini Pro',
    targetNodeId: 'node-cost-implode',
    ttftMs: 28,
    memoryIndexSize: '310 MB (FTS5 indexed)',
    uptime: '99.99%',
    lastActionTime: '2s ago',
    modelRoute: 'Gemini 2.5 Flash-Lite',
    arbitrageSavingsPercent: 82.0
  },
  {
    id: 'agent-on-02',
    name: 'Hermes-On-OrderRouter',
    tier: 'ON_WITH',
    role: 'Automated Supply Chain & Routing Graph Synthesizer',
    status: 'active',
    currentTask: 'Rerouting 18 Midwest hoodie orders to SwiftPOD (Detroit) to beat Ohio corridor storm',
    targetNodeId: 'node-lwa-mm',
    ttftMs: 31,
    memoryIndexSize: '142 MB (FTS5 indexed)',
    uptime: '99.96%',
    lastActionTime: '18s ago',
    modelRoute: 'Gemini 3.8 Flash',
    arbitrageSavingsPercent: 65.0
  },
  {
    id: 'agent-around-01',
    name: 'Hermes-Around-AvatarMedia',
    tier: 'AROUND',
    role: 'upload-post.com Realistic Avatar Video Generator',
    status: 'executing',
    currentTask: 'Rendering 3 avatar video shorts with Bella+Canvas 3001 fabric overlay for TikTok & IG Reels',
    targetNodeId: 'node-avatar-engine',
    ttftMs: 45,
    memoryIndexSize: '290 MB (FTS5 indexed)',
    uptime: '99.91%',
    lastActionTime: '30s ago',
    modelRoute: 'Gemini 2.5 Pro',
    arbitrageSavingsPercent: 58.4
  },
  {
    id: 'agent-around-02',
    name: 'Hermes-Around-pSEO-Backlinks',
    tier: 'AROUND',
    role: 'News Hub Backlink Flywheel & Multilingual TokenTax',
    status: 'active',
    currentTask: 'Syndicating rewritten Appalachian heritage story to Substack/Medium with clean backlink injections',
    targetNodeId: 'node-lwa-mm',
    ttftMs: 36,
    memoryIndexSize: '215 MB (FTS5 indexed)',
    uptime: '99.94%',
    lastActionTime: '15s ago',
    modelRoute: 'Gemini 2.5 Flash',
    arbitrageSavingsPercent: 71.0
  }
];

export const INITIAL_CHILD_NODES: ChildAppNode[] = [
  {
    id: 'node-lwa-mm',
    name: 'Lone Wolf Appalachia & Mudline Mafia',
    code: 'NODE-01',
    description: 'Autonomous multi-brand e-commerce & print-on-demand fulfillment swarm. Direct integration with Printify network (Monster Digital & SwiftPOD) with zero physical inventory risk.',
    category: 'e-commerce',
    status: 'online',
    gitRepo: 'git@botvibe.internal:apps/lone-wolf-mudline-storefront.git',
    gitBranch: 'production-main',
    deploymentTarget: 'Google Cloud Run',
    assignedAgents: ['agent-above-01', 'agent-under-02', 'agent-on-02', 'agent-around-02'],
    monthlyVolume: '2,300 units/mo',
    grossMargin: '55.1%',
    keyMetricLabel: 'Blended Contribution',
    keyMetricValue: '$22.28 / unit',
    lastSyncTimestamp: '2 mins ago',
    config: {
      webhookUrl: 'https://ais-dev-2pxa5m7ziulyhm2d2ovr3i-169138870528.us-west1.run.app/api/webhooks/shopify',
      autoArbitrage: true,
      governanceThreshold: 0.633,
      adSpendUnlocked: true,
      cogsTarget: 16.70
    }
  },
  {
    id: 'node-cost-implode',
    name: 'CostImplodeAI Gateway',
    code: 'NODE-02',
    description: 'Autonomous 1000 IQ multi-cloud AI model arbitrage gateway. Regulates delivered cost reductions via 63.3% savings governance engine while eliminating non-English token taxes via tokentax0.com.',
    category: 'infrastructure',
    status: 'online',
    gitRepo: 'git@botvibe.internal:apps/cost-implode-arbitrage.git',
    gitBranch: 'edge-v2-stable',
    deploymentTarget: 'Cloudflare Edge',
    assignedAgents: ['agent-above-02', 'agent-under-01', 'agent-on-01'],
    monthlyVolume: '36,500 accounts',
    grossMargin: '80.8%',
    keyMetricLabel: 'Protocol Yield MTD',
    keyMetricValue: '$258,000 / mo',
    lastSyncTimestamp: 'Just now',
    config: {
      webhookUrl: 'https://news.costimplodeai.com/api/v1/arbitrage/webhook',
      autoArbitrage: true,
      governanceThreshold: 0.633,
      adSpendUnlocked: true,
      cogsTarget: 1.10
    }
  },
  {
    id: 'node-omnipublish-kdp',
    name: 'OmniPublish: KDP & Latenode Swarm',
    code: 'NODE-03',
    description: 'Autonomous publishing pipeline calculating exact manuscript & cover geometries at 300 DPI (white/cream stock thickness) and compiling executable Latenode JSON workflow graphs.',
    category: 'publishing',
    status: 'online',
    gitRepo: 'git@botvibe.internal:apps/omnipublish-kdp-engine.git',
    gitBranch: 'kdp-calculator-v3',
    deploymentTarget: 'Google Cloud Run',
    assignedAgents: ['agent-on-01', 'agent-under-01'],
    monthlyVolume: '450 book titles',
    grossMargin: '91.2%',
    keyMetricLabel: 'Amazon Pre-flight Pass Rate',
    keyMetricValue: '100.0%',
    lastSyncTimestamp: '14 mins ago',
    config: {
      webhookUrl: 'https://ais-dev-2pxa5m7ziulyhm2d2ovr3i-169138870528.us-west1.run.app/api/webhooks/kdp',
      autoArbitrage: true,
      governanceThreshold: 0.633,
      adSpendUnlocked: false,
      cogsTarget: 0.85
    }
  },
  {
    id: 'node-avatar-engine',
    name: 'Upload-Post Avatar Video Network',
    code: 'NODE-04',
    description: 'Proprietary short-form video synthesis engine generating hyper-realistic digital avatars styling Lone Wolf Appalachia and Mudline Mafia gear, disptached directly into TikTok & Reels APIs.',
    category: 'media',
    status: 'online',
    gitRepo: 'git@botvibe.internal:apps/upload-post-avatar-engine.git',
    gitBranch: 'video-render-v1.4',
    deploymentTarget: 'Encore.cloud',
    assignedAgents: ['agent-around-01'],
    monthlyVolume: '90 videos / month',
    grossMargin: '96.5%',
    keyMetricLabel: 'Organic Social Reach',
    keyMetricValue: '180,000+ views',
    lastSyncTimestamp: '3 mins ago',
    config: {
      webhookUrl: 'https://upload-post.com/api/v1/webhook',
      autoArbitrage: true,
      governanceThreshold: 0.633,
      adSpendUnlocked: true,
      cogsTarget: 2.50
    }
  }
];

export const INITIAL_LOGISTICS_NODES: LogisticsNode[] = [
  {
    id: 'node-swiftpod-detroit',
    name: 'SwiftPOD Domestic Hub',
    type: 'fulfillment_center',
    location: 'Detroit, Michigan, USA',
    coordinates: [42.3314, -83.0458],
    provider: 'SwiftPOD',
    capacityUtil: 68,
    defectRate: 0.28,
    averageTurnaroundHours: 36,
    status: 'optimal',
    ordersHandledToday: 342
  },
  {
    id: 'node-monster-charlotte',
    name: 'Monster Digital East Hub',
    type: 'fulfillment_center',
    location: 'Charlotte, North Carolina, USA',
    coordinates: [35.2271, -80.8431],
    provider: 'Monster Digital',
    capacityUtil: 84,
    defectRate: 0.32,
    averageTurnaroundHours: 44,
    status: 'optimal',
    ordersHandledToday: 418
  },
  {
    id: 'node-west-reno',
    name: 'West Coast Regional Node',
    type: 'fulfillment_center',
    location: 'Reno, Nevada, USA',
    coordinates: [39.5296, -119.8138],
    provider: 'SwiftPOD',
    capacityUtil: 45,
    defectRate: 0.19,
    averageTurnaroundHours: 32,
    status: 'optimal',
    ordersHandledToday: 195
  },
  {
    id: 'node-eu-frankfurt',
    name: 'Frankfurt Central Dispatch',
    type: 'transit_hub',
    location: 'Frankfurt, Germany',
    coordinates: [50.1109, 8.6821],
    provider: 'Central Warehouse',
    capacityUtil: 52,
    defectRate: 0.21,
    averageTurnaroundHours: 24,
    status: 'optimal',
    ordersHandledToday: 128
  },
  {
    id: 'node-asia-shenzhen',
    name: 'Shenzhen Component & Hardware Cache',
    type: 'edge_cache',
    location: 'Shenzhen, Guangdong, China',
    coordinates: [22.5431, 114.0579],
    provider: 'Direct Print',
    capacityUtil: 72,
    defectRate: 0.41,
    averageTurnaroundHours: 48,
    status: 'warning',
    weatherAlert: 'Typhoon alert near Pearl River delta; international parcel air-freight delay +12h',
    ordersHandledToday: 89
  }
];

export const INITIAL_CONSIGNMENTS: ActiveConsignment[] = [
  {
    id: 'ord-10492',
    orderNumber: '#LWA-9204',
    brand: 'Lone Wolf Appalachia',
    sku: 'BC-3001-FOR-L',
    skuName: 'Bella+Canvas 3001 - Forest Green (L)',
    quantity: 2,
    originNodeId: 'node-swiftpod-detroit',
    destinationCity: 'Boone, North Carolina',
    destinationCoords: [36.2168, -81.6746],
    carrier: 'USPS Priority',
    trackingNumber: '9400111899562534892019',
    status: 'In Transit',
    predictedEta: 'Tomorrow, 2:30 PM',
    anomalyDetected: false,
    retailPrice: 60.00,
    cogs: 27.00,
    netMargin: 30.66,
    autoOptimized: true
  },
  {
    id: 'ord-10493',
    orderNumber: '#MDM-8193',
    brand: 'Mudline Mafia',
    sku: 'GD-18500-BLK-XL',
    skuName: 'Gildan 18500 Heavyweight Hoodie - Mudline Black (XL)',
    quantity: 1,
    originNodeId: 'node-monster-charlotte',
    destinationCity: 'Knoxville, Tennessee',
    destinationCoords: [35.9606, -83.9207],
    carrier: 'FedEx Ground',
    trackingNumber: '782910482910',
    status: 'Rerouted',
    predictedEta: 'Oct 02, 11:00 AM',
    anomalyDetected: true,
    anomalyReason: 'Rerouted by Hermes Agent from Midwest hub to Charlotte to avoid severe storm delay. Saved 48 hrs.',
    retailPrice: 62.00,
    cogs: 23.50,
    netMargin: 36.40,
    autoOptimized: true
  },
  {
    id: 'ord-10494',
    orderNumber: '#MDM-8194',
    brand: 'Mudline Mafia',
    sku: 'CASE-PRO-IP16',
    skuName: 'Impact Tough Phone Case - Mud Camo (iPhone 16 Pro)',
    quantity: 1,
    originNodeId: 'node-swiftpod-detroit',
    destinationCity: 'Lexington, Kentucky',
    destinationCoords: [38.0406, -84.5037],
    carrier: 'USPS Priority',
    trackingNumber: '9400111899562534892099',
    status: 'Out for Delivery',
    predictedEta: 'Today, 4:15 PM',
    anomalyDetected: false,
    retailPrice: 25.00,
    cogs: 11.50,
    netMargin: 12.47,
    autoOptimized: true
  },
  {
    id: 'ord-10495',
    orderNumber: '#LWA-9205',
    brand: 'Lone Wolf Appalachia',
    sku: 'BUNDLE-FALL-01',
    skuName: 'Appalachian Evergreen Bundle (BC-3001 + Gildan 18500)',
    quantity: 1,
    originNodeId: 'node-monster-charlotte',
    destinationCity: 'Asheville, North Carolina',
    destinationCoords: [35.5951, -82.5515],
    carrier: 'USPS Priority',
    trackingNumber: '9400111899562534892144',
    status: 'In Production',
    predictedEta: 'Oct 03, 1:00 PM',
    anomalyDetected: false,
    retailPrice: 92.00,
    cogs: 37.00,
    netMargin: 51.73,
    autoOptimized: true
  }
];

export const INITIAL_PYTHON_SCRIPTS: PythonScript[] = [
  {
    id: 'py-supply-optimizer',
    filename: 'supply_chain_optimizer.py',
    description: 'Calculates Euclidean distance and provider defect probability matrix to allocate Printify orders between Monster Digital and SwiftPOD with 55.1% margin lock.',
    runtime: 'Python 3.11 (uv)',
    category: 'Logistics',
    code: `"""
Autonomous Hermes Agent Supply Chain Optimizer (Node Q Core)
Optimizes domestic print-on-demand fulfillment nodes for Lone Wolf Appalachia & Mudline Mafia.
"""
import math
import json

PROVIDERS = {
    "Monster Digital": {"loc": (35.2271, -80.8431), "defect_rate": 0.0032, "base_cost_bc3001": 13.50, "turnaround_h": 44},
    "SwiftPOD":        {"loc": (42.3314, -83.0458), "defect_rate": 0.0028, "base_cost_bc3001": 13.50, "turnaround_h": 36}
}

DESTINATIONS = [
    {"order_id": "LWA-9204", "loc": (36.2168, -81.6746), "units": 2, "item": "Bella+Canvas 3001"},
    {"order_id": "MDM-8193", "loc": (35.9606, -83.9207), "units": 1, "item": "Gildan 18500"},
    {"order_id": "LWA-9205", "loc": (35.5951, -82.5515), "units": 1, "item": "Evergreen Bundle"}
]

def distance(c1, c2):
    return math.hypot(c1[0] - c2[0], c1[1] - c2[1])

def optimize_routing():
    decisions = []
    for order in DESTINATIONS:
        scores = {}
        for prov_name, prov in PROVIDERS.items():
            dist = distance(prov["loc"], order["loc"])
            # Hermes routing weight: 60% distance + 40% turnaround + defect penalty
            score = (dist * 0.6) + (prov["turnaround_h"] * 0.01) + (prov["defect_rate"] * 100)
            scores[prov_name] = (score, dist)
        
        best_prov = min(scores, key=lambda p: scores[p][0])
        decisions.append({
            "order": order["order_id"],
            "allocated_provider": best_prov,
            "transit_distance_approx_deg": round(scores[best_prov][1], 3),
            "locked_margin_pct": 55.1
        })
    return decisions

if __name__ == "__main__":
    result = optimize_routing()
    print(json.dumps(result, indent=2))
`
  },
  {
    id: 'py-arbitrage-solver',
    filename: 'token_arbitrage_solver.py',
    description: 'Implements the CostImplodeAI Mathematical Governance formula (tau = 0.633) to calculate gateway protocol yield F_gateway(p) and client savings Delta S(p).',
    runtime: 'Python 3.11 (uv)',
    category: 'Arbitrage',
    code: `"""
CostImplodeAI 63.3% Savings Governance Engine Solver
tau = 0.633 target savings cap
Calculates surplus yield capture vs client delivered discount.
"""
def evaluate_arbitrage(c_base, c_raw, tau=0.633, daily_calls=1_000_000):
    # Theoretical raw savings ratio
    s_raw = 1.0 - (c_raw / c_base)
    
    # Governance Delta
    if s_raw > tau:
        delta_s = s_raw - tau
        c_governed = c_base * (1.0 - tau)
        gateway_surcharge = c_base * delta_s
    else:
        delta_s = 0.0
        c_governed = c_raw
        gateway_surcharge = 0.0
        
    daily_base_cost = daily_calls * c_base
    daily_user_savings = daily_calls * (c_base - c_governed)
    daily_protocol_yield = daily_calls * gateway_surcharge
    monthly_protocol_yield = daily_protocol_yield * 30
    
    return {
        "c_base": c_base,
        "c_raw": c_raw,
        "s_raw_pct": round(s_raw * 100, 2),
        "delivered_savings_pct": round(tau * 100, 2),
        "protocol_yield_margin_pct": round(delta_s * 100, 2),
        "daily_user_savings_usd": round(daily_user_savings, 2),
        "daily_protocol_yield_usd": round(daily_protocol_yield, 2),
        "monthly_protocol_yield_usd": round(monthly_protocol_yield, 2)
    }

if __name__ == "__main__":
    # Baseline: $0.010 per 1k blended tokens, Raw Arbitrage via Gemini Flash: $0.0008
    metrics = evaluate_arbitrage(c_base=0.010, c_raw=0.0008)
    for k, v in metrics.items():
        print(f"{k}: {v}")
`
  },
  {
    id: 'py-kdp-calculator',
    filename: 'kdp_geometry_calc.py',
    description: 'Kindle Direct Publishing spine & cover raster calculator. Computes S_width = P_count * C_paper at 300 DPI with 0.125" bleed margins.',
    runtime: 'Python 3.11 (uv)',
    category: 'KDP Geometry',
    code: `"""
Amazon KDP Cover & Spine Geometry Engine (Standardized Python Module)
Deterministic rounding to prevent Amazon pre-flight file validation rejections.
"""
def compute_kdp_cover(page_count: int, paper_stock: str = "white", trim_width: float = 6.0, trim_height: float = 9.0):
    COEFFICIENTS = {
        "white": 0.002252,
        "cream": 0.002500
    }
    bleed_margin = 0.125
    c_paper = COEFFICIENTS.get(paper_stock.lower(), 0.002252)
    
    # S_width = P_count * C_paper
    spine_width = page_count * c_paper
    
    # Total cover width and height
    total_width = bleed_margin + trim_width + spine_width + trim_width + bleed_margin
    total_height = bleed_margin + trim_height + bleed_margin
    
    # 300 DPI raster pixel dimensions
    dpi = 300
    canvas_pixels_x = round(total_width * dpi)
    canvas_pixels_y = round(total_height * dpi)
    spine_pixels = round(spine_width * dpi)
    
    return {
        "page_count": page_count,
        "paper_stock": paper_stock,
        "spine_width_in": round(spine_width, 4),
        "total_width_in": round(total_width, 4),
        "total_height_in": round(total_height, 4),
        "canvas_pixels_300dpi": f"{canvas_pixels_x} x {canvas_pixels_y}",
        "spine_pixels_300dpi": spine_pixels,
        "amazon_preflight_pass": True
    }

if __name__ == "__main__":
    result = compute_kdp_cover(page_count=248, paper_stock="white")
    print("KDP Geometry Pre-Flight Results:")
    for key, val in result.items():
        print(f"  {key}: {val}")
`
  },
  {
    id: 'py-hermes-sync',
    filename: 'hermes_sync_daemon.py',
    description: 'Cross-platform synchronization daemon unifying Shopify, Printify, Cloudflare edge key-value stores, and Cloud Run containers.',
    runtime: 'Python 3.11 (uv)',
    category: 'Sync Daemon',
    code: `"""
Hermes Cross-Platform Synchronization Daemon
Syncs Node Q corporate directives across active child app nodes.
"""
import time

CHANNELS = ["Shopify API", "Printify Fulfillment", "Cloudflare KV", "Encore PubSub", "Cloud Run HSM"]

def sync_all():
    print("[Node-Q-Hermes] Initiating enterprise cross-platform heartbeat...")
    for channel in CHANNELS:
        time.sleep(0.05)
        print(f"  [OK] Synchronized: {channel} (status: 200 OK, latency: <22ms)")
    print("[Node-Q-Hermes] All 4 child app nodes synchronized with Node Q state.")
    return True

if __name__ == "__main__":
    sync_all()
`
  }
];

export const INITIAL_GIT_COMMITS: GitCommit[] = [
  {
    id: 'commit-101',
    hash: 'a7b8e21',
    message: 'feat(logistics): lock Printify premium annual billing ($24.99/mo) across Lone Wolf & Mudline',
    author: 'Hermes-Above-Treasury',
    timestamp: '18 mins ago',
    branch: 'production-main',
    appNode: 'Lone Wolf Appalachia',
    filesChanged: 3
  },
  {
    id: 'commit-102',
    hash: 'd3f910c',
    message: 'perf(arbitrage): deploy tau=0.633 governance cap on CostImplode edge workers',
    author: 'Hermes-Above-Governance',
    timestamp: '42 mins ago',
    branch: 'edge-v2-stable',
    appNode: 'CostImplodeAI Gateway',
    filesChanged: 5
  },
  {
    id: 'commit-103',
    hash: '90cb14a',
    message: 'fix(kdp): standardize white paper thickness coefficient to 0.002252 for Amazon pre-flight',
    author: 'Hermes-On-OrderRouter',
    timestamp: '2 hours ago',
    branch: 'kdp-calculator-v3',
    appNode: 'OmniPublish',
    filesChanged: 2
  },
  {
    id: 'commit-104',
    hash: 'fe482bc',
    message: 'ci(docker): minimal Debian 12 container packaging with uv Python 3.11 & supervisord',
    author: 'Hermes-Under-EdgeProbe',
    timestamp: '4 hours ago',
    branch: 'main',
    appNode: 'Node Q Supreme Core',
    filesChanged: 7
  }
];

export const FINANCIAL_12_MONTHS: FinancialMilestone[] = [
  { month: 1, focus: "Warm launch, TikTok avatar push, organic outreach", unitsSold: 75, grossRevenue: 3033.75, cogs: 1252.50, adBudget: 0.00, softwareFees: 329.25, netProfit: 1452.00, marginPercent: 47.9 },
  { month: 2, focus: "TikTok growth, community Design Vote Drop #1", unitsSold: 120, grossRevenue: 4854.00, cogs: 2004.00, adBudget: 0.00, softwareFees: 395.40, netProfit: 2454.60, marginPercent: 50.6 },
  { month: 3, focus: "SEO link network active across Medium/Substack", unitsSold: 180, grossRevenue: 7281.00, cogs: 3006.00, adBudget: 0.00, softwareFees: 483.60, netProfit: 3791.40, marginPercent: 52.1 },
  { month: 4, focus: "Meta/TikTok paid ad testing ($40/day reinvestment)", unitsSold: 280, grossRevenue: 11326.00, cogs: 4676.00, adBudget: 1200.00, softwareFees: 630.60, netProfit: 4819.40, marginPercent: 42.6 },
  { month: 5, focus: "Paid ad scaling, Mudline Mafia phone case drop", unitsSold: 420, grossRevenue: 16989.00, cogs: 7014.00, adBudget: 2200.00, softwareFees: 836.40, netProfit: 6938.60, marginPercent: 40.8 },
  { month: 6, focus: "Mid-year scale, avatar retargeting campaigns", unitsSold: 580, grossRevenue: 23461.00, cogs: 9686.00, adBudget: 3200.00, softwareFees: 1071.60, netProfit: 9503.40, marginPercent: 40.5 },
  { month: 7, focus: "Dual-brand catalog expansion, summer push", unitsSold: 750, grossRevenue: 30337.50, cogs: 12525.00, adBudget: 4200.00, softwareFees: 1321.50, netProfit: 12291.00, marginPercent: 40.5 },
  { month: 8, focus: "Retargeting automation, email/SMS flows active", unitsSold: 950, grossRevenue: 38427.50, cogs: 15865.00, adBudget: 5500.00, softwareFees: 1615.50, netProfit: 15447.00, marginPercent: 40.2 },
  { month: 9, focus: "Fall hoodie launch across LWA & Mudline", unitsSold: 1200, grossRevenue: 48540.00, cogs: 20040.00, adBudget: 7200.00, softwareFees: 1983.00, netProfit: 19317.00, marginPercent: 39.8 },
  { month: 10, focus: "Pre-Q4 scaling, lookalike audience expansion", unitsSold: 1600, grossRevenue: 64720.00, cogs: 26720.00, adBudget: 10000.00, softwareFees: 2571.00, netProfit: 25429.00, marginPercent: 39.3 },
  { month: 11, focus: "Black Friday / Cyber Monday holiday surge", unitsSold: 2300, grossRevenue: 93035.00, cogs: 38410.00, adBudget: 15000.00, softwareFees: 3600.00, netProfit: 36025.00, marginPercent: 38.7 },
  { month: 12, focus: "Holiday gifting & year-end clearance drops", unitsSold: 1850, grossRevenue: 74832.50, cogs: 30895.00, adBudget: 11000.00, softwareFees: 2938.50, netProfit: 29999.00, marginPercent: 40.1 }
];

export const FIVE_YEAR_PROJECTIONS = [
  { year: 1, units: 10305, aov: 40.45, revenue: 416837.25, cogs: 172093.50, adSpend: 59500.00, softwareFees: 17776.35, netProfit: 167467.40, margin: 40.2 },
  { year: 2, units: 28000, aov: 42.50, revenue: 1190000.00, cogs: 476000.00, adSpend: 240000.00, softwareFees: 48000.00, netProfit: 426000.00, margin: 35.8 },
  { year: 3, units: 62000, aov: 45.00, revenue: 2790000.00, cogs: 1088100.00, adSpend: 580000.00, softwareFees: 110000.00, netProfit: 1011900.00, margin: 36.3 },
  { year: 4, units: 125000, aov: 48.00, revenue: 6000000.00, cogs: 2280000.00, adSpend: 1250000.00, softwareFees: 220000.00, netProfit: 2250000.00, margin: 37.5 },
  { year: 5, units: 210000, aov: 52.00, revenue: 10920000.00, cogs: 4040400.00, adSpend: 2200000.00, softwareFees: 390000.00, netProfit: 4289600.00, margin: 39.3 }
];
