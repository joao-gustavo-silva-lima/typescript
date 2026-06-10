const EARTH_ORBITAL_PERIOD_IN_SECS = 31557600;

const PLANETS_ORBITAL_PERIOD_IN_EARTH_YEARS = {
  mars : 1.8808158,
  earth : 1.000000,
  venus : 0.61519726,
  saturn : 29.447498,
  uranus : 84.016846,
  mercury : 0.2408467,
  neptune : 164.79132, 
  jupiter : 11.862615
} as const;

const PLANETS = Object.keys(
  PLANETS_ORBITAL_PERIOD_IN_EARTH_YEARS
) as (keyof typeof PLANETS_ORBITAL_PERIOD_IN_EARTH_YEARS)[];

type Planet = typeof PLANETS[number];


export var age = (planet: Planet, seconds: number): number => +
  (seconds / 
  (
    PLANETS_ORBITAL_PERIOD_IN_EARTH_YEARS[planet] * 
    EARTH_ORBITAL_PERIOD_IN_SECS
  ))
  .toFixed(2);
