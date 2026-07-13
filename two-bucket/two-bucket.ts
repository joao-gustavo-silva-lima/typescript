interface Buckets {
  one: number;
  two: number;
}

export class TwoBucket {
  private readonly capacities: Buckets;
  private readonly buckets: Buckets = {
    one: 0,
    two: 0,
  };
  private takenActions = 0;

  constructor(
    capacity1: number,
    capacity2: number,
    desiredLiters: number,
    firstFilled: "one" | "two"
  ) {
    this.capacities = {
      one: capacity1,
      two: capacity2,
    } as const;

    this.fillBucket(firstFilled);
  }

  private fillOtherBucket(filler: "one" | "two"): void {
    const receiver = filler === "one" ? "two" : "one";
    const receiverFreeCapacity =
      this.capacities[receiver] - this.buckets[receiver];
    const fillingQuantity =
      this.buckets[filler] <= receiverFreeCapacity
        ? this.buckets[filler]
        : receiverFreeCapacity;

    this.buckets[receiver] += fillingQuantity;
    this.buckets[filler] -= fillingQuantity;
    this.takenActions++;
  }

  private fillBucket(bucket: "one" | "two"): void {
    this.buckets[bucket] = this.capacities[bucket];
    this.takenActions++;
  }

  private emptyBucket(bucket: "one" | "two"): void {
    this.buckets[bucket] = 0;
    this.takenActions++;
  }

  moves() {
    throw new Error("Remove this line and implement the function");
  }

  get goalBucket() {
    throw new Error("Remove this line and implement the function");
  }

  get otherBucket() {
    throw new Error("Remove this line and implement the function");
  }
}
