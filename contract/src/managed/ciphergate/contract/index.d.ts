export interface CipherGateContractLedger {
  minAgeThreshold: number;
  verifiedEligibleCount: bigint;
  adminPublicKeyHash: string;
  nullifierRoot: string;
}

export interface CompactCircuitWitness {
  userAge: number;
  secretSalt: string;
  identitySecret: string;
}

export declare class Contract {
  ledger: CipherGateContractLedger;
  constructor(ledger?: CipherGateContractLedger);
  static defaultInitialLedger(): CipherGateContractLedger;
  proveEligibility(contextNonce: string, witness: CompactCircuitWitness): boolean;
  updateAgeThreshold(newThreshold: number, adminSignatureWitness: string): void;
}
