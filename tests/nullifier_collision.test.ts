import { describe, it, expect } from 'vitest';
import { generateEligibilityProof } from '../contract/circuit';

describe('Cryptographic Nullifier Collision Resistance Suite', () => {
  it('should generate distinct nullifiers for distinct user identity secrets with same age', () => {
    const age = 22;
    const proofA = generateEligibilityProof(age, 18, 'secret_user_alpha', 'salt_alpha', 'session_001');
    const proofB = generateEligibilityProof(age, 18, 'secret_user_beta', 'salt_beta', 'session_001');

    expect(proofA.isValid).toBe(true);
    expect(proofB.isValid).toBe(true);
    expect(proofA.nullifier).not.toBe(proofB.nullifier);
    expect(proofA.proofId).not.toBe(proofB.proofId);
  });

  it('should generate distinct nullifiers across different sessions for the same user', () => {
    const age = 25;
    const identity = 'persistent_identity_key_777';
    const proofSession1 = generateEligibilityProof(age, 18, identity, 'random_salt_1', 'epoch_session_101');
    const proofSession2 = generateEligibilityProof(age, 18, identity, 'random_salt_2', 'epoch_session_102');

    expect(proofSession1.nullifier).not.toBe(proofSession2.nullifier);
  });

  it('should produce 64-character hexadecimal nullifier hashes', () => {
    const proof = generateEligibilityProof(30, 21, 'ident_x', 'salt_y', 'ctx_z');
    expect(proof.nullifier).toMatch(/^[0-9a-f]{64}$/);
  });
});
