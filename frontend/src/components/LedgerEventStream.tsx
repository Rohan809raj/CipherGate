import React from 'react';
import { Activity, Radio, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { VerificationHistoryItem } from '@contract';

interface LedgerEventStreamProps {
  history: VerificationHistoryItem[];
}

export function LedgerEventStream({ history }: LedgerEventStreamProps) {
  return (
    <div className="p-6 rounded-3xl bg-[#0B0F1E] border border-slate-800 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2.5">
          <Activity className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-extrabold text-white font-space">Live Midnight Event Stream</h3>
        </div>
        <div className="flex items-center space-x-1.5 text-[11px] font-mono text-emerald-400 font-bold">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>Preprod Node Active</span>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="p-6 text-center border border-dashed border-slate-800/80 rounded-2xl space-y-1.5">
          <Clock className="w-6 h-6 text-slate-600 mx-auto" />
          <p className="text-xs font-mono text-slate-400">Awaiting eligibility transactions...</p>
          <p className="text-[11px] text-slate-500">Run a proof above to broadcast a zero-knowledge settlement.</p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition font-mono text-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-[11px]">
                  <CheckCircle2 size={13} className="text-emerald-400" /> isEligible: TRUE
                </span>
                <span className="text-slate-500 text-[10px]">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="text-[10px] text-slate-300 truncate">
                <span className="text-slate-500">Proof: </span>
                <span className="text-cyan-400 font-medium">{item.proofHash}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-900 pt-1">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck size={12} /> Age Leaked: 0 Bytes
                </span>
                <span className="text-slate-500">Threshold: &ge; {item.minAgeThreshold}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
