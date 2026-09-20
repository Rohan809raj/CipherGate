import { describe, it, expect } from 'vitest';
import { CipherGateContractClient } from '../contract/index';

describe('CipherGate Frontend & Application Integration Tests', () => {
  it('handles multi-stage verification flow correctly across consecutive callers', async () => {
    const client = new CipherGateContractClient(21); // Age 21 threshold

    // User A: Age 20 (Underage for 21 threshold)
    const userAResult = await client.proveAndVerifyEligibility(
      20,
      'salt_usera_0000000000000000000000000000000000000000000000000000000',
      'id_usera_00000000000000000000000000000000000000000000000000000000'
    );
    expect(userAResult.isValid).toBe(false);
    expect(userAResult.publicStateUpdate.isEligible).toBe(false);

    // User B: Age 21 (Exact threshold match)
    const userBResult = await client.proveAndVerifyEligibility(
      21,
      'salt_userb_0000000000000000000000000000000000000000000000000000000',
      'id_userb_00000000000000000000000000000000000000000000000000000000'
    );
    expect(userBResult.isValid).toBe(true);
    expect(userBResult.publicStateUpdate.isEligible).toBe(true);

    // User C: Age 45 (Above threshold)
    const userCResult = await client.proveAndVerifyEligibility(
      45,
      'salt_userc_0000000000000000000000000000000000000000000000000000000',
      'id_userc_00000000000000000000000000000000000000000000000000000000'
    );
    expect(userCResult.isValid).toBe(true);
    expect(userCResult.publicStateUpdate.isEligible).toBe(true);

    // Assert that User B and User C proof hashes are cryptographically distinct
    expect(userBResult.proofHash).not.toBe(userCResult.proofHash);
    expect(userBResult.nullifierHash).not.toBe(userCResult.nullifierHash);
  });
});
