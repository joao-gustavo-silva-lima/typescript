export class Gigasecond {
  private gigasecondDate: Date;
  
  public constructor(date: Date) {
    const gigasecondTimeinMs =       date.getTime() + 1E+12;
    this.gigasecondDate      = new Date(gigasecondTimeinMs);
  }

  public date() {
    return this.gigasecondDate;
  }
}
