import { forEach, includes } from "lodash";
import entity, { EntityProps, Entity } from "./Entity";
import { Source } from "./Source";
import { EntityType } from "./EntityType";
import { magnitude, normalize } from "./MathUtils";
import { colours } from "./colours";
import trail, { Trail } from "./Trail";
import { Destination } from "./Destination";

export interface PawnProps extends EntityProps {
  sight?: number;
  destination: Destination;
}

export interface Pawn extends Entity {
  load: number;
  tick(): void;
  eating: boolean;
  destination: Destination;
  returning: boolean;
}

const influencersTypes = [EntityType.Source];
const destinationTypes = [EntityType.Destination];

function SumInfluences(ret: Pawn, filter: EntityType[], loadFactor: number) {
  let dir = { x: 0, y: 0 };
  forEach(
    ret.sceneObjects.filter((obj: Entity) => filter.includes(obj.entityType)),
    (obj: Entity) => {
      let source = obj as Source;

      let dirToSource = normalize({
        x: source.pos.x - ret.pos.x,
        y: source.pos.y - ret.pos.y,
      });

      let distToSource = magnitude(ret.pos, source.pos);

      if (source.entityType === EntityType.Source) {
        if (distToSource < source.juice + ret.dim / 2) {
          source.juice -= 0.1;
          ret.load += 0.1;
          ret.eating = true;
          if (source.juice <= 0) {
            ret.Kill(source);
          }
        }

        dirToSource.x *=
          source.juice * loadFactor * source.falloff(distToSource);
        dirToSource.y *=
          source.juice * loadFactor * source.falloff(distToSource);
        dir.x += dirToSource.x;
        dir.y += dirToSource.y;
      }
      // SOURCE DEBUG LINES
      // ctx.strokeStyle = `rgba(256, 0, 0, 1)`;
      // ctx.beginPath();
      // ctx.moveTo(pos.x, pos.y);
      // ctx.lineTo(pos.x + dirToSource.x * 100, pos.y + dirToSource.y * 100);
      // ctx.stroke();
    }
  );
  return dir;
}

const pawn = (props: PawnProps) => {
  let ret: Partial<Pawn> = {
    ...entity(props),
  };
  ret.entityType = EntityType.Pawn;
  ret.load = 0;
  ret.dim = 5;
  ret.destination = props.destination;
  ret.returning = false;
  const { sight } = props;
  const {
    pos,
    move,
    ctx,
    Kill,
    Create,
    sceneObjects,
    load,
    dim,
    destination,
  } = ret;
  const maxSpeed = 2;
  const minSpeed = 0.5;
  const maxLoad = 5;

  const trailDistMax = 5;
  let distToTrail = trailDistMax;
  let trailObj: Trail = null;

  ret.eating = false;

  ret.draw = () => {
    ctx.fillStyle = `rgba(${colours.turqois}, 1)`;
    ctx.fillRect(pos.x - dim / 2, pos.y - dim / 2, dim, dim);
  };

  ret.tick = () => {
    ret.eating = false;
    let x = 0;
    let y = 0;

    //todo: Make a pawns desire to returning a scaling factor that changes the strength of
    // influencers as load reaches its max.

    const loadFactor = ret.load / maxLoad;
    const sources = SumInfluences(ret, influencersTypes, 1 - loadFactor);
    const base = SumInfluences(ret, destinationTypes, loadFactor);
    x += sources.x;
    y += sources.y;

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
