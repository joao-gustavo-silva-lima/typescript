export class Series {
  private series: string;

  constructor(series: string) {
    this.series = series;
  }

  slices(sliceLength: number): number[][] {
    if (this.series.length === 0) {
      throw new Error("series cannot be empty");
    }
    if (sliceLength < 0) {
      throw new Error("slice length cannot be negative");
    }
    if (sliceLength === 0) {
      throw new Error("slice length cannot be zero");
    }
    if (sliceLength > this.series.length) {
      throw new Error("slice length cannot be greater than series length");
    }

    const slices: number[][] = [];
    const sliceQuantity = this.series.length - sliceLength + 1;

    let slicingOriginIndex = 0;
    while (slicingOriginIndex < sliceQuantity) {
      const slice: number[] = [];

      for (let i = 0; i < sliceLength; i++) {
        const digit = this.series[slicingOriginIndex + i];

        slice.push(Number(digit));
      }

      slices.push(slice);
      slicingOriginIndex++;
    }

    return slices;
  }
}
