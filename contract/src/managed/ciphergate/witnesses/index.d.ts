export interface AgeWitnessInputs {
  userAge: number;
  secretSalt: string;
  identitySecret: string;
}

export declare class Witnesses {
  static createWitness(userAge: number, secretSalt: string, identitySecret: string): AgeWitnessInputs;
}
