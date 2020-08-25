import { forEach, includes, intersection } from "lodash";
import { clamp, magnitude, normalize } from "../MathUtils";
import { colours } from "../colours";
import { Entity } from "./Entity";
import source, { Source, SourceProps } from "./Source";
import { EntityType } from "../EntityType";
import trail, { Trail } from "./Trail";
import { Destination } from "./Destination";
import { Sugar } from "./Sugar";

export interface PawnProps extends SourceProps {
  sight?: number;
  destination: Destination;
}

export interface Pawn extends Source {
  load: number;
  tick(): void;
  eating: boolean;
  destination: Destination;
  returning: boolean;
}

// Filters are in the format [[Types to include],[Types to exclude]]
const influencersTypes = [
  [EntityType.Source],
  [EntityType.Destination, EntityType.Pawn],
];
const destinationTypes = [[EntityType.Destination], []];
const pawnTypes = [[EntityType.Pawn], []];
const trailTypes = [[EntityType.Trail], []];

function SumInfluences(ret: Pawn, filter: EntityType[][], loadFactor: number) {
  const dir = { x: 0, y: 0 };
  forEach(
    ret.sceneObjects.filter(
      (obj: Entity) =>
        obj &&
        obj !== ret &&
        intersection(filter[0], obj.entityType).length > 0 &&
        intersection(filter[1], obj.entityType).length === 0
    ),
    (obj: Entity) => {
      const source = obj as Source;
      const dirToSource = normalize({
        x: source.pos.x - ret.pos.x,
        y: source.pos.y - ret.pos.y,
      });

      const distToSource = magnitude(ret.pos, source.pos);
      if (distToSource < source.radius + ret.radius) {
        if (includes(source.entityType, EntityType.Sugar)) {
          const sugar = source as Sugar;
          sugar.juice -= 0.1;
          ret.load += 0.1;
          ret.eating = true;
          if (sugar.juice <= 0) {
            ret.Kill(sugar);
          }
        } else if (includes(source.entityType, EntityType.Destination)) {
          if (ret.load > 0) {
            const dest = source as Destination;
            ret.eating = true;
            ret.load -= 0.1;
            dest.juice += 0.1;
          }
        }
      }
      dirToSource.x *=
        source.strength * loadFactor * source.falloff(distToSource);
      dirToSource.y *=
        source.strength * loadFactor * source.falloff(distToSource);
      dir.x += dirToSource.x;
      dir.y += dirToSource.y;
    }
  );
  if (Number.isNaN(dir.x)) dir.x = 0;
  if (Number.isNaN(dir.y)) dir.y = 0;
  return dir;
}

const pawn = (props: PawnProps) => {
  const ret: Pawn = {
    ...source(props),
    load: 0,
    radius: 5,
    eating: false,
    destination: props.destination,
    returning: false,
    layer: 3,
    strength: -10,
  };
  ret.entityType = [...ret.entityType, EntityType.Pawn];
  const { pos, move, ctx, CreateStatic, radius } = ret;
  const maxSpeed = 2;
  const minSpeed = 0.5;
  const maxLoad = 5;

  const trailDistMax = 25;
  let distToTrail = trailDistMax;
  let trailObj: Trail;

  ret.eating = false;

  ret.draw = () => {
    ctx.fillStyle = `rgba(${colours.turqois}, 1)`;
    ctx.fillRect(pos.x - radius / 2, pos.y - radius / 2, radius, radius);
  };

  ret.tick = () => {
    ret.eating = false;
    let x = 0;
    let y = 0;

    // todo: Make a pawns desire to returning a scaling factor that changes the strength of
    // influencers as load reaches its max.

    const loadFactor = clamp(ret.load / maxLoad, 0, 1);
    const sources = SumInfluences(ret, influencersTypes, 1 - loadFactor);
    const base = SumInfluences(ret, destinationTypes, loadFactor);
    // const trails = SumInfluences(ret, trailTypes, 1);
    const pawns = SumInfluences(ret, pawnTypes, 1 - loadFactor);
    x += sources.x + base.x + pawns.x;
    y += sources.y + base.y + pawns.y;

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
      trailObj = trail({ ...props, strength: 0, pos: { x: pos.x, y: pos.y } });
      CreateStatic(trailObj);
    }
    if (!ret.eating) move(dir);
  };

  return ret;
};

export default pawn;
