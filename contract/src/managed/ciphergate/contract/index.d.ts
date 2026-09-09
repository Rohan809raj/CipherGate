export interface CipherGateContractLedger {
  minAgeThreshold: number;
  verifiedEligibleCount: bigint;
  adminPublicKeyHash: string;
  nullifierRoot: string;
}

export declare class Contract {
  ledger: CipherGateContractLedger;
  constructor(ledger: CipherGateContractLedger);
  static defaultInitialLedger(): CipherGateContractLedger;
}
