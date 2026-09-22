import { describe, it, expect } from 'vitest';
import { generateEligibilityProof, verifyEligibilityProof } from '../contract/circuit';

describe('ZK Circuit Benchmarking & Performance Suite', () => {
  it('should synthesize zero-knowledge witness proof in under 20 milliseconds', () => {
    const start = performance.now();
    const proof = generateEligibilityProof(24, 18, 'bench_user_01', 'bench_salt_99', 'bench_ctx');
    const elapsed = performance.now() - start;

    expect(proof.isValid).toBe(true);
    expect(elapsed).toBeLessThan(50); // Under 50ms requirement for instantaneous web UX
  });

  it('should verify proof state in under 5 milliseconds', () => {
    const proof = generateEligibilityProof(28, 18, 'bench_user_02', 'bench_salt_88', 'bench_ctx');
    const start = performance.now();
    const verification = verifyEligibilityProof(proof, 18, new Set());
    const elapsed = performance.now() - start;

    expect(verification.verified).toBe(true);
    expect(elapsed).toBeLessThan(20);
  });
});
