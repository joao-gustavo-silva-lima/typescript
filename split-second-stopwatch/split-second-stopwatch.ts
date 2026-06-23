type Digit     = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type Hour      = `0${Digit}` | `1${Digit}` | '20' | '21' | '22' | '23'; 
type MaxSix    = '0' | '1' | '2' | '3' | '4' | '5';
type MS        = `${MaxSix}${Digit}`;
type Timestamp = `${Hour}:${MS}:${MS}`;
type State     = "ready" | "running" | "stopped";

interface HMS { 
  hours   : number, 
  minutes : number, 
  seconds : number 
}

export class SplitSecondStopwatch {
  private _state          : State       = "ready";
  private _previousLaps   : HMS[]       = [];
  private _currentLap!    : HMS ;

  constructor() { this._currentLap = { hours : 0, minutes : 0, seconds : 0 }; }

  public get state(): State { 
    return this._state; 
  }

  public get currentLap(): Timestamp {
    return SplitSecondStopwatch.constructTimestamp(this._currentLap || {});
  }

  public get total(): Timestamp {
    const totalHMS : HMS = this._previousLaps
      .reduce(
        (total, currLap) => SplitSecondStopwatch.sumTimes(total, currLap), 
        this._currentLap
      );

    return SplitSecondStopwatch.constructTimestamp(totalHMS);
  }

  public get previousLaps(): Timestamp[] {
    return this._previousLaps.map(SplitSecondStopwatch.constructTimestamp);
  }

  public start(): void {
    if(this._state === "running") {
      throw 'cannot start an already running stopwatch';
    }

    this._state = "running";
  }

  public stop(): void {
    if(this._state !== "running") {
      throw 'cannot stop a stopwatch that is not running';
    }
    
    this._state = "stopped";
  }

  public lap(): void {
    if(this._state !== "running") {
      throw 'cannot lap a stopwatch that is not running';
    }

    this._previousLaps.push(this._currentLap);

    this._currentLap = { hours : 0, minutes : 0, seconds : 0 };
  }

  public reset(): void {
    if(this._state !== "stopped") {
      throw 'cannot reset a stopwatch that is not stopped';
    }

    this._previousLaps   = [];
    this._state          = "ready";
    this._currentLap     = { hours : 0, minutes : 0, seconds : 0 };
  }

  public advanceTime(additionalTime : Timestamp): void {
    if(this._state !== "running") return;

    const time = SplitSecondStopwatch.destructTimestamp(additionalTime);
    
    this._currentLap = SplitSecondStopwatch.sumTimes(this._currentLap, time);
  }

  private static sumTimes(time1 : HMS, time2 : HMS) : HMS {
    const timeInSeconds =
      (time1.hours + time2.hours)     * 3600 +
      (time1.minutes + time2.minutes) *   60 +
      (time1.seconds + time2.seconds)        ;

    return { 
      hours   : Math.floor(timeInSeconds / 3600), 
      minutes : Math.floor(timeInSeconds % 3600 / 60), 
      seconds : timeInSeconds % 60 
    };
  }

  private static constructTimestamp(time : HMS) : Timestamp {
    const hours   = time.hours.toString().padStart(2, '0') as Hour;
    const minutes = time.minutes.toString().padStart(2, '0') as MS;
    const seconds = time.seconds.toString().padStart(2, '0') as MS;

    return `${hours}:${minutes}:${seconds}`;
  }

  private static destructTimestamp(timestamp : Timestamp) : HMS {
    const [hours, minutes, seconds] = timestamp.split(':')
      .map(Number) as [number, number, number];

    return { hours : hours, minutes : minutes, seconds : seconds };
  }
}
