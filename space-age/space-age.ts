const EARTH_ORBITAL_PERIOD_IN_SECS = 31557600;

const earthYearsToSeconds = (years : number) : number => 
  years * EARTH_ORBITAL_PERIOD_IN_SECS;

const PLANETS_ORBITAL_PERIOD_IN_SECS = {
  mars    : earthYearsToSeconds(1.88081580),
  earth   : earthYearsToSeconds(1.00000000),
  venus   : earthYearsToSeconds(0.61519726),
  saturn  : earthYearsToSeconds(29.4474980),
  uranus  : earthYearsToSeconds(84.0168460),
  neptune : earthYearsToSeconds(164.791320), 
  jupiter : earthYearsToSeconds(11.8626150),
  mercury : earthYearsToSeconds(0.24084670)
} as const;

type Planet = keyof typeof PLANETS_ORBITAL_PERIOD_IN_SECS;

export const age = (planet: Planet, seconds: number): number => 
  +(seconds / PLANETS_ORBITAL_PERIOD_IN_SECS[planet]).toFixed(2);
