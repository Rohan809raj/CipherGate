import { describe, it, expect } from 'vitest';
import {
  evaluateAgeEligibilityCircuit,
  computeNullifier,
  AgeWitness,
  EligibilityProofContext,
} from '../contract/circuit';

describe('CipherGate Compact Circuit Tests: Age & Eligibility Verification', () => {
  const secretSalt = 'a1b2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f67890';
  const identitySecret = '99887766554433221100aabbccddeeff99887766554433221100aabbccddeeff';
  const contextNonce = 'nonce_2026_testnet_epoch_01';
  const minAgeThreshold = 18;

  it('(1) Circuit PASSES when private userAge is strictly greater than threshold (e.g., 25 >= 18)', () => {
    const witness: AgeWitness = {
      userAge: 25,
      secretSalt,
      identitySecret,
    };

    const context: EligibilityProofContext = {
      contextNonce,
      publicMinAgeThreshold: minAgeThreshold,
      spentNullifierRoot: '0'.repeat(64),
    };

    const result = evaluateAgeEligibilityCircuit(witness, context);

    expect(result.isValid).toBe(true);
    expect(result.publicStateUpdate.isEligible).toBe(true);
    expect(result.publicStateUpdate.thresholdMet).toBe(true);
    expect(result.publicStateUpdate.rawAgeDisclosed).toBe(false);
    expect(result.proofHash.startsWith('zkp_')).toBe(true);
    expect(result.nullifierHash).toBeDefined();
    expect(result.nullifierHash.length).toBe(64);
  });

  it('(2) Circuit PASSES on exact threshold boundary condition (e.g., 18 >= 18)', () => {
    const witness: AgeWitness = {
      userAge: 18,
      secretSalt,
      identitySecret,
    };

    const context: EligibilityProofContext = {
      contextNonce,
      publicMinAgeThreshold: minAgeThreshold,
      spentNullifierRoot: '0'.repeat(64),
    };

    const result = evaluateAgeEligibilityCircuit(witness, context);

    expect(result.isValid).toBe(true);
    expect(result.publicStateUpdate.isEligible).toBe(true);
  });

  it('(3) Circuit REJECTS proof when private userAge is below required threshold (e.g., 16 < 18)', () => {
    const witness: AgeWitness = {
      userAge: 16,
      secretSalt,
      identitySecret,
    };

    const context: EligibilityProofContext = {
      contextNonce,
      publicMinAgeThreshold: minAgeThreshold,
      spentNullifierRoot: '0'.repeat(64),
    };

    const result = evaluateAgeEligibilityCircuit(witness, context);

    expect(result.isValid).toBe(false);
    expect(result.publicStateUpdate.isEligible).toBe(false);
    expect(result.publicStateUpdate.thresholdMet).toBe(false);
    expect(result.error).toContain('does not meet requirement');
  });

  it('(4) Circuit REJECTS proof if nullifier has already been spent in ledger state', () => {
    const witness: AgeWitness = {
      userAge: 22,
      secretSalt,
      identitySecret,
    };

    const nullifier = computeNullifier(identitySecret, secretSalt, contextNonce);

    const context: EligibilityProofContext = {
      contextNonce,
      publicMinAgeThreshold: minAgeThreshold,
      spentNullifierRoot: nullifier, // already spent!
    };

    const result = evaluateAgeEligibilityCircuit(witness, context);

    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Nullifier has already been spent');
  });
});
