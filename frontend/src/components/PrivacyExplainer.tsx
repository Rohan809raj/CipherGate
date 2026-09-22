import React, { useState } from 'react';
import { ShieldCheck, EyeOff, Lock, FileCode, CheckCircle2, ArrowRight, X } from 'lucide-react';

interface PrivacyExplainerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyExplainer: React.FC<PrivacyExplainerProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'witness' | 'ledger' | 'verifier'>('witness');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-neutral-900/95 border border-neutral-800 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-violet-950/60 border border-violet-500/30 text-violet-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Dual-Ledger Privacy Explainer</h3>
              <p className="text-xs text-neutral-400">How Midnight protects your identity mathematically</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-6 bg-neutral-950/60 p-1.5 rounded-xl border border-neutral-800/80">
          <button
            onClick={() => setActiveTab('witness')}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition flex items-center justify-center space-x-1.5 ${
              activeTab === 'witness'
                ? 'bg-violet-600/30 text-violet-300 border border-violet-500/40 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>1. Private Client Witness</span>
          </button>
          <button
            onClick={() => setActiveTab('ledger')}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition flex items-center justify-center space-x-1.5 ${
              activeTab === 'ledger'
                ? 'bg-violet-600/30 text-violet-300 border border-violet-500/40 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>2. Midnight Public Ledger</span>
          </button>
          <button
            onClick={() => setActiveTab('verifier')}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition flex items-center justify-center space-x-1.5 ${
              activeTab === 'verifier'
                ? 'bg-violet-600/30 text-violet-300 border border-violet-500/40 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>3. Zero-Knowledge Verifier</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === 'witness' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-neutral-950/80 rounded-xl border border-neutral-800 text-xs text-neutral-300 leading-relaxed">
                <span className="font-semibold text-violet-400">Strictly Local Prover Memory:</span> When you verify your age, your actual chronological age (<code className="text-violet-300">userAge</code>) and blinding entropy (<code className="text-violet-300">secretSalt</code>) are executed exclusively inside your browser&apos;s WebAssembly / Compact runtime.
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-neutral-400 font-medium mb-1">Off-Chain Arithmetic</div>
                  <div className="text-neutral-300 font-mono text-[11px]">assert(userAge &gt;= 18)</div>
                  <div className="text-[10px] text-emerald-400 mt-1">✓ Constraint validated locally</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-neutral-400 font-medium mb-1">Blinded Nullifier</div>
                  <div className="text-neutral-300 font-mono text-[11px]">sha256(secret + salt + nonce)</div>
                  <div className="text-[10px] text-emerald-400 mt-1">✓ Single-use anti-replay token</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ledger' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-neutral-950/80 rounded-xl border border-neutral-800 text-xs text-neutral-300 leading-relaxed">
                <span className="font-semibold text-violet-400">Transparent State & Replay Protection:</span> The Midnight blockchain records only the public verification outcome without any personal identifiable data.
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between p-2.5 bg-neutral-950 rounded-lg border border-neutral-800">
                  <span className="text-neutral-400">minAgeThreshold</span>
                  <span className="text-violet-300 font-semibold">18 (Public Uint&lt;32&gt;)</span>
                </div>
                <div className="flex justify-between p-2.5 bg-neutral-950 rounded-lg border border-neutral-800">
                  <span className="text-neutral-400">isEligible</span>
                  <span className="text-emerald-400 font-semibold">true (Boolean Assertion)</span>
                </div>
                <div className="flex justify-between p-2.5 bg-neutral-950 rounded-lg border border-neutral-800">
                  <span className="text-neutral-400">nullifierRoot</span>
                  <span className="text-neutral-300 truncate max-w-[220px]">0x7f8a9b...e8f9a0b1</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'verifier' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-neutral-950/80 rounded-xl border border-neutral-800 text-xs text-neutral-300 leading-relaxed">
                <span className="font-semibold text-violet-400">Third-Party Trust Without Exposure:</span> Any external dApp or compliance officer can query the on-chain contract to verify that the caller meets the eligibility threshold without ever discovering the user&apos;s birthdate or wallet history.
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
                <div className="flex items-center space-x-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Zero-Knowledge Guarantee Confirmed</span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  Total data leaked to on-chain observers: <strong className="text-emerald-400">0 bytes</strong> of private identity or numerical age.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition shadow-lg shadow-violet-600/20 flex items-center space-x-1.5"
          >
            <span>Understood</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
