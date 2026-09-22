/**
 * CipherGate - Midnight Smart Contract Client State Manager
 *
 * Manages interaction with the Midnight ledger state, proof submission,
 * local verification history, and privacy validation.
 */
import { VerificationProofResult } from './circuit';
export interface CipherGateLedgerState {
    minAgeThreshold: number;
    verifiedEligibleCount: number;
    adminPublicKeyHash: string;
    nullifierRoot: string;
    contractAddress: string;
    network: string;
}
export interface VerificationHistoryItem {
    id: string;
    timestamp: number;
    proofHash: string;
    nullifierHash: string;
    isEligible: boolean;
    minAgeThreshold: number;
    txHash: string;
    status: 'confirmed' | 'pending';
}
export declare class CipherGateContractClient {
    private ledgerState;
    private history;
    private compiledContract;
    constructor(initialThreshold?: number);
    getLedgerState(): CipherGateLedgerState;
    getHistory(): VerificationHistoryItem[];
    /**
     * Submit an age eligibility proof off-chain and commit to Midnight public ledger
     */
    proveAndVerifyEligibility(userAge: number, secretSalt: string, identitySecret: string, customNonce?: string): Promise<VerificationProofResult>;
    /**
     * Admin configuration update for threshold
     */
    updateThreshold(newThreshold: number, adminSecret: string): boolean;
}
export * from './circuit';
