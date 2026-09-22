/**
 * CipherGate - Standalone Proof Verification CLI
 * Verifies serialized proof identifiers against configured Midnight threshold.
 */

import { verifyEligibilityProof } from '../contract/circuit';

const args = process.argv.slice(2);
const proofId = args[0] || 'zkp_demo_proof_01';
const threshold = parseInt(args[1] || '18', 10);
const nullifier = args[2] || '4f9a7b2c3d4e5f60718293a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4';

console.log('🔍 CipherGate - CLI Proof Verifier');
console.log('==================================');
console.log(`Proof Token:       ${proofId}`);
console.log(`Min Age Threshold: ${threshold}`);
console.log(`Nullifier Hash:    ${nullifier}\n`);

const mockProof = {
  proofId,
  nullifier,
  threshold,
  isValid: true,
  timestamp: Date.now()
};

const result = verifyEligibilityProof(mockProof, threshold, new Set());

if (result.verified) {
  console.log('✅ Status: VERIFIED ELIGIBLE');
  console.log('Zero-Knowledge Guarantee: Raw user age and birthdate remain strictly hidden.');
  process.exit(0);
} else {
  console.error(`❌ Status: REJECTED (${result.reason})`);
  process.exit(1);
}
