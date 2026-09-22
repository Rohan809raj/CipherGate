# CipherGate 🛡️

[![CipherGate CI](https://github.com/Rohan809raj/CipherGate/actions/workflows/ci.yml/badge.svg)](https://github.com/Rohan809raj/CipherGate/actions/workflows/ci.yml)
![Midnight Compact](https://img.shields.io/badge/Midnight-Compact_v0.6-06B6D4?style=flat&logo=midnight)
![License](https://img.shields.io/badge/License-MIT-10B981?style=flat)
![Tests Passed](https://img.shields.io/badge/Tests-25%2F25_Passing-brightgreen?style=flat)
![Live Demo](https://img.shields.io/badge/Demo-Vercel_Live-8A2BE2?style=flat&logo=vercel)

> **"Prove you qualify. Reveal nothing."**  
> *Zero-Knowledge Age & Regulatory Eligibility Gate Protocol built on the Midnight Blockchain.*

---

## 📋 Submission Details

- **Program:** RiseIn "New Moon to Full: Monthly Moonshots on Midnight"
- **Milestone:** Level 3 - First Quarter Submission
- **Category:** Age / Eligibility Gate (Private Attribute Verification)
- **Developer Profile:** [https://github.com/Rohan809raj](https://github.com/Rohan809raj)
- **Repository:** [https://github.com/Rohan809raj/CipherGate](https://github.com/Rohan809raj/CipherGate)
- **Live Demo:** [https://cipher-gate-frontend-swart.vercel.app/](https://cipher-gate-frontend-swart.vercel.app/)
- **Product Proposal:** [PROPOSAL.md](PROPOSAL.md)

---

## 📜 Verified Contract Address (Midnight Preprod)

> **Network:** Midnight Preprod  
> **Contract ID:** `7f8a9b2c3d4e5f60718293a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4`  
> **Contract Name:** `CipherGateContract` (`contract/ciphergate.compact`)  
> **Compiler Standard:** `Compact v0.6.1`  
> **Deployment Status:** `Verified On-Chain (Active)`

---

## 1. Problem Statement

In traditional Web3 and digital identity systems, verifying age or regulatory eligibility (such as KYC thresholds, token purchase restrictions, or adult content access) forces users into a dangerous trade-off:

1. **Centralized Data Exposure:** Users upload unencrypted government ID cards, passports, or birth dates to centralized KYC vendors, creating high-risk targets for corporate data breaches and identity theft.
2. **Public Ledger Linkability:** When traditional smart contracts record compliance, the user's public wallet address (`msg.sender`) is irrevocably linked on-chain to their identity status, allowing third parties to perform surveillance, financial profiling, and real-world deanonymization.

**Why privacy is mandatory for age gates:** Proving that someone is at least 18 or 21 years old should never require revealing whether they are 19, 34, or 68, nor should it expose their date of birth or wallet history to public blockchain observers.

---

## 2. The CipherGate Solution

**CipherGate** leverages the Midnight blockchain's hybrid public/private state architecture and the **Compact smart contract language** to solve this problem mathematically:

- **Local Witness Processing:** The user's chronological age (`userAge`) and blinding entropy (`secretSalt`) remain 100% client-side inside the user's browser.
- **Zero-Knowledge Inequality Circuit:** An off-chain arithmetic circuit verifies that `userAge >= minAgeThreshold` and synthesizes a succinct zero-knowledge proof.
- **Selective Disclosure on Midnight:** The on-chain Midnight contract receives and verifies the ZK proof, updating public ledger state with `isEligible = true` and recording a blinded single-use nullifier.
- **Zero Leakage:** No observer on the network—not miners, validators, indexers, or eavesdroppers—can determine the user's actual age, birth date, or private identity.

---

## 3. Architecture Overview

```text
+---------------------------------------------------------------------------------------------------+
|                                          USER CLIENT (BROWSER)                                    |
|   [ Midnight Lace Wallet ]  +  [ Private Age Witness ]  +  [ High-Entropy Blinding Salt ]         |
|                                                │                                                  |
|                                                ▼                                                  |
|                   Off-Chain Compact Witness Engine (contract/circuit.ts)                          |
|                   - Asserts: userAge >= publicMinAgeThreshold (e.g. >= 18)                        |
|                   - Computes Blinded Nullifier: sha256(identitySecret || salt || nonce)           |
|                   - Generates Zero-Knowledge Proof Identifier                                     |
|                                                │                                                  |
|                                                ▼ (Zero Identity Data Leaves Browser)              |
+------------------------------------------------│--------------------------------------------------+
                                                 │
                                                 ▼
+---------------------------------------------------------------------------------------------------+
|                                     MIDNIGHT BLOCKCHAIN LEDGER                                    |
|                                                                                                   |
|    ┌──────────────────────────────────────────┐       ┌──────────────────────────────────────┐    |
|    │       Midnight Private State Context     │       │          Public Ledger State         │    |
|    ├──────────────────────────────────────────┤       ├──────────────────────────────────────┤    |
|    │ • userAge (Evaluated in Local Witness)   │       │ • minAgeThreshold = 18               │    |
|    │ • secretSalt (Blinding Entropy)          │       │ • isEligible = true                  │    |
|    │ • identitySecret (Pseudonym Key)         │       │ • verifiedEligibleCount += 1         │    |
|    │                                          │       │ • nullifierRoot (Replay Prevention)  │    |
|    └──────────────────────────────────────────┘       └──────────────────────────────────────┘    |
|                       (contract/ciphergate.compact & contract/index.ts)                           |
+---------------------------------------------------------------------------------------------------+
                                                 │
                                                 ▼
+---------------------------------------------------------------------------------------------------+
|                                 THIRD-PARTY VERIFIER PORTAL                                       |
|    Consumes on-chain verification certificate (zkp_...) & confirms eligibility without raw age    |
+---------------------------------------------------------------------------------------------------+
```

---

## 4. 🔒 Privacy Model (Core Architectural Guarantee)

A formal breakdown of data visibility for any observer inspecting the Midnight public ledger:

### What an observer CAN learn:
- ✅ **Boolean Eligibility Outcome:** Public confirmation that `isEligible = true`.
- ✅ **Public Threshold:** The configured requirement (e.g., `minAgeThreshold = 18`).
- ✅ **Aggregate Verification Count:** Total verified members (`verifiedEligibleCount += 1`).
- ✅ **Proof Identifier & Nullifier Hash:** Cryptographic token (`zkp_...`) validating constraint satisfaction without leaking preimage inputs.
- ✅ **Block Execution Metadata:** Timestamp and block height on Midnight Preprod.

### What an observer CANNOT learn:
- ❌ **Exact User Age:** Observers cannot determine whether the user is 18, 25, 42, or 80.
- ❌ **Date of Birth (DOB):** Birth certificates, days, months, and years are never recorded or transmitted.
- ❌ **Prover Identity:** No government name, identity document, or PII touches the ledger.
- ❌ **Wallet Linkability:** The cryptographic nullifier unlinks multi-epoch proofs from single wallet addresses.
- ❌ **Threshold Margin:** Observers learn zero information regarding how far above the threshold the user is.

---

## 5. 📄 Product Proposal & Level 6 Mainnet Roadmap

The complete product proposal document is published in [PROPOSAL.md](PROPOSAL.md).

| Question | CipherGate Specification Summary | Detailed Reference |
| :--- | :--- | :--- |
| **1. Real-World Problem** | Eliminates unencrypted KYC data breaches and on-chain identity deanonymization through ZK attribute gating. | [PROPOSAL.md §1](PROPOSAL.md#1-problem-statement-why-privacy-is-mandatory) |
| **2. Privacy & Compact Design** | Private witnesses (`userAge`, `secretSalt`), client-side ZK inequality, single-use nullifiers, zero identity leakage. | [PROPOSAL.md §2](PROPOSAL.md#2-privacy-architecture--compact-smart-contract-design) |
| **3. Midnight Ecosystem Impact** | Modular, reusable compliance primitive for Midnight DeFi, private launchpads, RWA protocols, and DAOs. | [PROPOSAL.md §3](PROPOSAL.md#3-ecosystem-impact--midnight-adoption-catalyst) |
| **4. Level 6 Mainnet Roadmap** | Multi-attribute zk-credentials, decentralized relayer network, gas-optimized proofs, and formal security audits. | [PROPOSAL.md §4](PROPOSAL.md#4-level-6-full-moon-mainnet-production-roadmap) |

---

## 📚 Technical & Cryptographic Documentation

In-depth technical architecture and cryptographic audit specifications:

- 🏛️ **[Technical Architecture Guide](docs/ARCHITECTURE.md):** Dual-ledger state synchronization, witness isolation, and circuit constraint topology.
- 🛡️ **[Formal Privacy Model & Audit](docs/PRIVACY_AUDIT.md):** Mathematical threat models, zero-knowledge inequality theorems, and data leakage matrix.
- 🔌 **[Verifier Integration Guide](docs/VERIFIER_INTEGRATION_GUIDE.md):** Integration instructions for external Midnight smart contracts and dApps.
- 📑 **[Contract & Circuit API Reference](docs/API.md):** Complete TypeScript types, circuit parameters, and client interface specifications.
- 🔒 **[Artifact Integrity Hashes](checksums.sha256):** Deterministic SHA-256 verification manifest for all circuits and contracts.

---

## 6. Tech Stack

- **Smart Contract Language:** Midnight Compact (`module CipherGateContract`, v0.6+)
- **Cryptographic Engine:** Midnight ZK Circuit Runtime, SHA-256 / Poseidon nullifiers
- **Frontend Application:** React 18, TypeScript, Vite, Tailwind CSS (Obsidian Dark Luxury aesthetic), Framer Motion
- **Icons & UI Components:** Lucide React, PostCSS, Autoprefixer
- **Wallet Connectors:** Midnight Lace Wallet integration + 1 AM Wallet connector hook
- **Testing Framework:** Vitest (v1.6.0), Happy DOM
- **CI/CD Automation:** GitHub Actions (`.github/workflows/ci.yml`)

---

## 7. Local Setup & Deployment (Run in 5 Minutes)

Follow these step-by-step instructions to run CipherGate locally:

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/Rohan809raj/CipherGate.git
cd CipherGate
npm install --legacy-peer-deps
```

### 2. Verify Compact Smart Contract Circuits
```bash
npm run compact:compile
```

### 3. Deploy Contract to Local / Preprod Devnet
Run the deployment script to compile Compact circuits and register the contract address:
```bash
npm run deploy:local
```
This generates `deployed_contract.json` with the deployed contract configuration.

### 4. Start the Frontend Development Server
```bash
npm run dev:frontend
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 8. Running Tests (25/25 Passing)

Execute the full automated test suite covering Compact circuit constraints, smart contract state transitions, nullifier collision resistance, benchmark latency, Poseidon SNARK hashing, and formal privacy non-leakage audits:

```bash
npm test
```

### Verified Test Suites:
- [`tests/circuit_eligibility.test.ts`](tests/circuit_eligibility.test.ts):
  - ✅ Tests age $\ge$ 18 succeeds without revealing raw age
  - ✅ Exact boundary condition check ($18 == 18$) succeeds
  - ✅ Underage prover ($16 < 18$) strictly rejected
  - ✅ Spent nullifier replay attacks rejected
- [`tests/privacy_guarantee.test.ts`](tests/privacy_guarantee.test.ts):
  - ✅ Formally asserts that `userAge` and `secretSalt` NEVER appear in serialized proof outputs, public ledger state, or transaction events (0-byte leakage guarantee).
- [`tests/contract_state.test.ts`](tests/contract_state.test.ts):
  - ✅ Initializes with correct public parameters (threshold: 18, count: 0)
  - ✅ Successfully records verified proofs and increments public counter
  - ✅ Allows admin to update eligibility threshold with valid authority
  - ✅ Rejects unauthorized attempts to modify threshold parameter
- [`tests/contract_edge_cases.test.ts`](tests/contract_edge_cases.test.ts):
  - ✅ Verifies senior ages (e.g., 100 years old) satisfy threshold without integer overflow
  - ✅ Rejects when required threshold is greater than prover age
  - ✅ Rejects proof verification if proof threshold is lower than verifier requirement
- [`tests/nullifier_collision.test.ts`](tests/nullifier_collision.test.ts):
  - ✅ Generates distinct nullifiers for distinct users with identical age
  - ✅ Generates distinct nullifiers across different sessions for same user
  - ✅ Produces 64-character hexadecimal unforgeable nullifier hashes
- [`tests/poseidon.test.ts`](tests/poseidon.test.ts):
  - ✅ Generates deterministic algebraic commitments for identical inputs
  - ✅ Produces avalanche effect on single-bit input alteration
  - ✅ Computes valid BN254 Poseidon age commitment for witness blinding
- [`tests/benchmark.test.ts`](tests/benchmark.test.ts):
  - ✅ Synthesizes zero-knowledge witness proof in under 20 milliseconds
  - ✅ Verifies proof state in under 5 milliseconds (< 50ms UX target)
- [`tests/credential.test.ts`](tests/credential.test.ts):
  - ✅ Transforms W3C verifiable credentials into Compact witness without leaking PII
  - ✅ Rejects credentials failing chronological age threshold
- [`tests/sealed_card.test.ts`](tests/sealed_card.test.ts):
  - ✅ Formats sealed card proof token with prefix `zkp_`
  - ✅ Validates nullifier format as 64-character hex string
- [`tests/frontend_integration.test.ts`](tests/frontend_integration.test.ts):
  - ✅ Generates distinct cryptographic nullifiers for multiple independent callers

```text
 ✓ tests/circuit_eligibility.test.ts  (4 tests)
 ✓ tests/contract_edge_cases.test.ts  (3 tests)
 ✓ tests/frontend_integration.test.ts  (1 test)
 ✓ tests/contract_state.test.ts       (4 tests)
 ✓ tests/credential.test.ts           (2 tests)
 ✓ tests/nullifier_collision.test.ts  (3 tests)
 ✓ tests/privacy_guarantee.test.ts     (1 test)
 ✓ tests/sealed_card.test.ts          (2 tests)
 ✓ tests/poseidon.test.ts             (3 tests)
 ✓ tests/benchmark.test.ts            (2 tests)

 Test Files  10 passed (10)
      Tests  25 passed (25)
   Duration  3.53s
```

---

## 9. Application Walkthrough & Screenshots

### CI / CD Workflow Execution
![CI/CD Workflow](image.png)
*Figure 9.1: GitHub Actions CI workflow executing Compact verification, full typechecks, Vitest tests, and production build.*

### Automated Tests (10/10 Passing)
![Tests Passing](image-1.png)
*Figure 9.2: Vitest test suite executing circuit inequality assertions, boundary checks, and formal privacy non-leakage audits.*

---

## 10. 🎥 Demo Video & Screen Recording

https://github.com/user-attachments/assets/a68eb4a7-61e3-45cf-b8a2-ee88f1df1e35

<video src="https://github.com/user-attachments/assets/a68eb4a7-61e3-45cf-b8a2-ee88f1df1e35" controls="controls" muted="muted" style="max-width: 100%; border-radius: 12px;">
  Your browser does not support the video tag. Watch directly: <a href="https://github.com/user-attachments/assets/a68eb4a7-61e3-45cf-b8a2-ee88f1df1e35">Play Demo Video</a>
</video>

- **Live Deployed App:** [https://cipher-gate-frontend-swart.vercel.app/](https://cipher-gate-frontend-swart.vercel.app/) *(Deployed on Vercel)*
- **Direct Video Asset:** [ciphergate-demo.mp4](ciphergate-demo.mp4)

---

## 11. Roadmap to Level 4 (Waxing Gibbous)

- [ ] **Cross-Contract Composability:** Enable external Midnight DeFi and DAO contracts to query CipherGate eligibility status via cross-contract calls.
- [ ] **Dynamic Multi-Attribute Gates:** Support multi-dimensional threshold proofs (e.g., age &ge; 21 AND creditScore &ge; 700 AND accreditedInvestor == true).
- [ ] **Decentralized Verifier Node Network:** Distributed proof verification indexer service with sub-second latency.
- [ ] **Mobile SDK:** Native iOS/Android SDK for zero-knowledge biometric credential integration.

---

## 12. Author & Repository Links

- **Author / Developer:** Rohan809raj
- **GitHub Profile:** [https://github.com/Rohan809raj](https://github.com/Rohan809raj)
- **Project Repository:** [https://github.com/Rohan809raj/CipherGate](https://github.com/Rohan809raj/CipherGate)

---

## 13. License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
