export interface MidnightWalletState {
  isConnected: boolean;
  isConnecting: boolean;
  walletName: string | null;
  publicAddress: string | null;
  network: string;
  error: string | null;
}

export type SupportedWalletType = 'lace' | '1am';
