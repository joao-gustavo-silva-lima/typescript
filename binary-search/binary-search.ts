export function find(haystack: number[], needle: number): number {
  var low  = 0;
  var high = haystack.length - 1;
  
  while(low <= high) {
    const mid  = Math.floor((high + low) / 2);

    if(haystack[mid] === needle) {
      return mid;
    }  
    if(needle < haystack[mid]) {
      high = mid - 1;
    }
    else {
      low = mid + 1;
    }
  }

  throw new Error("Value not in array");
}
