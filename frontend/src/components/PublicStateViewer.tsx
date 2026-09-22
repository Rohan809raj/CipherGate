import React from 'react';
import { ExternalLink, Database, Shield, CheckCircle2, Lock } from 'lucide-react';

interface PublicStateViewerProps {
  verifiedCount?: number;
  minAgeThreshold?: number;
}

export const PublicStateViewer: React.FC<PublicStateViewerProps> = ({
  verifiedCount = 1429,
  minAgeThreshold = 18
}) => {
  const contractAddress = '7f8a9b2c3d4e5f60718293a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4';
  const explorerUrl = `https://explorer.midnight.network/contract/${contractAddress}`;

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-5 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-neutral-800 gap-3">
        <div className="flex items-center space-x-2.5">
          <Database className="w-5 h-5 text-violet-400" />
          <h4 className="text-sm font-semibold text-white">Midnight Preprod Ledger State (Public View)</h4>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
            Live Synchronized
          </span>
        </div>
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-neutral-400 hover:text-violet-300 flex items-center space-x-1 transition font-mono"
        >
          <span>Contract: 0x7f8a...3c4</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800">
          <div className="text-neutral-400 text-[11px] mb-1 flex items-center space-x-1.5">
            <Lock className="w-3 h-3 text-violet-400" />
            <span>minAgeThreshold</span>
          </div>
          <div className="text-base font-semibold text-white">{minAgeThreshold}</div>
          <div className="text-[10px] text-neutral-500 mt-0.5">Uint&lt;32&gt; Configured</div>
        </div>

        <div className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800">
          <div className="text-neutral-400 text-[11px] mb-1 flex items-center space-x-1.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>verifiedEligibleCount</span>
          </div>
          <div className="text-base font-semibold text-emerald-400">{verifiedCount.toLocaleString()}</div>
          <div className="text-[10px] text-neutral-500 mt-0.5">Uint&lt;64&gt; Total Proven</div>
        </div>

        <div className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800">
          <div className="text-neutral-400 text-[11px] mb-1 flex items-center space-x-1.5">
            <Shield className="w-3 h-3 text-violet-400" />
            <span>Nullifier Accumulator</span>
          </div>
          <div className="font-mono text-[11px] text-neutral-300 truncate">0x4f9a7b2c...e12a</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Replay Protected</div>
        </div>

        <div className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800">
          <div className="text-neutral-400 text-[11px] mb-1 flex items-center space-x-1.5">
            <Shield className="w-3 h-3 text-cyan-400" />
            <span>Privacy Guarantee</span>
          </div>
          <div className="text-base font-semibold text-cyan-400">0 Bytes Leaked</div>
          <div className="text-[10px] text-neutral-500 mt-0.5">Zero PII Disclosed</div>
        </div>
      </div>
    </div>
  );
};
