import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  MapPin, 
  Compass, 
  Package, 
  Navigation, 
  ArrowRight,
  ShieldAlert,
  Sliders,
  DollarSign
} from 'lucide-react';
import { LogisticsNode, ActiveConsignment } from '../types';

interface GlobalLogisticsRadarProps {
  nodes: LogisticsNode[];
  consignments: ActiveConsignment[];
  onRerouteOrder: (orderId: string) => void;
  onOptimizeAllRoutes: () => void;
  isAutopilot: boolean;
}

export const GlobalLogisticsRadar: React.FC<GlobalLogisticsRadarProps> = ({
  nodes,
  consignments,
  onRerouteOrder,
  onOptimizeAllRoutes,
  isAutopilot
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedNode, setSelectedNode] = useState<LogisticsNode | null>(nodes[0] || null);
  const [filterAnomalyOnly, setFilterAnomalyOnly] = useState<boolean>(false);
  const [pulseTick, setPulseTick] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseTick(prev => (prev + 1) % 100);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const filteredConsignments = consignments.filter(c => {
    if (selectedBrand !== 'all' && c.brand !== selectedBrand) return false;
    if (filterAnomalyOnly && !c.anomalyDetected) return false;
    return true;
  });

  const totalRetail = consignments.reduce((acc, c) => acc + c.retailPrice, 0);
  const totalCogs = consignments.reduce((acc, c) => acc + c.cogs, 0);
  const totalNet = consignments.reduce((acc, c) => acc + c.netMargin, 0);
  const avgMarginPct = totalRetail > 0 ? ((totalNet / totalRetail) * 100).toFixed(1) : '55.1';

  return (
    <div className="space-y-6">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-mono">BLENDED AOV / COGS</span>
            <DollarSign className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-white font-mono">$40.45</span>
            <span className="text-xs text-slate-400">/ $16.70 COGS</span>
          </div>
          <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1 font-medium">
            <span>Locked 55.1% Gross Margin</span>
            <span className="text-slate-500 font-normal">($22.28 Net/Unit)</span>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-mono">FULFILLMENT DISPATCH</span>
            <Package className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-white font-mono">1,172</span>
            <span className="text-xs text-emerald-400">Units Today</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-1">
            <span className="text-slate-300 font-medium">Monster Digital: 54%</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 font-medium">SwiftPOD: 46%</span>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-mono">DEFECT RATE QUALITY</span>
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-emerald-400 font-mono">0.28%</span>
            <span className="text-xs text-slate-400">Target &lt; 1.0%</span>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            <span>Hermes Auto-Reshipment: Zero human tickets</span>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-mono">WEATHER &amp; CORRIDOR RISKS</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-amber-400 font-mono">1 Active</span>
            <span className="text-xs text-slate-400">Midwest Storm Alert</span>
          </div>
          <div className="mt-2 text-xs text-cyan-400 font-medium flex items-center gap-1">
            <span>Hermes On-OrderRouter auto-rerouted</span>
          </div>
        </div>
      </div>

      {/* World Interactive Map & Corridors Radar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400 animate-spin-slow" />
              <h2 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                Global Logistics Radar &amp; Fulfillment Corridors
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-[10px] font-mono">
                REAL-TIME TELEMETRY
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live mapping of domestic print nodes (Monster Digital, SwiftPOD) and international supply lines
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOptimizeAllRoutes}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Hermes Swarm Route Optimization</span>
            </button>
          </div>
        </div>

        {/* Visual Map Canvas / SVG Radar */}
        <div className="relative w-full h-80 sm:h-96 rounded-xl bg-[#080d18] border border-slate-800/80 overflow-hidden flex items-center justify-center p-4">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-grid-cyber opacity-30" />
          
          {/* World Map Stylized SVG */}
          <svg className="w-full h-full max-w-4xl" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="corridor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
              </linearGradient>
              <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Stylized Continents silhouettes */}
            <path
              d="M180,110 Q240,90 320,130 Q340,180 320,240 Q250,260 210,210 Q160,180 180,110 Z"
              fill="#131e33"
              stroke="#1e2d4a"
              strokeWidth="1.5"
            />
            {/* North America */}
            <path
              d="M140,80 Q260,70 330,120 Q310,190 280,210 Q240,240 220,290 Q200,310 180,260 Q150,230 110,160 Q120,110 140,80 Z"
              fill="#16233b"
              stroke="#243759"
              strokeWidth="1.5"
            />
            {/* South America */}
            <path
              d="M260,300 Q310,320 330,370 Q300,450 270,470 Q240,410 240,350 Z"
              fill="#131e33"
              stroke="#1e2d4a"
              strokeWidth="1.5"
            />
            {/* Europe */}
            <path
              d="M480,90 Q560,85 580,130 Q540,160 500,160 Q470,130 480,90 Z"
              fill="#16233b"
              stroke="#243759"
              strokeWidth="1.5"
            />
            {/* Africa */}
            <path
              d="M490,180 Q570,180 580,260 Q550,350 510,380 Q480,310 470,230 Z"
              fill="#131e33"
              stroke="#1e2d4a"
              strokeWidth="1.5"
            />
            {/* Asia */}
            <path
              d="M590,90 Q750,80 840,140 Q830,240 760,280 Q690,260 660,200 Q600,170 590,90 Z"
              fill="#16233b"
              stroke="#243759"
              strokeWidth="1.5"
            />
            {/* Australia */}
            <path
              d="M750,330 Q820,330 840,380 Q810,430 760,420 Q730,380 750,330 Z"
              fill="#131e33"
              stroke="#1e2d4a"
              strokeWidth="1.5"
            />

            {/* Logistics Corridors / Arc lines */}
            {/* Detroit SwiftPOD to Charlotte Monster Digital */}
            <path
              d="M260,160 Q270,175 275,190"
              stroke="url(#corridor-gradient)"
              strokeWidth="2.5"
              strokeDasharray="4 3"
              className="animate-pulse"
            />
            {/* Detroit to Europe Frankfurt */}
            <path
              d="M260,160 Q380,100 510,135"
              stroke="#06b6d4"
              strokeWidth="1.8"
              strokeOpacity="0.6"
              strokeDasharray="6 4"
            />
            {/* Reno to Detroit */}
            <path
              d="M170,165 Q215,155 260,160"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeOpacity="0.7"
            />
            {/* Charlotte to Appalachian destinations */}
            <path
              d="M275,190 Q270,185 268,182"
              stroke="#10b981"
              strokeWidth="3"
            />
            {/* Shenzhen to Frankfurt */}
            <path
              d="M760,220 Q640,150 510,135"
              stroke="#f59e0b"
              strokeWidth="1.8"
              strokeDasharray="5 3"
              strokeOpacity="0.6"
            />

            {/* Glowing Radar sweeps */}
            <circle cx="260" cy="160" r="45" fill="url(#radar-glow)" />
            <circle cx="275" cy="190" r="50" fill="url(#radar-glow)" />

            {/* Node Markers */}
            {/* SwiftPOD Detroit */}
            <g className="cursor-pointer" onClick={() => setSelectedNode(nodes[0])}>
              <circle cx="260" cy="160" r="7" fill="#06b6d4" className="animate-ping opacity-60" />
              <circle cx="260" cy="160" r="6" fill="#0891b2" stroke="#ecfeff" strokeWidth="2" />
              <text x="272" y="156" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">SwiftPOD (Detroit)</text>
              <text x="272" y="168" fill="#94a3b8" fontSize="9" fontFamily="monospace">68% cap • 36h ETA</text>
            </g>

            {/* Monster Digital Charlotte */}
            <g className="cursor-pointer" onClick={() => setSelectedNode(nodes[1])}>
              <circle cx="275" cy="190" r="6" fill="#10b981" stroke="#ecfdf5" strokeWidth="2" />
              <text x="287" y="192" fill="#34d399" fontSize="11" fontFamily="monospace" fontWeight="bold">Monster Digital (Charlotte)</text>
              <text x="287" y="204" fill="#94a3b8" fontSize="9" fontFamily="monospace">84% cap • 0.32% defect</text>
            </g>

            {/* Reno West Coast */}
            <g className="cursor-pointer" onClick={() => setSelectedNode(nodes[2])}>
              <circle cx="170" cy="165" r="5" fill="#60a5fa" stroke="#eff6ff" strokeWidth="1.5" />
              <text x="95" y="162" fill="#93c5fd" fontSize="10" fontFamily="monospace" fontWeight="bold">Reno Hub</text>
            </g>

            {/* Frankfurt */}
            <g className="cursor-pointer" onClick={() => setSelectedNode(nodes[3])}>
              <circle cx="510" cy="135" r="5" fill="#a855f7" stroke="#faf5ff" strokeWidth="1.5" />
              <text x="522" y="138" fill="#c084fc" fontSize="10" fontFamily="monospace">Frankfurt Transit</text>
            </g>

            {/* Shenzhen */}
            <g className="cursor-pointer" onClick={() => setSelectedNode(nodes[4])}>
              <circle cx="760" cy="220" r="6" fill="#f59e0b" stroke="#fffbeb" strokeWidth="1.5" />
              <text x="772" y="222" fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="bold">Shenzhen Node</text>
              <text x="772" y="234" fill="#f87171" fontSize="9" fontFamily="monospace">Typhoon Alert</text>
            </g>
          </svg>

          {/* Quick Selected Node Card Overlay */}
          {selectedNode && (
            <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-800 rounded-xl p-3 backdrop-blur-md max-w-xs text-xs font-mono shadow-xl">
              <div className="flex items-center justify-between text-slate-300 font-bold mb-1">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <MapPin className="w-3.5 h-3.5" />
                  {selectedNode.name}
                </span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                  selectedNode.status === 'optimal' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                }`}>
                  {selectedNode.status.toUpperCase()}
                </span>
              </div>
              <div className="text-slate-400 text-[11px] mb-2">{selectedNode.location}</div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 border-t border-slate-800/80 pt-2">
                <div>
                  <span className="text-slate-500 block text-[10px]">CAPACITY</span>
                  <span className="font-bold text-white">{selectedNode.capacityUtil}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">DEFECT RATE</span>
                  <span className="font-bold text-emerald-400">{selectedNode.defectRate}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">AVG TURNAROUND</span>
                  <span className="font-bold text-slate-200">{selectedNode.averageTurnaroundHours} Hours</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">DISPATCHED TODAY</span>
                  <span className="font-bold text-cyan-300">{selectedNode.ordersHandledToday} units</span>
                </div>
              </div>
              {selectedNode.weatherAlert && (
                <div className="mt-2 text-[10px] text-amber-300 bg-amber-950/50 border border-amber-800/60 p-1.5 rounded flex items-start gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{selectedNode.weatherAlert}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Real-Time Parcel Consignments Table & Optimization Engine */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide font-mono flex items-center gap-2">
              <Truck className="w-4 h-4 text-cyan-400" />
              <span>ACTIVE SUPPLY CHAIN CONSIGNMENTS &amp; MARGIN PROTECTION</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live orders flowing from Lone Wolf Appalachia and Mudline Mafia Shopify storefronts through Printify network
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Brands ({consignments.length})</option>
              <option value="Lone Wolf Appalachia">Lone Wolf Appalachia</option>
              <option value="Mudline Mafia">Mudline Mafia</option>
            </select>

            <button
              onClick={() => setFilterAnomalyOnly(!filterAnomalyOnly)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono transition-all ${
                filterAnomalyOnly 
                  ? 'bg-amber-950/60 border-amber-600 text-amber-300' 
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldAlert className="w-3 h-3 text-amber-400" />
              <span>Anomalies Only</span>
            </button>
          </div>
        </div>

        {/* Consignment Items */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                <th className="py-2.5 px-3">ORDER / BRAND</th>
                <th className="py-2.5 px-3">SKU &amp; PRODUCT SPEC</th>
                <th className="py-2.5 px-3">DESTINATION &amp; CARRIER</th>
                <th className="py-2.5 px-3">RETAIL / COGS / MARGIN</th>
                <th className="py-2.5 px-3">STATUS &amp; ETA</th>
                <th className="py-2.5 px-3 text-right">HERMES ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredConsignments.map((order) => {
                return (
                  <tr 
                    key={order.id}
                    className={`hover:bg-slate-800/30 transition-colors ${
                      order.anomalyDetected ? 'bg-amber-950/10' : ''
                    }`}
                  >
                    <td className="py-3 px-3">
                      <div className="font-bold text-white">{order.orderNumber}</div>
                      <div className="text-[11px] text-cyan-400">{order.brand}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-slate-200 font-medium">{order.skuName}</div>
                      <div className="text-[11px] text-slate-500">Qty: {order.quantity} • SKU: {order.sku}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-slate-300">{order.destinationCity}</div>
                      <div className="text-[11px] text-slate-500">{order.carrier} • {order.trackingNumber.slice(-8)}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-slate-200">
                        <span className="font-bold text-white">${order.retailPrice.toFixed(2)}</span>
                        <span className="text-slate-500 text-[11px]"> (COGS: ${order.cogs.toFixed(2)})</span>
                      </div>
                      <div className="text-[11px] text-emerald-400 font-medium">
                        Net: +${order.netMargin.toFixed(2)} ({((order.netMargin / order.retailPrice) * 100).toFixed(1)}%)
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${
                          order.status === 'Rerouted' ? 'bg-amber-400 animate-pulse' :
                          order.status === 'Out for Delivery' ? 'bg-emerald-400' :
                          'bg-cyan-400'
                        }`} />
                        <span className="text-white font-medium">{order.status}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">{order.predictedEta}</div>
                      {order.anomalyReason && (
                        <div className="text-[10px] text-amber-300 mt-1 max-w-xs leading-relaxed bg-amber-950/30 p-1 rounded">
                          {order.anomalyReason}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      {order.anomalyDetected ? (
                        <button
                          onClick={() => onRerouteOrder(order.id)}
                          className="px-2.5 py-1 bg-amber-600/80 hover:bg-amber-500 text-white rounded text-[11px] font-semibold transition-all shadow"
                        >
                          Hermes Rerouted
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                          <CheckCircle2 className="w-3 h-3" />
                          Optimal
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
