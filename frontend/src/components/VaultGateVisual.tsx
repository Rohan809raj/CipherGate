import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, ShieldCheck, ShieldAlert, Sparkles, Check } from 'lucide-react';

interface VaultGateVisualProps {
  status: 'idle' | 'generating' | 'unlocked' | 'rejected';
  threshold: number;
}

export function VaultGateVisual({ status, threshold }: VaultGateVisualProps) {
  const isUnlocked = status === 'unlocked';
  const isRejected = status === 'rejected';
  const isGenerating = status === 'generating';

  return (
    <div className="relative w-full aspect-square max-w-[420px] mx-auto rounded-[2.5rem] bg-gradient-to-br from-[#0B0F1E] via-[#10172D] to-[#161F3B] p-6 border border-slate-800/80 shadow-2xl flex flex-col items-center justify-between overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          isUnlocked
            ? 'bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.2),transparent_70%)]'
            : isRejected
            ? 'bg-[radial-gradient(circle_at_50%_40%,rgba(244,63,94,0.2),transparent_70%)]'
            : 'bg-[radial-gradient(circle_at_50%_40%,rgba(6,182,212,0.15),transparent_70%)]'
        }`}
      />

      {/* Top Status Badge */}
      <div className="relative z-10 w-full flex justify-between items-center">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] font-mono text-slate-300">
          <span
            className={`w-2 h-2 rounded-full ${
              isUnlocked
                ? 'bg-emerald-400 animate-pulse'
                : isRejected
                ? 'bg-rose-500'
                : isGenerating
                ? 'bg-cyan-400 animate-ping'
                : 'bg-indigo-400'
            }`}
          />
          <span>GATE REQUIREMENT: AGE &ge; {threshold}</span>
        </div>

        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
          {isUnlocked ? 'ACCESS GRANTED' : isRejected ? 'GATE LOCKED' : 'ARMED'}
        </div>
      </div>

      {/* Main Central Vault Gate Animation */}
      <div className="relative z-10 my-auto flex flex-col items-center">
        {/* Outer Orbit Rings */}
        <motion.div
          animate={{
            rotate: isGenerating ? 360 : isUnlocked ? 0 : 45,
            scale: isUnlocked ? [1, 1.05, 1] : 1,
          }}
          transition={{
            rotate: { duration: isGenerating ? 3 : 0.8, repeat: isGenerating ? Infinity : 0, ease: 'linear' },
            scale: { duration: 0.6 },
          }}
          className={`relative w-44 h-44 rounded-full border-2 border-dashed flex items-center justify-center transition-colors duration-500 ${
            isUnlocked
              ? 'border-emerald-400/60 shadow-[0_0_50px_rgba(16,185,129,0.3)]'
              : isRejected
              ? 'border-rose-500/60 shadow-[0_0_50px_rgba(244,63,94,0.3)]'
              : 'border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.15)]'
          }`}
        >
          {/* Inner Vault Core */}
          <motion.div
            initial={false}
            animate={{
              scale: isUnlocked ? 1.08 : 1,
              backgroundColor: isUnlocked ? '#064E3B' : isRejected ? '#4C0519' : '#0B0F1E',
            }}
            className="w-32 h-32 rounded-full border border-slate-700/80 flex flex-col items-center justify-center shadow-inner relative"
          >
            {isUnlocked ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
              >
                <Unlock size={44} className="text-emerald-300 drop-shadow-md" />
              </motion.div>
            ) : isRejected ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
              >
                <ShieldAlert size={44} className="text-rose-400 drop-shadow-md" />
              </motion.div>
            ) : (
              <Lock size={44} className="text-cyan-300 drop-shadow-md" />
            )}

            <div className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-[9px] font-mono text-slate-300">
              {isUnlocked ? 'UNLOCKED' : isRejected ? 'DENIED' : 'ZK SHIELDED'}
            </div>
          </motion.div>
        </motion.div>

        {/* Dynamic Title Under Gate */}
        <div className="text-center mt-5">
          <h4 className="font-space font-bold text-lg text-white">
            {isUnlocked
              ? 'Zero-Knowledge Gate Opened'
              : isRejected
              ? 'Eligibility Constraint Failed'
              : isGenerating
              ? 'Evaluating Witness Circuit...'
              : 'CipherGate Cryptographic Portal'}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            {isUnlocked
              ? 'Boolean eligibility verified without exposing birth date or age.'
              : isRejected
              ? 'Prover age does not satisfy threshold or nullifier is spent.'
              : 'Prove you qualify. Reveal nothing.'}
          </p>
        </div>
      </div>

      {/* Bottom Floating Info Pill */}
      <div className="relative z-10 w-full p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400">
          <Sparkles size={14} className="text-cyan-400" />
          <span>ON-CHAIN PRIVACY:</span>
        </div>
        <span className="text-emerald-400 font-bold">0 BYTES AGE EXPOSED</span>
      </div>
    </div>
  );
}
