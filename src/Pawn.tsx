import { forEach } from "lodash";
import entity, { EntityProps, Entity } from "./Entity";
import { Source } from "./Source";
import { EntityType } from "./EntityType";
import { magnitude, normalize } from "./MathUtils";

export interface PawnProps extends EntityProps {
  load?: number;
  sight?: number;
}

export interface Pawn extends Entity {
  load: number;
  tick(): void;
}

const pawn = (props: PawnProps) => {
  const entityType = EntityType.Pawn;
  const { load, sight, sceneObjects } = props;
  const { pos, move, tick } = entity(props);
  const maxSpeed = 2;

  const pawnTick = () => {
    let x = 0;
    let y = 0;
    forEach(sceneObjects, (obj: Entity) => {
      if (obj.entityType === EntityType.Source) {
        let source = obj as Source;
        let dirToSource = normalize({
          x: source.pos.x - pos.x,
          y: source.pos.y - pos.y,
        });
        let distToSource = magnitude(pos, source.pos);
        x += dirToSource.x * source.strength * source.falloff(distToSource);
        y += dirToSource.y * source.strength * source.falloff(distToSource);
      }
    });
    let dir = { x, y };
    dir = {
      x: normalize(dir).x * Math.min(magnitude(dir), maxSpeed),
      y: normalize(dir).y * Math.min(magnitude(dir), maxSpeed),
    };
    move(dir);
    tick();
  };

  return {
    ...entity(props),
    entityType,
    load,
    tick: pawnTick,
  };
};

export default pawn;
