function getGreatestCommonDivisor(A: number, B: number): number {
  while(B !== 0) {
    const remainder = A % B;
    A = B;
    B = remainder;
  }
  return A;
}

export class Rational {
  private _numerator  : number;
  private _denominator: number;

  public get   numerator() { return this._numerator;   }
  public get denominator() { return this._denominator; }

  constructor(numerator: number, denominator: number) {
    const sign = Math.sign(numerator) * Math.sign(denominator);

    this._numerator   = Math.abs(numerator) * sign;
    this._denominator =      Math.abs(denominator);
  }

  add(addend: Rational): Rational {
    const numerator1     = this._numerator   * addend._denominator;
    const numerator2     = addend._numerator *   this._denominator;
    const newNumerator   = numerator1        +          numerator2;
    const newDenominator = this._denominator * addend._denominator;
    
    return new Rational(
      newNumerator,
      newNumerator === 0 ? 1 : newDenominator,
    )
  }

  sub(subtrahend: Rational): Rational {
    return this.add(new Rational(
      -subtrahend._numerator,
      subtrahend._denominator
    ));
  }

  mul(factor: Rational): Rational {
    return new Rational(
      this._numerator   *   factor._numerator,
      this._denominator * factor._denominator
    ).reduce();
  }

  div(divisor: Rational): Rational {
    return new Rational(
      this._numerator   * divisor._denominator,
      this._denominator *   divisor._numerator
    );
  }

  abs(): Rational {
    return new Rational(
      Math.abs( this._numerator ),
      Math.abs(this._denominator)
    ).reduce();
  }

  exprational(exponent: number): Rational {
    const absExp = Math.abs(exponent);

    return new Rational(
      (exponent >= 0 ? this._numerator : this._denominator) ** absExp,
      (exponent >= 0 ? this._denominator : this._numerator) ** absExp
    );
  }

  expreal(base: number): number {
    return base ** (this._numerator / this._denominator);
  }

  reduce(): Rational {
    const GCD = getGreatestCommonDivisor(
      Math.abs( this._numerator ),
      Math.abs(this._denominator)
    )

    return new Rational(
      this._numerator   / GCD,
      this._denominator / GCD
    );
  }
}
