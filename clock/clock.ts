export class Clock {
  private timeInMinutes : number;

  constructor(hour: number, minute: number = 0) {
    this.timeInMinutes = minute + hour * 60;
  }

  public toString() : string {
    const fixedHour   = (24 + (Math.floor(this.timeInMinutes / 60) % 24)) % 24;
    const fixedMinute = (60 + (           this.timeInMinutes % 60      )) % 60;

    return `${
      fixedHour
      .toString()
      .padStart(2, '0')
    }:${
      fixedMinute
      .toString()
      .padStart(2, '0')
    }`;
  }

  public plus(minutes : number) : Clock {
    return new Clock(0, this.timeInMinutes + minutes);
  }

  public minus(minutes : number) : Clock {
    return new Clock(0, this.timeInMinutes - minutes);
  }

  public equals(other : Clock) : boolean {
    return this.toString() == other.toString();
  }
}
