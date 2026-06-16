const ALPHABET = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

export class Robot {
  private static namesAlreadyTaken : string[] = [];

  private _name : string = "";  

  public get name(): string {
    if(!this._name) this.resetName();

    return this._name;
  }

  public resetName(): void {
    this._name = ""
      + ALPHABET[ +(Math.random() * (ALPHABET.length - 1)).toFixed(0) ]
      + ALPHABET[ +(Math.random() * (ALPHABET.length - 1)).toFixed(0) ]
      + +(Math.random() * 9).toFixed(0)
      + +(Math.random() * 9).toFixed(0)
      + +(Math.random() * 9).toFixed(0)
    ;
    
    if(Robot.namesAlreadyTaken.includes(this._name)) return this.resetName();

    Robot.namesAlreadyTaken.push(this._name);
  }

  public static releaseNames(): void {
    this.namesAlreadyTaken = [];
  }
}