export class Witnesses {
  static createWitness(userAge, secretSalt, identitySecret) {
    return { userAge, secretSalt, identitySecret };
  }
}
