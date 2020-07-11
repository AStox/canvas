import { EntityProps, Entity } from "./Entity";
import { EntityType } from "./EntityType";
import entity from "./Entity";
import { clamp } from "./MathUtils";
import { deflateRaw } from "zlib";
import { createTextChangeRange } from "../node_modules/typescript/lib/typescript";

export interface SourceProps extends EntityProps {
  strength: number;
  range: number;
}

export interface Source extends Entity {
  strength: number;
  range: number;
  falloff(dist: number): number;
}

const source = (props: SourceProps) => {
  let { strength, range, ctx, pos } = props;
  let { draw } = entity(props);
  const minStrength = 2;
  strength = Math.max(strength, minStrength);
  range = range || 10;

  const entityType = EntityType.Source;

  const falloff = (dist: number) => {
    const rangeFactor = Math.max(dist, 0) / range;
    const boost = 100;
    const val = boost / (1 * dist);
    return val;
  };

  const sourceDraw = () => {
    // const count = 1;
    // ctx.fillStyle = `rgba(0, 0, 0, ${0.1 * (1 / count)})`;
    // for (let i = 1; i <= count; i++) {
    //   ctx.beginPath();
    //   ctx.arc(
    //     pos.x,
    //     pos.y,
    //     Math.floor(range / count) * i,
    //     0,
    //     Math.PI * 2,
    //     true
    //   );
    //   ctx.fill();
    // }

    ctx.fillStyle = `rgba(0, 0, 0, 1)`;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, strength, 0, Math.PI * 2, true);
    ctx.fill();
    // draw();
  };

  return {
    ...entity(props),
    entityType,
    strength,
    range,
    falloff,
    draw: sourceDraw,
  };
};

export default source;
