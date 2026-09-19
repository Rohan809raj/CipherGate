import React, { useState } from 'react';
import { Award, CheckCircle2, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { CipherGateLedgerState } from '../../contract/index';

interface VerifierPortalProps {
  ledgerState: CipherGateLedgerState;
  lastProofHash?: string;
  lastNullifier?: string;
}

export function VerifierPortal({ ledgerState, lastProofHash, lastNullifier }: VerifierPortalProps) {
  const [copied, setCopied] = useState(false);

  const proofId = lastProofHash || 'zkp_7f8a9b2c3d4e5f60718293a4b5c6d7e8';
  const nullifier = lastNullifier || 'a1b2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f67890';

  const handleCopy = () => {
    navigator.clipboard.writeText(proofId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl bg-[#0B0F1E] border border-slate-800 p-6 md:p-8 shadow-2xl space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-medium text-purple-400 mb-2">
            <Award size={14} />
            <span>Public Proof Verifier Certificate</span>
          </div>
          <h3 className="font-space font-bold text-2xl text-white">Third-Party Verification Portal</h3>
          <p className="text-sm text-slate-400 mt-1">
            Any dApp, compliance officer, or external smart contract can inspect the verified qualification proof.
          </p>
        </div>
      </div>

      {/* Verifier Badge Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-[#10172D] to-indigo-950/40 border border-indigo-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h4 className="font-bold text-base text-white">Zero-Knowledge Eligibility Attestation</h4>
              <p className="text-xs text-emerald-400 font-medium">Valid on Midnight Preprod Ledger</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold self-start sm:self-center">
            isEligible = true
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block font-mono text-[10px]">PROOF IDENTIFIER</span>
            <div className="flex items-center gap-2 mt-1 bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-slate-200">
              <span className="truncate">{proofId}</span>
              <button onClick={handleCopy} className="text-slate-400 hover:text-white shrink-0">
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          <div>
            <span className="text-slate-400 block font-mono text-[10px]">SPENT NULLIFIER HASH</span>
            <div className="mt-1 bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-slate-200 truncate">
              {nullifier}
            </div>
          </div>

          <div>
            <span className="text-slate-400 block font-mono text-[10px]">VERIFIED CONSTRAINT</span>
            <div className="mt-1 bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-slate-200">
              age &ge; {ledgerState.minAgeThreshold} years
            </div>
          </div>

          <div>
            <span className="text-slate-400 block font-mono text-[10px]">MIDNIGHT CONTRACT</span>
            <div className="mt-1 bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-slate-200 truncate">
              {ledgerState.contractAddress}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
