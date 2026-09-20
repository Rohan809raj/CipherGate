import { describe, it, expect } from 'vitest';
import { CipherGateContractClient } from '../contract/index';

describe('CipherGate Smart Contract Client & State Transitions', () => {
  it('initializes with default public threshold of 18 and preprod parameters', () => {
    const client = new CipherGateContractClient(18);
    const state = client.getLedgerState();

    expect(state.minAgeThreshold).toBe(18);
    expect(state.verifiedEligibleCount).toBeGreaterThanOrEqual(0);
    expect(state.network).toBe('Midnight Preprod');
    expect(state.contractAddress.startsWith('0x')).toBe(true);
  });

  it('correctly increments verifiedEligibleCount when valid proof is submitted', async () => {
    const client = new CipherGateContractClient(18);
    const initialCount = client.getLedgerState().verifiedEligibleCount;

    const result = await client.proveAndVerifyEligibility(
      21,
      'a1b2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f67890',
      '3344556677889900aabbccddeeff11223344556677889900aabbccddeeff1122'
    );

    expect(result.isValid).toBe(true);
    expect(client.getLedgerState().verifiedEligibleCount).toBe(initialCount + 1);
    expect(client.getHistory().length).toBe(1);
    expect(client.getHistory()[0].isEligible).toBe(true);
  });

  it('rejects threshold configuration update from unauthorized keys', () => {
    const client = new CipherGateContractClient(18);
    expect(() => client.updateThreshold(21, 'unauthorized_fake_key')).toThrow(
      'Unauthorized admin key'
    );
  });

  it('allows authorized admin key to update minimum age threshold', () => {
    const client = new CipherGateContractClient(18);
    const success = client.updateThreshold(21, 'admin_ciphergate_auth_key');

    expect(success).toBe(true);
    expect(client.getLedgerState().minAgeThreshold).toBe(21);
  });
});
