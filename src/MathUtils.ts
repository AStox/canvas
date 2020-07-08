export function magnitude(pos1: Pos2D, pos2?: Pos2D) {
  if (!pos2) {
    pos2 = pos1;
    pos1 = { x: 0, y: 0 };
  }
  let a = pos2.x - pos1.x;
  let b = pos2.y - pos1.y;
  let c = Math.sqrt(a * a + b * b);
  return c;
}

export function normalize(vector: Pos2D) {
  let mag = magnitude(vector);
  let x = vector.x / mag;
  let y = vector.y / mag;
  return { x, y };
}
