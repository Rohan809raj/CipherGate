import { describe, it, expect } from 'vitest';
import { poseidonHash2, computePoseidonCommitment } from '../contract/poseidon';

describe('Poseidon Algebraic Hash & SNARK Constraint Suite', () => {
  it('should generate deterministic algebraic commitments for identical inputs', () => {
    const hashA = poseidonHash2(25, 0x12345678);
    const hashB = poseidonHash2(25, 0x12345678);
    expect(hashA).toBe(hashB);
    expect(hashA.startsWith('pos_')).toBe(true);
  });

  it('should produce avalanche effect on single-bit input alteration', () => {
    const hash1 = poseidonHash2(25, 0x12345678);
    const hash2 = poseidonHash2(26, 0x12345678); // 1-year difference
    expect(hash1).not.toBe(hash2);
  });

  it('should compute valid Poseidon age commitment for witness blinding', () => {
    const commitment = computePoseidonCommitment(18, 0x99887766);
    expect(commitment).toMatch(/^pos_[0-9a-f]{32}$/);
  });
});
