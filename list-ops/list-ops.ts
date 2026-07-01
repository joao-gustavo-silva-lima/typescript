export class List<ItemT> {
  private _length: number = 0;

  private constructor() {}
  
  public static create<T>(...values: T[]): List<T> {
    const newList = new List<T>();
    
    for(let i = 0 ; i < values.length ; i++) {
      newList.push(values[i]);
    }
    
    return newList;
  }

  public length() { 
    return this._length; 
  }

  public push(item: ItemT) : List<ItemT> {
    this[this._length] = item;
    this._length++;
    return this;
  }

  public forEach(callbackFunction: (item: ItemT, index: number) => void): void {
    for(let i = 0 ; i < this._length ; i++) {
      callbackFunction(this[i], i);
    }
  }

  public map<callbackT>(callbackFunction: (item: ItemT, index: number) => callbackT): List<callbackT> {
    const newList = new List<callbackT>();

    for(let i = 0 ; i < this._length ; i++) {
      const callbackItem = callbackFunction(this[i], i);
      newList.push(callbackItem);
    }
    
    return newList;
  }

  public append(sourceList: List<ItemT>): List<ItemT> {
    sourceList.forEach(item => {
      this.push(item);
    })
    return this;
  }

  public concatenate(sourceList: List<ItemT> | List<List<ItemT>>): List<ItemT> {
    if(sourceList._length < 1) return this;

    if(!(sourceList[0] instanceof List)) {
      return this.append(sourceList as List<ItemT>);
    }
    
    sourceList.forEach(list => {
      this.append(list as List<ItemT>);
    })

    return this;
  }

  public filter(callbackTest: (item: ItemT, index: number) => boolean): List<ItemT>  {
    const filteredList = new List<ItemT>();

    for(let i = 0 ; i < this._length ; i++) {
      if(!callbackTest(this[i], i)) continue;

      filteredList.push(this[i]);
    }

    return filteredList;
  }

  public reduce(
    accumulationFunction: (accumulator: ItemT, item: ItemT) => ItemT, 
    initialAccumulator: ItemT,
    initialIndex: number,
    lastIndex: number
  ): ItemT {
    let thisAccumulator = initialAccumulator;
    let reduceFromRight = lastIndex < initialIndex;

    let i = initialIndex;
    while (reduceFromRight ? i >= lastIndex : i <= lastIndex) {
      thisAccumulator = accumulationFunction(thisAccumulator, this[i]);
      reduceFromRight ? i-- : i++;
    }

    return thisAccumulator;
  }

  public foldl(
    accumulationFunction: (accumulator: ItemT, item: ItemT) => ItemT,
    initialAccumulator: ItemT
  ): ItemT {
    if(this._length < 1) return initialAccumulator;

    return this.reduce(
      accumulationFunction,
      initialAccumulator,
      0,
      this._length - 1
    );
  }

  public foldr(
    accumulationFunction: (accumulator: ItemT, item: ItemT) => ItemT,
    initialAccumulator: ItemT
  ): ItemT {
    if(this._length < 1) return initialAccumulator;

    return this.reduce(
      accumulationFunction,
      initialAccumulator,
      this._length - 1,
      0,
    );
  }

  public reverse(): List<ItemT> {
    const reversedList = new List<ItemT>();

    for(let i = this._length - 1 ; i >= 0 ; i--) {
      reversedList.push(this[i]);
    }

    return reversedList;
  }
}

export interface List<ItemT> {
  [index: number] : ItemT
}
