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
  const { pos, move, tick, ctx, Kill } = entity(props);
  const maxSpeed = 2;
  const minSpeed = 1;
  const reach = 5;

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

        if (distToSource < reach) {
          Kill(source);
        }
        dirToSource.x *= source.strength * source.falloff(distToSource);
        dirToSource.y *= source.strength * source.falloff(distToSource);
        x += dirToSource.x;
        y += dirToSource.y;

        // SOURCE DEBUG LINES
        // ctx.strokeStyle = `rgba(256, 0, 0, 1)`;
        // ctx.beginPath();
        // ctx.moveTo(pos.x, pos.y);
        // ctx.lineTo(pos.x + dirToSource.x * 100, pos.y + dirToSource.y * 100);
        // ctx.stroke();
      }
    });
    let dir = { x, y };

    // DIR DEBUG LINE
    // ctx.strokeStyle = `rgba(0, 0, 256, 1)`;
    // ctx.beginPath();
    // ctx.moveTo(pos.x, pos.y);
    // ctx.lineTo(pos.x + dir.x * 10, pos.y + dir.y * 10);
    // ctx.stroke();

    if (magnitude(dir) < minSpeed) {
      dir.x = normalize(dir).x * minSpeed;
      dir.y = normalize(dir).y * minSpeed;
    }
    dir = {
      x:
        normalize(dir).x *
        Math.max(Math.min(magnitude(dir), maxSpeed), minSpeed),
      y:
        normalize(dir).y *
        Math.max(Math.min(magnitude(dir), maxSpeed), minSpeed),
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
