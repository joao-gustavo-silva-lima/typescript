const ALPHABET = [ ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ" ];
const DIGITS   = [  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,  ];

function createObjectFromKeys(keys : string[] | number[], commomValue : number) : Record<string, number> {
  const obj : Record<string, number> = {};

  for(let key of keys) obj[key] = commomValue;

  return obj;
} 

export function getRandomObjectKey(obj : Record<string, number>) : string {
  const keys = Object.keys(obj)

  const output = keys[Math.floor(Math.random() * keys.length)];
  
  if(--obj[output] <= 0) delete obj[output];

  return output;
}

export class NameFactory {
  public static availableChars = this.getClearAvailableChars();

  public static getClearAvailableChars() {
    return {
      alpha   : createObjectFromKeys(ALPHABET, 26E+3),
      beta    : createObjectFromKeys(ALPHABET,  1000),
      gamma   : createObjectFromKeys(DIGITS  ,   100),
      delta   : createObjectFromKeys(DIGITS  ,    10),
      epsilon : createObjectFromKeys(DIGITS  ,     1),
    }
  }

  public static create() : string {
    return ""
      + getRandomObjectKey(this.availableChars.alpha  )
      + getRandomObjectKey(this.availableChars.beta   )
      + getRandomObjectKey(this.availableChars.gamma  )
      + getRandomObjectKey(this.availableChars.delta  )
      + getRandomObjectKey(this.availableChars.epsilon);
  }

  public static clear() : void { 
    this.availableChars = this.getClearAvailableChars(); 
  }

}

export class Robot {
  private _name : string = "";  

  public get name(): string {
    if(!this._name) this.resetName();

    return this._name;
  }

  public resetName() : void { this._name = NameFactory.create(); }

  public static releaseNames = () : void => NameFactory.clear();
}