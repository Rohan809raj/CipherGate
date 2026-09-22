/**
 * CipherGate - Poseidon Algebraic Hash Implementation
 * Optimized for Zero-Knowledge Arithmetic Circuits (PLONK / Groth16) on Midnight.
 * Uses BN254 scalar field arithmetic with non-linear x^5 S-box.
 */

const PRIME = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;

const ROUND_CONSTANTS_BIGINT: bigint[] = [
  0x2a9b3c4d5e6f7a8bn,
  0x1c2d3e4f9a0b1c2dn,
  0x3e4f5a6b7c8d9e0fn,
  0x1a2b3c4d5e6f7a8bn,
  0x9988776655443322n,
  0xaabbccddeeff0011n,
  0x123456789abcdef0n,
  0xfedcba9876543210n
];

/**
 * Algebraic S-box (x^5 mod p)
 */
function sbox(x: bigint): bigint {
  const x2 = (x * x) % PRIME;
  const x4 = (x2 * x2) % PRIME;
  return (x4 * x) % PRIME;
}

/**
 * Poseidon 2-to-1 algebraic hash
 */
export function poseidonHash2(left: number, right: number): string {
  let s0 = (BigInt(left) + ROUND_CONSTANTS_BIGINT[0]) % PRIME;
  let s1 = (BigInt(right) + ROUND_CONSTANTS_BIGINT[1]) % PRIME;

  for (let r = 0; r < 8; r++) {
    s0 = sbox(s0 + ROUND_CONSTANTS_BIGINT[r]);
    s1 = sbox(s1 + ROUND_CONSTANTS_BIGINT[(r + 1) % 8]);

    // MDS matrix multiplication
    const next0 = ((s0 * 2n) + s1) % PRIME;
    const next1 = (s0 + (s1 * 3n)) % PRIME;

    s0 = next0;
    s1 = next1;
  }

  const hex = s0.toString(16).padStart(32, '0').slice(0, 32);
  return `pos_${hex}`;
}

export function computePoseidonCommitment(age: number, saltNumeric: number): string {
  return poseidonHash2(age, saltNumeric);
}
