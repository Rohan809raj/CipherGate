export class PureCircuits {
  static computeNullifier(identitySecret, secretSalt, contextNonce) {
    return identitySecret.slice(0, 16) + secretSalt.slice(0, 16) + contextNonce.slice(0, 32);
  }
}
