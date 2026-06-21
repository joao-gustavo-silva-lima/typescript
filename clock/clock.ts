export class Clock {
  private timeInMinutes : number;

  constructor(hour: number, minute: number = 0) {
    this.timeInMinutes = minute + hour * 60;
  }

  public toString(): string {
    const fixedHour   = (24 + (Math.floor(this.timeInMinutes / 60) % 24)) % 24;
    const fixedMinute = (60 +                  (this.timeInMinutes % 60)) % 60;

    const hourString   = fixedHour
      .toString()
      .padStart(2, '0');
    const minuteString = fixedMinute
      .toString()
      .padStart(2, '0');

    return `${hourString}:${minuteString}`;
  }

  public plus(minutes: number): Clock {
    this.timeInMinutes += minutes;

    return this;
  }

  public minus(minutes: number): Clock {
    this.timeInMinutes -= minutes;

    return this;
  }

  public readonly equals = (other: Clock): boolean =>
    this.toString() == other.toString();
}
