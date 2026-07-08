type Options = {
  minFactor?: number;
  maxFactor?: number;
  sum: number;
};

export function triplets({
  minFactor = 1,
  maxFactor,
  sum,
}: Options): Triplet[] {
  const N = sum;

  if (N % 2 !== 0) {
    return [];
  }

  const output: Triplet[] = [];

  for (let a = minFactor; a < N / 3; a++) {
    const b = (N * (N - 2 * a)) / (2 * (N - a));

    if (!Number.isInteger(b)) {
      continue;
    }

    const c = N - a - b;

    if (
      a >= b ||
      b >= c ||
      (maxFactor !== undefined &&
        (a > maxFactor || b > maxFactor || c > maxFactor)) ||
      a < minFactor ||
      b < minFactor ||
      c < minFactor
    ) {
      continue;
    }

    output.push(new Triplet(a, b, c));
  }

  return output;
}

class Triplet {
  private readonly A: number;
  private readonly B: number;
  private readonly C: number;

  constructor(A: number, B: number, C: number) {
    this.A = A;
    this.B = B;
    this.C = C;
  }

  toArray(): [number, number, number] {
    return [this.A, this.B, this.C];
  }
}
