interface Pos2D {
  x: number;
  y: number;
}

interface SceneObject {
  pos: pos2D;
  draw(): void;
}

interface Scene {
  objects: SceneObject[];
}
