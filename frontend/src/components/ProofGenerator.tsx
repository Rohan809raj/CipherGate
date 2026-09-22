import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Cpu, Check, AlertCircle, ArrowRight, RefreshCw, KeyRound } from 'lucide-react';
import { VerificationProofResult } from '@contract';

interface ProofGeneratorProps {
  onGenerateProof: (
    userAge: number,
    secretSalt: string,
    identitySecret: string
  ) => Promise<VerificationProofResult>;
  defaultThreshold: number;
  isWalletConnected: boolean;
  onOpenWalletModal: () => void;
  onProofCompleted: (result: VerificationProofResult) => void;
}

export function ProofGenerator({
  onGenerateProof,
  defaultThreshold,
  isWalletConnected,
  onOpenWalletModal,
  onProofCompleted,
}: ProofGeneratorProps) {
  const [ageInput, setAgeInput] = useState<number>(21);
  const [secretSalt, setSecretSalt] = useState<string>(
    'e7c2a19b88234190cba7192834019283e7c2a19b88234190cba7192834019283'
  );
  const [identitySecret, setIdentitySecret] = useState<string>(
    '3399aaee117755bb228800ff4466ccdd3399aaee117755bb228800ff4466ccdd'
  );

  const [activeStep, setActiveStep] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<VerificationProofResult | null>(null);

  const pipelineSteps = [
    { name: 'Private Witness Extraction', desc: 'Read private age & salt into local client memory' },
    { name: 'Zero-Knowledge Arithmetic', desc: `Assert age >= ${defaultThreshold} inside Compact constraint system` },
    { name: 'Nullifier Commitment', desc: 'Derive single-use blinded nullifier to prevent replay' },
    { name: 'Midnight Proof Synthesis', desc: 'Synthesize zkp constraint satisfaction token' },
    { name: 'On-Chain Settlement', desc: 'Publish boolean eligibility = true to Midnight Preprod' },
  ];

  const handleRunProofPipeline = async () => {
    if (!isWalletConnected) {
      onOpenWalletModal();
      return;
    }

    setIsProcessing(true);
    setActiveStep(1);

    // Realistic progressive witness compilation stages
    for (let i = 1; i <= 4; i++) {
      setActiveStep(i);
      await new Promise((r) => setTimeout(r, 450));
    }

    try {
      const result = await onGenerateProof(ageInput, secretSalt, identitySecret);
      setActiveStep(5);
      setLastResult(result);
      onProofCompleted(result);
    } catch (err) {
      console.error('Proof pipeline failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const regenerateEntropy = () => {
    const chars = '0123456789abcdef';
    let newSalt = '';
    let newSecret = '';
    for (let i = 0; i < 64; i++) {
      newSalt += chars[Math.floor(Math.random() * chars.length)];
      newSecret += chars[Math.floor(Math.random() * chars.length)];
    }
    setSecretSalt(newSalt);
    setIdentitySecret(newSecret);
  };

  return (
    <div className="rounded-3xl bg-[#0B0F1E] border border-slate-800 p-6 md:p-8 shadow-2xl space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-medium text-cyan-400 mb-2">
            <Cpu size={14} />
            <span>Off-Chain Compact Witness Engine</span>
          </div>
          <h3 className="font-space font-bold text-2xl text-white">Generate Eligibility Proof</h3>
          <p className="text-sm text-slate-400 mt-1">
            Input your actual age below. It stays strictly inside your browser and is never sent to any server.
          </p>
        </div>

        <button
          onClick={regenerateEntropy}
          title="Regenerate Private Salt & Pseudonym"
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition flex items-center gap-1 text-xs"
        >
          <RefreshCw size={14} />
          <span className="hidden sm:inline">New Salt</span>
        </button>
      </div>

      {/* Inputs Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Private Age Input */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <label className="font-semibold text-slate-300 flex items-center gap-1.5">
              <KeyRound size={14} className="text-indigo-400" />
              <span>Private Age (Witness)</span>
            </label>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold">
              LOCAL ONLY
            </span>
          </div>
          <input
            type="number"
            min={1}
            max={120}
            value={ageInput}
            onChange={(e) => setAgeInput(parseInt(e.target.value || '0', 10))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-2xl font-bold font-mono text-white focus:outline-none focus:border-cyan-500 transition"
          />
          <p className="text-[11px] text-slate-500">
            Current public threshold: <span className="font-bold text-slate-300">&ge; {defaultThreshold} years</span>
          </p>
        </div>

        {/* Private Blinding Salt */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <label className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Shield size={14} className="text-cyan-400" />
              <span>Private Salt Entropy</span>
            </label>
            <span className="text-slate-500 font-mono text-[10px]">32 BYTES</span>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 font-mono text-xs text-slate-400 truncate">
            {secretSalt}
          </div>
          <p className="text-[11px] text-slate-500">
            Blinds the nullifier calculation to preserve unlinkability between claims.
          </p>
        </div>
      </div>

      {/* 5-Stage Witness Pipeline Status */}
      <div className="space-y-2 pt-2">
        <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
          ZK WITNESS &amp; COMPILATION PIPELINE
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {pipelineSteps.map((step, idx) => {
            const stepNum = idx + 1;
            const isDone = activeStep > stepNum || (activeStep === 5 && !isProcessing);
            const isCurrent = activeStep === stepNum && isProcessing;

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-xs transition-all ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                    : isCurrent
                    ? 'bg-cyan-950/30 border-cyan-500/50 text-cyan-200'
                    : 'bg-slate-900/50 border-slate-800/80 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between font-semibold mb-0.5">
                  <span className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] opacity-70">0{stepNum}.</span>
                    <span>{step.name}</span>
                  </span>
                  {isDone ? (
                    <Check size={14} className="text-emerald-400" />
                  ) : isCurrent ? (
                    <div className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  ) : null}
                </div>
                <p className="text-[11px] opacity-70">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trigger Button */}
      <div className="pt-2">
        <button
          onClick={handleRunProofPipeline}
          disabled={isProcessing}
          className={`w-full py-4 rounded-2xl font-space font-bold text-base transition flex items-center justify-center gap-2 shadow-xl ${
            isProcessing
              ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:scale-[1.01] text-white shadow-cyan-500/25'
          }`}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Evaluating Compact Zero-Knowledge Circuit...</span>
            </>
          ) : !isWalletConnected ? (
            <>
              <span>Connect Wallet to Prove Qualification</span>
              <ArrowRight size={18} />
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>Synthesize &amp; Verify Proof on Midnight</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>

      {/* Inline Proof Execution Banner */}
      {lastResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl border ${
            lastResult.isValid
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {lastResult.isValid ? (
                <Check className="text-emerald-400" size={20} />
              ) : (
                <AlertCircle className="text-rose-400" size={20} />
              )}
              <div>
                <p className="font-bold text-sm">
                  {lastResult.isValid
                    ? 'Midnight Contract Verified: Eligibility Granted!'
                    : 'Verification Constraint Rejected'}
                </p>
                <p className="text-xs opacity-80 mt-0.5">
                  {lastResult.isValid
                    ? `Proof identifier: ${lastResult.proofHash} • Age remains completely private.`
                    : lastResult.error}
                </p>
              </div>
            </div>
            <div className="text-right font-mono text-xs hidden sm:block">
              <span className="text-slate-400 block text-[10px]">OUTPUT</span>
              <span className="font-bold">
                {lastResult.isValid ? 'isEligible = true' : 'isEligible = false'}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
