namespace ja2 {

export function VSetEqual(a: Pointer<vector_3>): vector_3 {
  let c: vector_3;

  //	c.x = a->x;
  //	c.y = a->y;
  //	c.z = a->z;
  memcpy(addressof(c), a, sizeof(vector_3));

  return c;
}

export function VSubtract(a: Pointer<vector_3>, b: Pointer<vector_3>): vector_3 {
  let c: vector_3;

  c.x = a.value.x - b.value.x;
  c.y = a.value.y - b.value.y;
  c.z = a.value.z - b.value.z;

  return c;
}

export function VAdd(a: Pointer<vector_3>, b: Pointer<vector_3>): vector_3 {
  let c: vector_3;

  c.x = a.value.x + b.value.x;
  c.y = a.value.y + b.value.y;
  c.z = a.value.z + b.value.z;

  return c;
}

export function VMultScalar(a: Pointer<vector_3>, b: FLOAT): vector_3 {
  let c: vector_3;

  c.x = a.value.x * b;
  c.y = a.value.y * b;
  c.z = a.value.z * b;

  return c;
}

export function VDivScalar(a: Pointer<vector_3>, b: FLOAT): vector_3 {
  let c: vector_3;

  c.x = a.value.x / b;
  c.y = a.value.y / b;
  c.z = a.value.z / b;

  return c;
}

export function VDotProduct(a: Pointer<vector_3>, b: Pointer<vector_3>): FLOAT {
  return (a.value.x * b.value.x) + (a.value.y * b.value.y) + (a.value.z * b.value.z);
}

function VPerpDotProduct(a: Pointer<vector_3>, b: Pointer<vector_3>): FLOAT {
  return (a.value.x * b.value.x) - (a.value.y * b.value.y) - (a.value.z * b.value.z);
}

export function VCrossProduct(a: Pointer<vector_3>, b: Pointer<vector_3>): vector_3 {
  let c: vector_3;

  c.x = (a.value.y * b.value.z) - (a.value.z * b.value.y);
  c.y = (a.value.x * b.value.z) - (a.value.z * b.value.x);
  c.z = (a.value.x * b.value.y) - (a.value.y * b.value.x);

  return c;
}

function VGetPerpendicular(a: Pointer<vector_3>): vector_3 {
  let c: vector_3;

  c.x = -a.value.y;
  c.y = a.value.x;
  c.z = a.value.z;

  return c;
}

export function VGetLength(a: Pointer<vector_3>): FLOAT {
  return Math.sqrt((a.value.x * a.value.x) + (a.value.y * a.value.y) + (a.value.z * a.value.z));
}

export function VGetNormal(a: Pointer<vector_3>): vector_3 {
  let c: vector_3;
  let OneOverLength: FLOAT;
  let Length: FLOAT;

  Length = VGetLength(a);

  if (Length == 0) {
    c.x = 0;
    c.y = 0;
    c.z = 0;
  } else {
    OneOverLength = 1 / Length;

    c.x = OneOverLength * a.value.x;
    c.y = OneOverLength * a.value.y;
    c.z = OneOverLength * a.value.z;
  }
  return c;
}

}
