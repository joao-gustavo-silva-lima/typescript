class Node<TElement> {
  public value    : TElement;
  public next     : Node<TElement> | undefined;
  public previous : Node<TElement> | undefined;

  constructor(value : TElement) {
    this.value = value;
  }
}

export class LinkedList<TElement> {
  private HEAD : Node<TElement> | undefined = undefined;
  private TAIL : Node<TElement> | undefined = undefined;
  
  public push(value : TElement) : void {
    const newNode = new Node<TElement>(value);
    
    if(this.HEAD === undefined) {
      this.HEAD = newNode;
      this.TAIL = newNode;
      return;
    }
    
    this.HEAD!.next = newNode;
    newNode.previous = this.HEAD;
    this.HEAD = newNode;
  }
  
  public unshift(value : TElement) : void {
    const newNode = new Node<TElement>(value);

    if(this.TAIL === undefined) {
      this.HEAD = newNode;
      this.TAIL = newNode;
      return;
    }

    this.TAIL!.previous = newNode;
    newNode.next = this.TAIL;
    this.TAIL = newNode;
  }

  public pop() : TElement | undefined {
    if(this.HEAD === undefined) return undefined;

    const poppedValue = this.HEAD.value;

    this.HEAD = this.HEAD.previous;
    if(this.HEAD !== undefined) {
      this.HEAD.next = undefined;
    }
    else {
      this.TAIL = undefined;
    }

    return poppedValue;
  }

  public shift() : TElement | undefined {
    if(this.TAIL === undefined) return undefined;

    var shiftedValue = this.TAIL.value;

    this.TAIL = this.TAIL.next;
    if(this.TAIL !== undefined) {
      this.TAIL.previous = undefined;
    }
    else {
      this.HEAD = undefined;
    }

    return shiftedValue;
  }


  public delete(targetValue : TElement) : void {
    if(this.HEAD === undefined) return;
    
    var chaserHEAD : Node<TElement> | undefined = this.HEAD;
    while(chaserHEAD !== undefined) {
      if(chaserHEAD.value !== targetValue) {
        chaserHEAD = chaserHEAD.previous;
        continue;
      };

      const nextToProcess: Node<TElement> | undefined = chaserHEAD.previous;

      if (chaserHEAD === this.HEAD) {
        this.HEAD = chaserHEAD.previous;
      }
      if (chaserHEAD === this.TAIL) {
        this.TAIL = chaserHEAD.next;
      }

      if(chaserHEAD.previous) {
        chaserHEAD.previous.next = chaserHEAD.next;
      }
      if(chaserHEAD.next) {
        chaserHEAD.next.previous = chaserHEAD.previous;
      }

      chaserHEAD = nextToProcess;
    }
  }

  public count() : number {
    var counterHEAD = this.HEAD;

    var count = 0;
    while(counterHEAD !== undefined) {
      count++;
      counterHEAD = counterHEAD.previous;
    }

    return count;
  }
}
