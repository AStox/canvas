import { forEach, includes } from "lodash";
import entity, { EntityProps, Entity } from "./Entity";
import { Source } from "./Source";
import { EntityType } from "./EntityType";
import { magnitude, normalize } from "./MathUtils";
import { colours } from "./colours";
import { transpile } from "../node_modules/typescript/lib/typescript";
import trail, { Trail } from "./Trail";

export interface PawnProps extends EntityProps {
  load?: number;
  sight?: number;
}

export interface Pawn extends Entity {
  load: number;
  tick(): void;
  eating: boolean;
}

const pawn = (props: PawnProps) => {
  let ret: Partial<Pawn> = {
    ...entity(props),
  };
  ret.entityType = EntityType.Pawn;
  const { load, sight, sceneObjects } = props;
  const { pos, move, ctx, Kill, Create } = ret;
  const maxSpeed = 2;
  const minSpeed = 0.5;
  const dim = 5;

  const trailDistMax = 5;
  let distToTrail = trailDistMax;
  let trailObj: Trail = null;

  ret.eating = false;

  ret.draw = () => {
    ctx.fillStyle = `rgba(${colours.turqois}, 1)`;
    ctx.fillRect(pos.x - dim / 2, pos.y - dim / 2, dim, dim);
  };

  ret.tick = () => {
    let x = 0;
    let y = 0;
    ret.eating = false;
    forEach(sceneObjects, (obj: Entity) => {
      const influencers = [EntityType.Source];
      if (influencers.includes(obj.entityType)) {
        let source = obj as Source;
        let dirToSource = normalize({
          x: source.pos.x - pos.x,
          y: source.pos.y - pos.y,
        });

        let distToSource = magnitude(pos, source.pos);
        if (source.entityType === EntityType.Source) {
          if (distToSource < source.strength + dim / 2) {
            // source.changeStrength(-1);
            source.strength -= 0.1;
            ret.eating = true;
            if (source.strength <= 0) {
              Kill(source);
            }
          }

          dirToSource.x *= source.strength * source.falloff(distToSource);
          dirToSource.y *= source.strength * source.falloff(distToSource);
          x += dirToSource.x;
          y += dirToSource.y;
        }
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

    if (trailObj) {
      distToTrail = magnitude(ret.pos, trailObj.pos);
    }
    if (distToTrail >= trailDistMax) {
      trailObj = trail({ ...props, pos: { x: pos.x, y: pos.y } });
      Create(trailObj);
    }
    if (!ret.eating) move(dir);
  };

  return ret;
};

export default pawn;
