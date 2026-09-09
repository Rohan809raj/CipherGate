export interface CipherGateContractLedger {
  minAgeThreshold: number;
  verifiedEligibleCount: bigint;
  adminPublicKeyHash: string;
  nullifierRoot: string;
}

export class Contract {
  constructor(public ledger: CipherGateContractLedger) {}

  static defaultInitialLedger(): CipherGateContractLedger {
    return {
      minAgeThreshold: 18,
      verifiedEligibleCount: 0n,
      adminPublicKeyHash: '0'.repeat(64),
      nullifierRoot: '0'.repeat(64),
    };
  }
}
