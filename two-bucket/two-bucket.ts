type BucketName = "one" | "two";

class Bucket {
  public content: number;
  public readonly capacity: number;

  public constructor(capacity: number, content: number = 0) {
    this.capacity = capacity;
    this.content = content;
  }
}

export class TwoBucket {
  private takenActions = 0;
  private readonly goal: number;
  private readonly buckets: {
    one: Bucket;
    two: Bucket;
  };
  private readonly startingBucket: BucketName;

  constructor(
    capacity1: number,
    capacity2: number,
    goalLiters: number,
    startingBucket: BucketName
  ) {
    this.goal = goalLiters;
    this.buckets = {
      one: new Bucket(capacity1),
      two: new Bucket(capacity2),
    };
    this.startingBucket = startingBucket;

    this.fillBucket(this.buckets[startingBucket]);
  }

  private fillBucket(bucket: Bucket): void {
    bucket.content = bucket.capacity;
    this.takenActions++;
  }

  private emptyBucket(bucket: Bucket): void {
    bucket.content = 0;
    this.takenActions++;
  }

  private emptyIntoAnotherBucket(
    sourceBucket: Bucket,
    targetBucket: Bucket
  ): void {
    const maximumFill = targetBucket.capacity - targetBucket.content;

    if (sourceBucket.content <= maximumFill) {
      targetBucket.content += sourceBucket.content;
      sourceBucket.content = 0;
    } else {
      targetBucket.content += maximumFill;
      sourceBucket.content -= maximumFill;
    }

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
