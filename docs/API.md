# CipherGate Smart Contract & Circuit API Reference

Complete programmatic reference for the `@ciphergate/contract` package and Midnight Compact bindings.

---

## Classes

### `CipherGateContractClient`
High-level client for executing local witness preparation, zero-knowledge inequality circuit constraints, and on-chain contract state verification.

```typescript
const client = new CipherGateContractClient(minAgeThreshold?: number);
```

#### Methods
- `proveAndVerifyEligibility(age: number, salt: string, secret: string, contextNonce?: string): Promise<VerificationProofResult>`
  - Evaluates local witness.
  - Generates single-use blinded nullifier.
  - Updates public ledger counter upon successful verification.
- `updateThreshold(newThreshold: number, adminSecret: string): Promise<boolean>`
  - Updates the on-chain age threshold if called by authorized admin.
- `getPublicLedgerState(): Promise<PublicLedgerState>`
  - Returns current on-chain state (`minAgeThreshold`, `verifiedEligibleCount`, `nullifierRoot`).

---

## Circuit Helper Functions

### `evaluateAgeEligibilityCircuit(witness: AgeWitness, context: EligibilityProofContext): VerificationProofResult`
Evaluates the off-chain Compact circuit constraints client-side.

### `computeNullifier(identitySecret: string, secretSalt: string, contextNonce: string): string`
Computes a 64-character SHA-256 or Poseidon nullifier preventing double-claim attacks.

### `poseidonHash2(left: number, right: number): string`
SNARK-optimized algebraic 2-to-1 hash function using BN254 scalar field constants.
