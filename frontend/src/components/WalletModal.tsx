import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SupportedWalletType } from '../types';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWallet: (wallet: SupportedWalletType) => void;
  currentWalletName: string | null;
}

export function WalletModal({
  isOpen,
  onClose,
  onSelectWallet,
  currentWalletName,
}: WalletModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          className="relative w-full max-w-md rounded-2xl bg-[#0B0F1E] border border-cyan-500/30 p-6 shadow-2xl text-slate-100 z-10"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Shield size={20} />
              </div>
              <div>
                <h3 className="font-space font-bold text-lg text-white">Connect Midnight Wallet</h3>
                <p className="text-xs text-slate-400">Select wallet for zero-knowledge transactions</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {/* Midnight Lace Option */}
            <button
              onClick={() => {
                onSelectWallet('lace');
                onClose();
              }}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  L
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm text-white group-hover:text-cyan-300 transition">
                    Midnight Lace Wallet
                  </p>
                  <p className="text-xs text-slate-400">Official Midnight Preprod Extension</p>
                </div>
              </div>
              {currentWalletName === 'Midnight Lace Wallet' ? (
                <CheckCircle2 size={18} className="text-cyan-400" />
              ) : (
                <ArrowUpRight size={16} className="text-slate-500 group-hover:text-cyan-400 transition" />
              )}
            </button>

            {/* 1 AM Wallet Option */}
            <button
              onClick={() => {
                onSelectWallet('1am');
                onClose();
              }}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  1A
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm text-white group-hover:text-indigo-300 transition">
                    1 AM Wallet
                  </p>
                  <p className="text-xs text-slate-400">Midnight Native Developer &amp; Seed Wallet</p>
                </div>
              </div>
              {currentWalletName === '1 AM Wallet' ? (
                <CheckCircle2 size={18} className="text-indigo-400" />
              ) : (
                <ArrowUpRight size={16} className="text-slate-500 group-hover:text-indigo-400 transition" />
              )}
            </button>
          </div>

          <div className="mt-5 p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200/80 flex items-start gap-2">
            <span className="text-cyan-400 font-bold">Privacy Note:</span>
            <span>Connecting your wallet enables proof submission on Midnight, but your wallet address is never linked to your private age.</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
