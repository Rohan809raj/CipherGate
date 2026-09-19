import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Cpu,
  Check,
  ExternalLink,
  Copy,
  Moon,
  Sun,
  Activity,
  ArrowRight,
  HelpCircle,
  FileCode2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useMidnightWallet } from './hooks/useMidnightWallet';
import { WalletModal } from './components/WalletModal';
import { ProofGenerator } from './components/ProofGenerator';
import { VaultGateVisual } from './components/VaultGateVisual';
import { PrivacyInspector } from './components/PrivacyInspector';
import { VerifierPortal } from './components/VerifierPortal';
import { CipherGateContractClient, VerificationProofResult } from '../contract/index';

const contractClient = new CipherGateContractClient(18);

export function App() {
  const { wallet, connectWallet, disconnectWallet } = useMidnightWallet();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'gate' | 'privacy' | 'verifier' | 'architecture'>('gate');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [copiedContract, setCopiedContract] = useState(false);

  const [ledgerState, setLedgerState] = useState(contractClient.getLedgerState());
  const [gateStatus, setGateStatus] = useState<'idle' | 'generating' | 'unlocked' | 'rejected'>('idle');
  const [lastProofResult, setLastProofResult] = useState<VerificationProofResult | null>(null);

  const explorerUrl = `https://preprod.midnightexplorer.com/contracts/${ledgerState.contractAddress}`;

  const handleCopyContract = () => {
    navigator.clipboard.writeText(ledgerState.contractAddress);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2000);
  };

  const handleExecuteProof = async (
    userAge: number,
    secretSalt: string,
    identitySecret: string
  ): Promise<VerificationProofResult> => {
    setGateStatus('generating');
    try {
      const result = await contractClient.proveAndVerifyEligibility(userAge, secretSalt, identitySecret);
      setLedgerState(contractClient.getLedgerState());
      setLastProofResult(result);
      setGateStatus(result.isValid ? 'unlocked' : 'rejected');
      return result;
    } catch (err) {
      setGateStatus('rejected');
      throw err;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#060811] text-slate-100' : 'bg-slate-50 text-slate-900'} flex flex-col justify-between transition-colors duration-300`}>
      
      {/* TOP HEADER */}
      <header className="max-w-7xl w-full mx-auto px-6 py-5 flex justify-between items-center border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-glow-cyan">
            <Lock size={22} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-space font-extrabold text-xl tracking-tight text-white">CipherGate</h1>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-400 font-semibold">
                v1.0 Compact
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Prove you qualify. Reveal nothing.</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
          <button
            onClick={() => setActiveTab('gate')}
            className={`transition ${activeTab === 'gate' ? 'text-cyan-400 font-bold' : 'hover:text-white'}`}
          >
            Age Gate Studio
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`transition ${activeTab === 'privacy' ? 'text-cyan-400 font-bold' : 'hover:text-white'}`}
          >
            Privacy Model
          </button>
          <button
            onClick={() => setActiveTab('verifier')}
            className={`transition ${activeTab === 'verifier' ? 'text-cyan-400 font-bold' : 'hover:text-white'}`}
          >
            Verifier Portal
          </button>
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1 text-slate-400"
          >
            <span>Explorer</span>
            <ExternalLink size={12} />
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Light/Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition"
            title="Toggle theme"
          >
            {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Wallet Connect */}
          {wallet.isConnected ? (
            <button
              onClick={disconnectWallet}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-400 text-xs font-medium flex items-center gap-2 hover:bg-slate-800 transition"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{wallet.walletName}</span>
              <span className="font-mono text-[10px] text-slate-400">
                ({wallet.publicAddress?.slice(0, 6)}...{wallet.publicAddress?.slice(-4)})
              </span>
            </button>
          ) : (
            <button
              onClick={() => setIsWalletModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold font-space transition shadow-glow-cyan flex items-center gap-2"
            >
              <span>Connect Wallet</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl w-full mx-auto px-6 py-8 space-y-8 flex-1">
        
        {/* HERO BANNER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-medium text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Midnight Network • Level 3 Submission</span>
            </div>

            <h2 className="font-space font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
              Prove you qualify. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Reveal nothing.
              </span>
            </h2>

            <p className="text-slate-300 text-base max-w-xl leading-relaxed">
              Verify your age or regulatory eligibility threshold on-chain with Compact zero-knowledge circuits. 
              The smart contract asserts <code className="text-cyan-300 font-mono text-xs">age &ge; threshold</code> off-chain and only records a boolean confirmation on Midnight—no birth dates or raw numbers ever leave your device.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('gate')}
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-space text-sm transition shadow-glow-cyan flex items-center gap-2"
              >
                <span>Unlock Gate Now</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => setActiveTab('privacy')}
                className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-sm font-medium transition"
              >
                Inspect Privacy Model
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <VaultGateVisual status={gateStatus} threshold={ledgerState.minAgeThreshold} />
          </div>
        </div>

        {/* ON-CHAIN CONTRACT DETAILS STRIP */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 font-mono">
            <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
              Midnight Preprod
            </span>
            <span className="text-slate-400 hidden sm:inline">Contract:</span>
            <span className="font-bold text-slate-200">
              {ledgerState.contractAddress.slice(0, 10)}...{ledgerState.contractAddress.slice(-8)}
            </span>
            <button
              onClick={handleCopyContract}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
              title="Copy address"
            >
              {copiedContract ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            </button>
          </div>

          <div className="flex items-center gap-6 font-mono text-slate-400 text-[11px]">
            <div>
              <span>VERIFIED GATES: </span>
              <span className="text-white font-bold">{ledgerState.verifiedEligibleCount}</span>
            </div>
            <div>
              <span>CIRCUIT: </span>
              <span className="text-cyan-400 font-bold">Compact v0.6+</span>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex justify-center border-b border-slate-800 pb-2">
          <div className="inline-flex p-1 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs font-space font-semibold space-x-1">
            <button
              onClick={() => setActiveTab('gate')}
              className={`px-5 py-2.5 rounded-xl transition ${
                activeTab === 'gate' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Age Gate Prover
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-5 py-2.5 rounded-xl transition ${
                activeTab === 'privacy' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Privacy &amp; Selective Disclosure
            </button>
            <button
              onClick={() => setActiveTab('verifier')}
              className={`px-5 py-2.5 rounded-xl transition ${
                activeTab === 'verifier' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Verifier Certificate
            </button>
          </div>
        </div>

        {/* TAB VIEWS */}
        {activeTab === 'gate' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <ProofGenerator
                onGenerateProof={handleExecuteProof}
                defaultThreshold={ledgerState.minAgeThreshold}
                isWalletConnected={wallet.isConnected}
                onOpenWalletModal={() => setIsWalletModalOpen(true)}
                onProofCompleted={(res) => setLastProofResult(res)}
              />
            </div>
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-[#0B0F1E] border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-cyan-400 font-space font-bold text-sm">
                  <Activity size={18} />
                  <h4>Live Ledger State</h4>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Public Threshold:</span>
                    <span className="font-mono font-bold text-white">&ge; {ledgerState.minAgeThreshold} Years</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Total Verified Users:</span>
                    <span className="font-mono font-bold text-emerald-400">{ledgerState.verifiedEligibleCount}</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Network Consensus:</span>
                    <span className="font-mono text-cyan-300">Midnight Preprod</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-indigo-950/20 border border-indigo-500/30 space-y-3 text-xs text-slate-300">
                <h5 className="font-bold text-indigo-300 font-space text-sm">Selective Disclosure Rule</h5>
                <p>
                  In traditional Web3, age gates either require submitting unencrypted birth dates to a centralized verifier or storing raw data on public blockchains.
                </p>
                <p className="text-slate-400">
                  CipherGate enforces mathematical inequality inside a local zero-knowledge witness so that external parties cannot reconstruct your age.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && <PrivacyInspector />}

        {activeTab === 'verifier' && (
          <VerifierPortal
            ledgerState={ledgerState}
            lastProofHash={lastProofResult?.proofHash}
            lastNullifier={lastProofResult?.nullifierHash}
          />
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 max-w-7xl w-full mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-[10px]">
            CG
          </div>
          <span className="font-space font-bold text-slate-300">CipherGate</span>
          <span>• Midnight Compact Zero-Knowledge Protocol</span>
        </div>

        <div className="flex items-center gap-4 font-mono text-[11px]">
          <a
            href="https://github.com/Rohan809raj/CipherGate"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition"
          >
            GitHub: Rohan809raj/CipherGate
          </a>
          <span>•</span>
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition"
          >
            Preprod Explorer
          </a>
        </div>
      </footer>

      {/* Multi-Wallet Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onSelectWallet={(type) => connectWallet(type)}
        currentWalletName={wallet.walletName}
      />
    </div>
  );
}

export default App;
