import React from 'react';
import { ShieldCheck, Eye, EyeOff, Lock, FileKey, CheckCircle2, XCircle } from 'lucide-react';

export function PrivacyInspector() {
  const disclosureComparison = [
    {
      attribute: 'User Chronological Age',
      traditional: 'Publicly revealed (e.g. 24 yrs old)',
      ciphergate: 'Completely Hidden (0 bytes disclosed)',
      safe: true,
    },
    {
      attribute: 'Date of Birth (DOB)',
      traditional: 'Exposed to centralized KYC or contract',
      ciphergate: 'Never touches network / 100% Client-Side',
      safe: true,
    },
    {
      attribute: 'Wallet Address Linkability',
      traditional: 'Irrevocably bound to age transaction',
      ciphergate: 'Unlinked — evaluated via blinded nullifier',
      safe: true,
    },
    {
      attribute: 'Eligibility Outcome',
      traditional: 'Public boolean output',
      ciphergate: 'Public boolean (isEligible = true)',
      safe: true,
    },
    {
      attribute: 'Double Claim Prevention',
      traditional: 'Stored as plain user address in public map',
      ciphergate: 'Blind Nullifier Hash (Replay proof without identity)',
      safe: true,
    },
  ];

  return (
    <div className="rounded-3xl bg-[#0B0F1E] border border-slate-800 p-6 md:p-8 shadow-2xl space-y-6">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-400 mb-2">
          <ShieldCheck size={14} />
          <span>Midnight Blockchain Selective Disclosure Model</span>
        </div>
        <h3 className="font-space font-bold text-2xl text-white">How CipherGate Stays Private</h3>
        <p className="text-sm text-slate-400 mt-1">
          Zero-Knowledge Proofs (ZKPs) allow mathematical assertion of inequalities without transmitting underlying witness data.
        </p>
      </div>

      {/* Dual Column Privacy Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* What Observer CAN See */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Eye size={18} />
            <h4 className="font-semibold text-sm text-white">What an On-Chain Observer CAN Learn</h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Eligibility Outcome:</strong> Public boolean confirmation (isEligible = true).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Public Threshold:</strong> The requirement configured on contract (e.g. &ge; 18).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Proof Identifier &amp; Nullifier:</strong> Cryptographic verification hash (zkp_...).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Global Count:</strong> Aggregate total verified users (counter increments).</span>
            </li>
          </ul>
        </div>

        {/* What Observer CANNOT See */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/20 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <EyeOff size={18} />
            <h4 className="font-semibold text-sm text-white">What an On-Chain Observer CANNOT Learn</h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <XCircle size={15} className="text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>User Chronological Age:</strong> Absolutely never disclosed or stored.</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle size={15} className="text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Date of Birth / Personal Data:</strong> No birth certificates or raw data sent.</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle size={15} className="text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Threshold Margin:</strong> Observers cannot know if user is 18, 25, or 75.</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle size={15} className="text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Activity Correlation:</strong> Multi-epoch proofs produce distinct cryptographic nonces.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
            <tr>
              <th className="p-3">Attribute</th>
              <th className="p-3">Standard Web3 Verification</th>
              <th className="p-3 text-cyan-400">CipherGate (Midnight Compact)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
            {disclosureComparison.map((row, i) => (
              <tr key={i} className="hover:bg-slate-900/40 transition">
                <td className="p-3 font-medium text-white">{row.attribute}</td>
                <td className="p-3 text-slate-400 font-mono">{row.traditional}</td>
                <td className="p-3 text-emerald-400 font-mono font-medium">{row.ciphergate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
