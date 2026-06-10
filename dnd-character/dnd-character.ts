export class DnDCharacter {
  public wisdom       : number;
  public strength     : number;
  public charisma     : number;
  public dexterity    : number;
  public constitution : number;
  public intelligence : number;
  
  public hitpoints    : number;

  constructor() {
    this.wisdom       = DnDCharacter.generateAbilityScore();
    this.strength     = DnDCharacter.generateAbilityScore();
    this.charisma     = DnDCharacter.generateAbilityScore();
    this.dexterity    = DnDCharacter.generateAbilityScore();
    this.constitution = DnDCharacter.generateAbilityScore();
    this.intelligence = DnDCharacter.generateAbilityScore();
    
    this.hitpoints    = 10 + DnDCharacter.getModifierFor(this.constitution);
  }

  public static generateAbilityScore(): number {
    let diceThrowResults : number[] = Array.from(
      { length : 4 }, () => Dice.throw()
    )
    .sort();

    diceThrowResults.shift();

    return diceThrowResults.reduce(
      (prevValue : number, currValue : number) => prevValue + currValue);
  }

  public static readonly getModifierFor = (abilityValue: number): number =>
    Math.floor((abilityValue - 10) / 2);
}

class Dice {
  public static throw = () : number => 
    Math.floor(Math.random() * 6) + 1;    
}

