export const ONELEVELTYPEONEROOF = 1;
const ONELEVELTYPETWOROOF = 2;

//   Area (pointer to SGP rect) +
//      Location to check-+--|  |       |---- Check left and right edges -----|    |---- Check top and bottom edges -----|
const IsLocationInArea = (x, y, r) => (((x) >= r.value.iLeft) && ((x) <= r.value.iRight) && ((y) >= r.value.iTop) && ((y) <= r.value.iBottom));
