import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Check, ArrowRight, Lock, Unlock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useMidnightWallet } from './hooks/useMidnightWallet';
import { WalletModal } from './components/WalletModal';
import { PrivacyExplainer } from './components/PrivacyExplainer';
import { PublicStateViewer } from './components/PublicStateViewer';
import { SealedCard } from './components/SealedCard';
import { CipherGateContractClient, VerificationProofResult } from '@contract';

const contractClient = new CipherGateContractClient(18);

export default function CipherGatePremium() {
  const { wallet, connectWallet, disconnectWallet } = useMidnightWallet();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);
  const [age, setAge] = useState<number>(21);
  const [isProving, setIsProving] = useState(false);
  const [proofResult, setProofResult] = useState<VerificationProofResult | null>(null);
  const [activeTab, setActiveTab] = useState<'app' | 'how-it-works'>('app');

  const defaultSalt = 'e7c2a19b88234190cba7192834019283e7c2a19b88234190cba7192834019283';
  const defaultSecret = '3399aaee117755bb228800ff4466ccdd3399aaee117755bb228800ff4466ccdd';

  const handleProve = async () => {
    if (!wallet.isConnected) {
      setIsWalletModalOpen(true);
      return;
    }

    setIsProving(true);
    try {
      // Simulate Compact witness & proof calculation latency
      await new Promise((r) => setTimeout(r, 1500));
      const res = await contractClient.proveAndVerifyEligibility(Number(age), defaultSalt, defaultSecret);
      setProofResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white selection:bg-white/20 font-sans">
      {/* NAV - ultra clean */}
      <nav className="flex justify-between items-center px-6 sm:px-10 py-6 border-b border-white/[0.06] max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white text-black grid place-items-center font-black font-space">
            C
          </div>
          <span className="font-semibold tracking-tight text-lg">CipherGate</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/70 font-mono">
            v1.0
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsExplainerOpen(true)}
            className="text-xs text-white/70 hover:text-white transition flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10"
          >
            <Shield size={13} className="text-violet-400" />
            <span>Privacy Explainer</span>
          </button>

          <button
            onClick={() => setActiveTab(activeTab === 'app' ? 'how-it-works' : 'app')}
            className="text-xs text-white/50 hover:text-white transition hidden sm:inline"
          >
            {activeTab === 'app' ? 'How it works' : 'App'}
          </button>

          {wallet.isConnected ? (
            <button
              onClick={disconnectWallet}
              className="px-5 py-2 rounded-full bg-white/10 border border-white/15 text-xs font-semibold hover:bg-white/15 transition flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{wallet.walletName}</span>
              <span className="text-white/40 font-mono">
                ({wallet.publicAddress?.slice(0, 5)}...{wallet.publicAddress?.slice(-3)})
              </span>
            </button>
          ) : (
            <button
              onClick={() => setIsWalletModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition shadow-sm"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </nav>

      {/* VIEW: HOW IT WORKS EXPLAINER */}
      {activeTab === 'how-it-works' && (
        <section className="px-6 sm:px-10 py-16 max-w-5xl mx-auto space-y-12">
          <div>
            <p className="text-[11px] tracking-[0.2em] text-white/40 uppercase mb-3">Privacy Blueprint</p>
            <h2 className="text-4xl font-extrabold tracking-tight">How CipherGate Stays Private</h2>
            <p className="text-white/50 text-sm mt-2 max-w-xl">
              Zero-knowledge proof constraints evaluated on Midnight Compact guarantee that raw birth dates or ages never reach the blockchain.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-[24px] bg-white/[0.02] border border-white/[0.06] p-8 space-y-4">
              <div className="flex items-center gap-2 text-cyan-300">
                <Eye size={18} />
                <h3 className="font-semibold text-white">What Observers Learn</h3>
              </div>
              <ul className="space-y-3 text-xs text-white/60">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-300 font-bold">•</span>
                  <span>Boolean outcome: <code className="text-white">isEligible = true</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-300 font-bold">•</span>
                  <span>Configured threshold: <code className="text-white">Age ≥ 18</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-300 font-bold">•</span>
                  <span>Cryptographic nullifier to prevent double-claiming</span>
                </li>
              </ul>
            </div>

            <div className="rounded-[24px] bg-white/[0.02] border border-white/[0.06] p-8 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <EyeOff size={18} />
                <h3 className="font-semibold text-white">What Remains 100% Private</h3>
              </div>
              <ul className="space-y-3 text-xs text-white/60">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Your exact age (e.g. 19, 25, 45, or 72 is never revealed)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Date of birth or identity credentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Linkability between multiple verification attempts</span>
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('app')}
            className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs"
          >
            ← Back to Gate
          </button>
        </section>
      )}

      {/* VIEW: MAIN PRODUCT */}
      {activeTab === 'app' && (
        <>
          {/* HERO */}
          <section className="relative px-6 sm:px-10 py-16 md:py-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[11px] tracking-[0.2em] text-white/40 uppercase mb-6">
                Midnight Network • Level 3 Submission
              </p>
              <h1 className="text-6xl sm:text-7xl font-[800] leading-[0.9] tracking-tight">
                Prove you <br />
                <span className="text-white/20">qualify.</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                  Reveal nothing.
                </span>
              </h1>
              <p className="mt-6 text-[15px] leading-6 text-white/50 max-w-md">
                Verify your age on-chain with zero-knowledge. No birth date leaves your device. Only{' '}
                <span className="text-white/80 font-medium">true / false</span> is settled on Midnight.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#prover-section"
                  className="px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition shadow-md flex items-center gap-2"
                >
                  <span>Unlock Gate</span>
                  <ArrowRight size={15} />
                </a>
                <button
                  onClick={() => setActiveTab('how-it-works')}
                  className="px-7 py-3.5 rounded-full bg-white/[0.06] border border-white/[0.08] hover:bg-white/10 transition text-sm text-white/80"
                >
                  How it works
                </button>
              </div>
            </div>

            {/* PORTAL CARD - Premium */}
            <div className="relative rounded-[32px] bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.08] p-3 backdrop-blur-2xl shadow-2xl">
              <div className="rounded-[24px] bg-[#0A0A0F] p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/20" />
                <img
                  src="/hero-portal.jpg"
                  alt="CipherGate Obsidian Portal Ring"
                  className="w-full h-[320px] object-cover rounded-2xl opacity-90 transition-transform duration-700 hover:scale-105"
                />
                <div className="relative mt-8 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-white/40 tracking-wider uppercase font-mono">GATE REQUIREMENT</p>
                    <p className="text-2xl font-bold tracking-tight mt-0.5">Age ≥ 18</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono font-bold tracking-wide">
                      0 BYTES EXPOSED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PROVER - CLEAN */}
          <section id="prover-section" className="max-w-6xl mx-auto px-6 sm:px-10 pb-24">
            <div className="rounded-[28px] bg-white/[0.03] border border-white/[0.06] p-8 sm:p-12 shadow-2xl space-y-10">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-white/[0.06] pb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Generate Eligibility Proof</h2>
                  <p className="text-xs text-white/40 mt-1">Single-click zero-knowledge inequality constraint evaluation</p>
                </div>
                <span className="text-[11px] px-3 py-1 rounded-full bg-white/[0.06] text-white/60 font-mono self-start sm:self-auto">
                  LOCAL ONLY • Never leaves browser
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <label className="text-xs text-white/50 uppercase tracking-wider font-mono">Your Age</label>
                  <input
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="mt-3 w-full text-7xl font-black bg-transparent outline-none tracking-tighter"
                    type="number"
                    min={1}
                    max={120}
                  />
                  <div className="mt-6 h-[4px] w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-all duration-300"
                      style={{ width: `${Math.min(Number(age) * 3, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-white/30 mt-3">
                    Input your real age. It lives solely in local JavaScript memory as a private witness.
                  </p>
                </div>

                <div className="flex flex-col justify-between h-full space-y-8">
                  <p className="text-sm text-white/60 leading-relaxed">
                    Your age stays as a private witness inside your browser. We generate a ZK proof that{' '}
                    <span className="text-white font-semibold">age ≥ 18</span> without revealing the number to validators or observers.
                  </p>

                  <button
                    onClick={handleProve}
                    disabled={isProving}
                    className="w-full py-4 rounded-full bg-white text-black font-bold text-sm hover:scale-[1.02] active:scale-[0.99] transition disabled:opacity-60 shadow-lg flex items-center justify-center gap-2"
                  >
                    {isProving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Evaluating Compact Circuit...</span>
                      </>
                    ) : !wallet.isConnected ? (
                      <>
                        <span>Connect Wallet to Prove</span>
                        <ArrowRight size={15} />
                      </>
                    ) : (
                      <>
                        <span>Synthesize &amp; Verify Proof</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Proof Result Feedback */}
              {proofResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-2xl border ${
                    proofResult.isValid
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                      : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {proofResult.isValid ? (
                        <div className="w-9 h-9 rounded-full bg-emerald-400/10 flex items-center justify-center text-emerald-400">
                          <Unlock size={20} />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-rose-400/10 flex items-center justify-center text-rose-400">
                          <AlertCircle size={20} />
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-sm text-white">
                          {proofResult.isValid ? 'Gate Unlocked: Eligibility Verified' : 'Gate Locked: Constraint Failed'}
                        </p>
                        <p className="text-xs text-white/50 mt-0.5 font-mono">
                          {proofResult.isValid
                            ? `Proof Identifier: ${proofResult.proofHash} • Settled on Midnight`
                            : proofResult.error}
                        </p>
                      </div>
                    </div>

                    <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/10 text-white font-bold">
                      {proofResult.isValid ? 'isEligible = true' : 'isEligible = false'}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Holographic Sealed Proof Card */}
              {proofResult && proofResult.isValid && (
                <div className="mt-4">
                  <SealedCard
                    proofId={proofResult.proofHash}
                    nullifier={proofResult.nullifierHash}
                    threshold={18}
                  />
                </div>
              )}

              {/* Live Public State Viewer */}
              <PublicStateViewer minAgeThreshold={18} />
            </div>
          </section>
        </>
      )}

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] py-8 text-center text-xs text-white/40">
        <p>CipherGate • Midnight Compact Zero-Knowledge Protocol • Level 3 Submission</p>
      </footer>

      {/* Privacy Explainer Modal */}
      <PrivacyExplainer
        isOpen={isExplainerOpen}
        onClose={() => setIsExplainerOpen(false)}
      />

      {/* Wallet Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onSelectWallet={(w) => connectWallet(w)}
        currentWalletName={wallet.walletName}
      />
    </div>
  );
}
