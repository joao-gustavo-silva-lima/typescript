const ALPHABET = [ ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ" ];
const TOTAL_NUMBER_OF_NAMES = 676000;

export class NameFactory {
  private static alreadyTakenPtr : number[] = [];

  private static get numberOfAvailablePtr() {
    return TOTAL_NUMBER_OF_NAMES - this.alreadyTakenPtr.length;
  } 
  
  private static getRandomPtr() : number {
    var randomInt = Math.floor(Math.random() * this.numberOfAvailablePtr);

    for( let num of this.alreadyTakenPtr ) {
      if(num > randomInt) break;

      randomInt++;
    }
    
    return randomInt;
  }

  private static recordNewPtr(Ptr : number) : void {
    let head = 0;
    let numberOfRecords = this.alreadyTakenPtr.length;

    while (head < numberOfRecords) {
      const mid = (head + numberOfRecords) >>> 1;
      if (this.alreadyTakenPtr[mid] < Ptr) {
        head = mid + 1;
      } else {
        numberOfRecords = mid;
      }
    }
    
    this.alreadyTakenPtr.splice(head, 0, Ptr);
  }
  
  private static getNamePreffix(Ptr : number) : string {
    const prefixIndex = Math.floor(Ptr / 1000);
    const charAlpha   = ALPHABET[ Math.floor(prefixIndex / 26) ];
    const charBetha   = ALPHABET[       prefixIndex % 26       ];
    
    return `${charAlpha}${charBetha}`;
  }

  private static readonly getNamePosfix = (Ptr : number) : string =>
    String(Ptr % 1000).padStart(3, '0');

  public static createName() : string {
    if (this.numberOfAvailablePtr <= 0) {
      throw new Error("All available robots were created.");
    }

    var Ptr : number = this.getRandomPtr();

    this.recordNewPtr(Ptr);

    return this.getNamePreffix(Ptr) + this.getNamePosfix(Ptr);
  }

  public static reset() : void { this.alreadyTakenPtr = []; }
}

export class Robot {
  private _name : string = "";  

  public get name(): string {
    if(!this._name) this.resetName();

    return this._name;
  }

  public resetName() : void { this._name = NameFactory.createName(); }

  public static releaseNames = () : void => NameFactory.reset();
}