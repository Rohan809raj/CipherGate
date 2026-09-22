# CipherGate Third-Party Verifier Integration Guide

External Midnight smart contracts, DeFi protocols, and decentralized governance platforms can query CipherGate directly to verify compliance without handling sensitive PII.

---

## 1. On-Chain Compact Contract Invocation

In your Midnight Compact contract, import CipherGate and invoke `proveEligibility`:

```compact
import CipherGateContract;

module MyCompliantDApp;

export circuit accessRestrictedFeature(contextNonce: Bytes<32>): Boolean {
  // Query CipherGate contract verification
  const isEligible: Boolean = CipherGateContract.proveEligibility(contextNonce);
  assert(isEligible, "Access denied: Eligibility threshold not verified");

  // Proceed with privileged action...
  return true;
}
```

---

## 2. Off-Chain JavaScript / TypeScript Client

```typescript
import { CipherGateContractClient } from '@ciphergate/contract';

const client = new CipherGateContractClient(18);

// Evaluate client witness and send proof to Midnight
const result = await client.proveAndVerifyEligibility(userAge, secretSalt, identitySecret);

if (result.isValid) {
  console.log('User verified on Midnight with proof ID:', result.proofHash);
}
```
