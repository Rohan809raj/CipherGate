import React, { useState } from 'react';
import { Shield, Copy, Check, ExternalLink, Lock } from 'lucide-react';

interface SealedCardProps {
  proofId?: string;
  nullifier?: string;
  threshold?: number;
  timestamp?: string;
}

export const SealedCard: React.FC<SealedCardProps> = ({
  proofId = 'zkp_8a9b2c3d4e5f60718293a4b5c6d7e8f9',
  nullifier = '7f8a9b2c3d4e5f60718293a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4',
  threshold = 18,
  timestamp = 'Epoch 2026.09 (Active)'
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(proofId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-neutral-900/90 via-black to-neutral-950/90 border border-violet-500/20 hover:border-violet-500/40 transition-all duration-500 shadow-2xl backdrop-blur-xl">
      {/* Subtle iridescent glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-violet-600/20 transition duration-700" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-600/20 transition duration-700" />

      {/* Card Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-violet-300">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono tracking-widest text-violet-400">Sealed Credential</div>
            <h4 className="text-sm font-semibold text-white">Midnight Zero-Knowledge Certificate</h4>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
          <Lock className="w-3 h-3" />
          <span>Shielded</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="mt-5 space-y-3">
        <div className="p-3 rounded-2xl bg-black/50 border border-white/[0.04]">
          <div className="text-[11px] text-neutral-400 mb-1">Proof Identifier</div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-violet-300 truncate max-w-[280px]">{proofId}</span>
            <button
              onClick={handleCopy}
              className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition"
              title="Copy Proof Token"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-black/50 border border-white/[0.04]">
            <span className="text-[10px] text-neutral-400 block mb-0.5">Constraint Satisfied</span>
            <span className="text-white font-semibold">Age &ge; {threshold}</span>
            <span className="block text-[10px] text-emerald-400 mt-0.5">✓ 0-Byte Leakage</span>
          </div>

          <div className="p-3 rounded-2xl bg-black/50 border border-white/[0.04]">
            <span className="text-[10px] text-neutral-400 block mb-0.5">Epoch Validity</span>
            <span className="text-white font-semibold font-mono text-[11px]">{timestamp}</span>
            <span className="block text-[10px] text-violet-400 mt-0.5">Preprod Verified</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-black/50 border border-white/[0.04]">
          <div className="text-[10px] text-neutral-400 mb-0.5">Nullifier Hash (Anti-Replay)</div>
          <div className="font-mono text-[10px] text-neutral-300 truncate">{nullifier}</div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
        <span className="text-[11px] text-neutral-500 font-mono">Status: Immutable On-Chain</span>
        <a
          href={`https://explorer.midnight.network/contract/${nullifier.slice(0, 64)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-400 hover:text-violet-300 flex items-center space-x-1 text-[11px] font-medium transition"
        >
          <span>Explorer</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
