export class ComplexNumber {
  public readonly real: number;
  public readonly imag: number;
  public readonly abs: number;

  public readonly expReal: number;
  public readonly expImag: number;

  constructor(real: number, imag: number) {
    this.real = real;
    this.imag = imag;
    this.abs = Math.sqrt(this.real ** 2 + this.imag ** 2);

    const purelyReal = Math.exp(this.real);
    this.expReal = purelyReal * Math.cos(this.imag);
    this.expImag = purelyReal * Math.sin(this.imag);
  }

  public get conj(): ComplexNumber {
    return new ComplexNumber(this.real, -this.imag || 0);
  }

  public get exp(): ComplexNumber {
    return new ComplexNumber(this.expReal, this.expImag);
  }

  public add(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this.real + other.real, this.imag + other.imag);
  }

  public sub(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this.real - other.real, this.imag - other.imag);
  }

  public div(other: ComplexNumber): ComplexNumber {
    const denominator = other.real ** 2 + other.imag ** 2;

    if (denominator === 0) {
      throw new Error("Cannot divide a complex number by zero.");
    }

    return new ComplexNumber(
      (this.real * other.real + this.imag * other.imag) / denominator,
      (this.imag * other.real - this.real * other.imag) / denominator
    );
  }

  public mul(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(
      this.real * other.real - this.imag * other.imag,
      this.imag * other.real + this.real * other.imag
    );
  }
}
