export class DnDCharacter {
  public wisdom       = DnDCharacter.generateAbilityScore();
  public strength     = DnDCharacter.generateAbilityScore();
  public charisma     = DnDCharacter.generateAbilityScore();
  public dexterity    = DnDCharacter.generateAbilityScore();
  public constitution = DnDCharacter.generateAbilityScore();
  public intelligence = DnDCharacter.generateAbilityScore();
  
  public hitpoints    = DnDCharacter.getModifierFor(this.constitution) + 10;

  public static readonly getModifierFor = (abilityValue: number): number =>
    Math.floor((abilityValue - 10) / 2);

  public static generateAbilityScore = (): number => 
    Dice.throwQuadruple()
    .slice(1)
    .reduce((prevValue, currValue) => prevValue + currValue);
}

class Dice {
  public static throwQuadruple = () : number[] => 
    Array.from({ length : 4 }, () => Math.floor(Math.random() * 6) + 1) 
    .sort((a, b) => a - b);
}

