type Coordinate = { x : number, y : number };
type Vector = Coordinate;
type PlainOrientation = Coordinate & { angle : number };
type Prism = { id : number } & PlainOrientation;

export function findSequence(start: PlainOrientation, prisms: Prism[]): number[] {
  if(prisms.length < 1) return [];

  const output : number[] = [];
  var laserHEAD : PlainOrientation | null = start;

  while(true) {
    const availablePrisms = prisms.filter(p => !(
      p.x === laserHEAD!.x && p.y === laserHEAD!.y
    ));

    const nextPrism = getClosestColinear(laserHEAD, availablePrisms);
    if(!nextPrism) break;

    output.push(nextPrism.id);

    laserHEAD = {
      x     : nextPrism.x,
      y     : nextPrism.y,
      angle : laserHEAD.angle + nextPrism.angle
    };
  }

  return output;
}

const angleToVector = (angle : number) : Vector => 
  ({
    x : Math.cos(angle * (Math.PI / 180)),
    y : Math.sin(angle * (Math.PI / 180)),
  });

const pointsToVector = <point1 extends Coordinate, point2 extends Coordinate>(origin : point1, target : point2) : Vector =>
  ({
    x : target.x - origin.x,
    y : target.y - origin.y
  });

function normalizeVector(vector : Vector) : Vector {
  const magnitude = getMagnitude(vector);
  return {
    x : vector.x / magnitude,
    y : vector.y / magnitude
  }
}

const getMagnitude = (vector : Vector) : number =>
  Math.sqrt(vector.x**2 + vector.y**2);

function areSameDirectionColinear<point1 extends Coordinate, point2 extends Coordinate>(origin : point1, target : point2, lineVector : Vector) : boolean {
  const rawParsingVector : Vector = {
    x : target.x - origin.x,
    y : target.y - origin.y
  };

  if(getMagnitude(rawParsingVector) < 0.00001) return false;

  const parsingVector = normalizeVector(rawParsingVector);

  const crossProduct = (lineVector.x * parsingVector.y) - (lineVector.y * parsingVector.x);
  const isColinear = Math.abs(crossProduct) < 0.0001;

  const dotProduct = (lineVector.x * parsingVector.x) + (lineVector.y * parsingVector.y);
  const isSameDirection = dotProduct > 0.999;

  return isColinear && isSameDirection;
}

function getClosestColinear(laserHEAD : PlainOrientation, prisms : Prism[]) : Prism | null {
  const lineVector = angleToVector(laserHEAD.angle);
  
  var closestColinear : Prism | null = null;
  var closestColinearDistance = Infinity;
  
  for(var prism of prisms) {
    if (prism.x === laserHEAD.x && prism.y === laserHEAD.y) continue;

    if(!areSameDirectionColinear(laserHEAD, prism, lineVector)) continue;

    const parsingVector = pointsToVector(laserHEAD, prism);
    const currentDistance = getMagnitude(parsingVector);

    if(closestColinear === null || currentDistance < closestColinearDistance) {
      closestColinearDistance = currentDistance;
      closestColinear = prism;
    }
  }

  return closestColinear;
}
