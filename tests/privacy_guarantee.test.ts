import { describe, it, expect } from 'vitest';
import {
  evaluateAgeEligibilityCircuit,
  AgeWitness,
  EligibilityProofContext,
} from '../contract/circuit';
import { CipherGateContractClient } from '../contract/index';

describe('CipherGate Privacy Non-Leakage Formal Audit', () => {
  const secretSalt = 'b2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f67890a1';
  const identitySecret = 'aabbccddeeff00112233445566778899aabbccddeeff00112233445566778899';
  const privateRawAge = 28;

  it('PRIVACY AUDIT: Prover raw age NEVER leaks in proof output, public ledger, or event logs', async () => {
    const client = new CipherGateContractClient(18);

    const witness: AgeWitness = {
      userAge: privateRawAge,
      secretSalt,
      identitySecret,
    };

    const context: EligibilityProofContext = {
      contextNonce: 'context_privacy_eval_99',
      publicMinAgeThreshold: 18,
      spentNullifierRoot: '0'.repeat(64),
    };

    const circuitResult = evaluateAgeEligibilityCircuit(witness, context);
    expect(circuitResult.isValid).toBe(true);

    // 1. Check Circuit Output JSON
    const circuitSerialized = JSON.stringify(circuitResult);
    expect(circuitSerialized).not.toContain(`"userAge":${privateRawAge}`);
    expect(circuitSerialized).not.toContain(privateRawAge.toString());

    // 2. Check Contract Public State Update
    expect(circuitResult.publicStateUpdate.rawAgeDisclosed).toBe(false);
    expect(circuitResult.publicStateUpdate.userAddressExposed).toBe(false);

    // 3. Submit through Client to simulate Midnight ledger commitment
    const submissionResult = await client.proveAndVerifyEligibility(
      privateRawAge,
      secretSalt,
      identitySecret,
      'nonce_ledger_leak_check'
    );

    expect(submissionResult.isValid).toBe(true);

    // 4. Audit ledger state
    const ledgerState = client.getLedgerState();
    const ledgerSerialized = JSON.stringify(ledgerState);
    expect(ledgerSerialized).not.toContain(privateRawAge.toString());
    expect(ledgerState.minAgeThreshold).toBe(18); // only public threshold exists

    // 5. Audit all emitted event logs
    const history = client.getHistory();
    const historySerialized = JSON.stringify(history);
    expect(historySerialized).not.toContain(privateRawAge.toString());
    expect(historySerialized).not.toContain(identitySecret);
    expect(historySerialized).not.toContain(secretSalt);
  });
});
