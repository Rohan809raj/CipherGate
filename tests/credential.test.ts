import { describe, it, expect } from 'vitest';
import { generateEligibilityProof, verifyEligibilityProof } from '../contract/circuit';

interface MockW3CCredential {
  id: string;
  type: string[];
  issuer: string;
  credentialSubject: {
    birthYear: number;
    currentYear: number;
    identityCommitment: string;
  };
}

describe('W3C Verifiable Credential & Compact Witness Ingestion Suite', () => {
  const sampleCredential: MockW3CCredential = {
    id: 'urn:uuid:ciphergate-did-doc-4921',
    type: ['VerifiableCredential', 'AgeEligibilityCredential'],
    issuer: 'did:midnight:issuer:0x9812ef44',
    credentialSubject: {
      birthYear: 2002,
      currentYear: 2026,
      identityCommitment: '0x3a4b5c6d7e8f9012'
    }
  };

  it('should transform credential subject attributes into private Compact witness without leaks', () => {
    const calculatedAge = sampleCredential.credentialSubject.currentYear - sampleCredential.credentialSubject.birthYear;
    expect(calculatedAge).toBe(24);

    const proof = generateEligibilityProof(
      calculatedAge,
      18,
      sampleCredential.credentialSubject.identityCommitment,
      'ephemeral_session_salt_0x992',
      'dapp_compliance_context'
    );

    expect(proof.isValid).toBe(true);
    expect(proof.threshold).toBe(18);

    // Confirm that raw birth year or calculated age is not present in proof object
    expect((proof as any).age).toBeUndefined();
    expect((proof as any).userAge).toBeUndefined();
    expect((proof as any).birthYear).toBeUndefined();
    const serialized = JSON.stringify(proof);
    expect(serialized).not.toContain('"age"');
    expect(serialized).not.toContain('"userAge"');
    expect(serialized).not.toContain('"birthYear"');
    expect(serialized).not.toContain('2002');
    expect(serialized).not.toContain(sampleCredential.issuer);
  });

  it('should reject credential if calculated age falls below threshold', () => {
    const underAgeCred: MockW3CCredential = {
      ...sampleCredential,
      credentialSubject: {
        birthYear: 2011,
        currentYear: 2026, // 15 years old
        identityCommitment: '0x1111222233334444'
      }
    };

    const age = underAgeCred.credentialSubject.currentYear - underAgeCred.credentialSubject.birthYear;
    expect(() => {
      generateEligibilityProof(age, 18, underAgeCred.credentialSubject.identityCommitment, 'salt', 'ctx');
    }).toThrow('CipherGate: Age does not meet the minimum eligibility threshold');
  });
});
