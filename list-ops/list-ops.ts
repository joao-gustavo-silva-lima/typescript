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

  public push(item: ItemT) : number {
    this[this._length] = item;
    return ++this._length;
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
      this.append(sourceList as List<ItemT>);
      return this;
    }
    
    sourceList.forEach(list => {
      this.append(list as List<ItemT>);
    });

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

  public reduce<accumulatorT>(
    accumulationFunction: (accumulator: accumulatorT, item: ItemT) => accumulatorT, 
    initialAccumulator: accumulatorT,
    reversed: boolean
  ): accumulatorT {
    let thisAccumulator = initialAccumulator;
    let i = reversed ? this._length - 1 : 0;

    while(reversed ? i >= 0 : i < this._length) {
      thisAccumulator = accumulationFunction(thisAccumulator, this[i]);
      reversed ? i-- : i++;
    }

    return thisAccumulator;
  }

  public foldl<accumulatorT>(
    accumulationFunction: (accumulator: accumulatorT, item: ItemT) => accumulatorT,
    initialAccumulator: accumulatorT
  ): accumulatorT {
    if(this._length < 1) return initialAccumulator;

    return this.reduce(
      accumulationFunction,
      initialAccumulator,
      false
    );
  }

  public foldr<accumulatorT>(
    accumulationFunction: (accumulator: accumulatorT, item: ItemT) => accumulatorT,
    initialAccumulator: accumulatorT
  ): accumulatorT {
    if(this._length < 1) return initialAccumulator;

    return this.reduce(
      accumulationFunction,
      initialAccumulator,
      true
    );
  }
  
  public reverse(): List<ItemT> {
    return this.foldr((accumulator, item) => {
      accumulator.push(item);
      return accumulator;
    }, new List<ItemT>());
  }
}

export interface List<ItemT> {
  [index: number] : ItemT
}
