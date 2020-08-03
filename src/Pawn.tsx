import { forEach, includes } from "lodash";
import entity, { EntityProps, Entity } from "./Entity";
import { Source } from "./Source";
import { EntityType } from "./EntityType";
import { clamp, magnitude, normalize } from "./MathUtils";
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
    ret.sceneObjects.filter(
      (obj: Entity) => obj && filter.includes(obj.entityType)
    ),
    (obj: Entity) => {
      let source = obj as Source;

      let dirToSource = normalize({
        x: source.pos.x - ret.pos.x,
        y: source.pos.y - ret.pos.y,
      });

      let distToSource = magnitude(ret.pos, source.pos);

      if (distToSource < source.juice + ret.dim / 2) {
        if (source.entityType === EntityType.Source) {
          source.juice -= 0.1;
          ret.load += 0.1;
          ret.eating = true;
          if (source.juice <= 0) {
            ret.Kill(source);
          }
        } else if (source.entityType === EntityType.Destination) {
          if (ret.load > 0) {
            ret.eating = true;
            ret.load -= 0.1;
            source.juice += 0.1;
          }
        }
      }

      dirToSource.x *= source.juice * loadFactor * source.falloff(distToSource);
      dirToSource.y *= source.juice * loadFactor * source.falloff(distToSource);
      dir.x += dirToSource.x;
      dir.y += dirToSource.y;
    }
  );
  if (isNaN(dir.x)) dir.x = 0;
  if (isNaN(dir.y)) dir.y = 0;
  return dir;
}

const pawn = (props: PawnProps) => {
  let ret: Pawn = {
    ...entity(props),
    entityType: EntityType.Pawn,
    load: 0,
    dim: 5,
    eating: false,
    destination: props.destination,
    returning: false,
  };
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

  const trailDistMax = 25;
  let distToTrail = trailDistMax;
  let trailObj: Trail = undefined;

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

    const loadFactor = clamp(ret.load / maxLoad, 0, 1);
    const sources = SumInfluences(ret, influencersTypes, 1 - loadFactor);
    const base = SumInfluences(ret, destinationTypes, loadFactor);
    x += sources.x + base.x;
    y += sources.y + base.y;

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
      trailObj = trail({ ...props, juice: 0, pos: { x: pos.x, y: pos.y } });
      Create(trailObj);
    }
    if (!ret.eating) move(dir);
  };

  return ret;
};

export default pawn;
