# CipherGate Technical Architecture

CipherGate is a privacy-first identity verification protocol designed for the **Midnight blockchain**, using the **Compact smart contract language** to evaluate age and regulatory compliance without disclosing underlying personally identifiable information (PII).

---

## 1. Dual-Ledger Architecture

Midnight implements a dual-ledger state model comprising:
1. **Private State Context:** Client-isolated, zero-knowledge witness evaluations executed within local WebAssembly/native prover memory.
2. **Public Ledger State:** Globally consensus-verified state stored on Midnight validators.

```text
┌──────────────────────────────────────────────────────────┐
│                      CLIENT RUNTIME                      │
│                                                          │
│  [Private Witness: userAge]  [Private Salt: secretSalt]   │
│                             │                            │
│                             ▼                            │
│           Off-Chain Compact Inequality Circuit           │
│              assert(userAge >= threshold)                │
│                             │                            │
│                             ▼                            │
│             Synthesizes ZK Proof & Nullifier             │
└─────────────────────────────┬────────────────────────────┘
                              │ Shielded Transaction
                              ▼
┌──────────────────────────────────────────────────────────┐
│                  MIDNIGHT BLOCKCHAIN                     │
│                                                          │
│  • Public Contract: CipherGateContract                   │
│  • State Variables:                                      │
│    - minAgeThreshold: Uint<32> (e.g., 18)                │
│    - verifiedEligibleCount: Uint<64>                     │
│    - nullifierRoot: Bytes<32> (Replay Prevention)        │
│                                                          │
│  • Emitted Events:                                       │
│    - isEligible: true                                    │
│    - 0 bytes PII or chronological age disclosed          │
└──────────────────────────────────────────────────────────┘
```

---

## 2. Cryptographic Primitives

- **Inequality Circuit:** Arithmetic constraint asserting `userAge >= minAgeThreshold`.
- **Nullifier Generation:** `sha256(identitySecret || secretSalt || contextNonce)` or Poseidon algebraic commitment, ensuring each user can prove eligibility exactly once per verification epoch without revealing their identity.
- **Compact Contract:** Written in Midnight Compact v0.6+ with explicit separation of private `witness` declarations and public `ledger` transitions.
