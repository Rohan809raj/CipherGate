/**
 * CipherGate - Zero-Knowledge Age & Eligibility Circuit & Proof Engine
 *
 * Implements client-side witness preparation, cryptographic nullifier generation,
 * and zero-knowledge inequality constraint evaluation corresponding to
 * `ciphergate.compact` on the Midnight blockchain.
 *
 * Privacy Guarantees:
 * - The witness `userAge` is processed strictly within client memory.
 * - Public state emits ONLY `isEligible: boolean` and the blinded `nullifierHash`.
 * - No observer or ledger verifier can derive the private numeric age.
 */
export interface AgeWitness {
    userAge: number;
    secretSalt: string;
    identitySecret: string;
}
export interface EligibilityProofContext {
    contextNonce: string;
    publicMinAgeThreshold: number;
    spentNullifierRoot: string;
}
export interface VerificationProofResult {
    isValid: boolean;
    publicStateUpdate: {
        isEligible: boolean;
        thresholdMet: boolean;
        rawAgeDisclosed: boolean;
        userAddressExposed: boolean;
    };
    nullifierHash: string;
    proofHash: string;
    error?: string;
}
export declare function computeSha256(data: string): string;
/**
 * Compute cryptographic single-use nullifier hash
 * Prevents double-claiming under the same context nonce
 */
export declare function computeNullifier(identitySecret: string, secretSalt: string, contextNonce: string): string;
/**
 * Evaluate off-chain Compact Circuit constraints for Age Eligibility
 *
 * Verifies:
 * 1. userAge >= publicMinAgeThreshold
 * 2. nullifier is valid and not previously spent
 */
export declare function evaluateAgeEligibilityCircuit(witness: AgeWitness, context: EligibilityProofContext): VerificationProofResult;
