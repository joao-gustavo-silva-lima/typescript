const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

class NameFactory {
  private static remainingCapacity = 676000;
  private static readonly swaps = new Map<number, number>();

  public static reset() {
    this.remainingCapacity = 676000;
    this.swaps.clear();
  }
  
  public static getNewName() : string {
    if(this.remainingCapacity <= 0) {
      throw Error("Factory is Exhausted.");
    }

    const namePointer : number = this.getRandomPointer();

    return this.getNamePrefix(namePointer) + this.getNameSuffix(namePointer);
  }

  private static readonly getNamePrefix = (namePointer : number) : string => ""
    + ALPHABET[    (namePointer / 26000) | 0    ]
    + ALPHABET[ ((namePointer / 1000) | 0) % 26 ];

  private static readonly getNameSuffix = (namePointer : number) : string => 
    String(namePointer % 1000).padStart(3, '0');

  private static getRandomPointer() : number {
    const randomIndex = (Math.random() * this.remainingCapacity) | 0;
    this.remainingCapacity--;

    const drawnPointer = this.swaps.has(randomIndex)
      ? this.swaps.get(randomIndex)
      : randomIndex;

    const boundaryPointer = this.swaps.has(this.remainingCapacity)
      ? this.swaps.get(this.remainingCapacity)
      : this.remainingCapacity;

    if(randomIndex !== this.remainingCapacity) {
      this.swaps.set(randomIndex, boundaryPointer!);
    }
      
    this.swaps.delete(this.remainingCapacity);

    return drawnPointer!;
  }
}

export class Robot {
  private _name : string = NameFactory.getNewName();

  public get  name() : string {
    return this._name;          
  }

  public resetName() : void { 
    this._name = NameFactory.getNewName(); 
  }

  public static releaseNames() : void { 
    NameFactory.reset(); 
  }
}
