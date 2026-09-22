# CipherGate: Product Proposal

## 1. What is the problem?
In contemporary Web2 and Web3 ecosystems, access to financial instruments, decentralized lending, adult content, regulated token sales, and compliant gaming requires individuals to prove their chronological age or regulatory qualification (e.g., minimum age 18 or 21, accredited investor status). 

However, existing verification architectures impose catastrophic privacy violations:
1. **Centralized Identity Leakage:** Users upload unencrypted government ID cards, passports, or exact birth dates to centralized verification databases, which routinely suffer credential breaches and surveillance extraction.
2. **Public Blockchain Correlation:** When users verify eligibility using traditional public smart contracts (e.g., Ethereum or Solana), their public address (`msg.sender`) is irrevocably linked to verification transactions, allowing hostile observers to perform longitudinal profiling, balance correlation, and deanonymization.

## 2. What is the solution?
**CipherGate** solves this fundamental flaw by providing an airtight, zero-knowledge Age and Eligibility Gate Protocol built natively on the Midnight blockchain. 

Using Midnight's Compact smart contract language, CipherGate shifts credential evaluation completely to the user's local browser witness. The user enters their private chronological age and cryptographic salt locally; an off-chain circuit evaluates the arithmetic inequality constraint (`userAge >= minAgeThreshold`) and derives a single-use blinded nullifier. 

The smart contract receives only the succinct zero-knowledge proof, recording a public boolean `isEligible = true` and updating the spent nullifier root to prevent replay attacks. At no point in the lifecycle is the user's exact age, birth year, or private identity transmitted over the wire or committed to on-chain state.

## 3. Why is Midnight's privacy model essential for this solution?
Standard public blockchain networks enforce total ledger transparency, meaning all transaction parameters and state variables are universally inspectable. Even if an off-chain zero-knowledge proof is verified on an EVM chain, the transaction submitter address is permanently exposed on the public block, revealing *when* and *from which address* a specific threshold qualification was executed.

Midnight's unique dual-state execution paradigm makes CipherGate uniquely possible:
- **Private Witness Boundary:** Private inputs (`userAge`, `secretSalt`, `identitySecret`) live exclusively within the client's local witness context and never cross the transaction boundary.
- **Selective Disclosure:** Midnight enables contracts to emit public verification booleans (`isEligible = true`) while maintaining cryptographic blinding of the underlying attributes.
- **Unlinkability via Blinded Nullifiers:** Observers see that a valid member verified their qualification, but cannot determine which user verified or link multiple verification sessions back to a single identity.

## 4. How do you plan to use Midnight's features to solve the problem and ship to Mainnet by Level 6?
We leverage Midnight's core stack across our developmental milestones:
- **Compact Zero-Knowledge Language:** Core inequality circuits and admin parameter configurations are codified in Compact (`ciphergate.compact`), compiling down to native Midnight circuit constraint definitions (`ciphergate.circ`).
- **Midnight DApp Connector & Lace Integration:** Seamless cryptographic handshake connecting user browser extensions directly to Midnight network providers without intermediate centralized relays.
- **Level 4 & 5 Preprod / Indexer Hardening:** Deploying a high-throughput transaction indexer and verification attestation registry across Midnight Preprod.
- **Level 6 Mainnet Production Feasibility:**
  1. **Cross-Contract Interoperability:** Exporting standard Compact verifier interfaces enabling third-party Midnight dApps (DEXs, DAOs, RWA vaults) to consume CipherGate qualification proofs in a single transaction call.
  2. **Multi-Attribute Threshold Gates:** Extending the Compact witness logic to support composite multi-dimensional qualifications (e.g., `age >= 21 AND creditScore >= 750 AND regionCode != sanctioned`).
  3. **Formal Security & Circuit Audits:** Completing zero-knowledge constraint soundness verification to guarantee no under-constrained edge cases exist prior to Mainnet genesis launch.
