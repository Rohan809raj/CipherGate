import { describe, it, expect } from 'vitest';
import { generateEligibilityProof, verifyEligibilityProof } from '../contract/circuit';

describe('Compact Contract Edge Cases & Boundary Suite', () => {
  it('should verify senior age (e.g. 100 years old) satisfies threshold without overflow', () => {
    const proof = generateEligibilityProof(100, 18, 'senior_ident', 'senior_salt', 'nonce_100');
    expect(proof.isValid).toBe(true);
    const verification = verifyEligibilityProof(proof, 18, new Set());
    expect(verification.verified).toBe(true);
  });

  it('should reject threshold when required threshold is greater than prover age', () => {
    expect(() => {
      generateEligibilityProof(20, 21, 'user_twenty', 'salt_20', 'nonce_21');
    }).toThrow('CipherGate: Age does not meet the minimum eligibility threshold');
  });

  it('should reject proof verification if proof threshold is lower than verifier requirement', () => {
    const proof = generateEligibilityProof(25, 18, 'user_twentyfive', 'salt_25', 'nonce_18');
    // Proof only attests to >= 18, but verifier requires >= 21
    const verification = verifyEligibilityProof(proof, 21, new Set());
    expect(verification.verified).toBe(false);
    expect(verification.reason).toBe('Proof threshold does not satisfy requirement');
  });
});
