import { EntityProps, Entity } from "./Entity";
import { EntityType } from "./EntityType";
import entity from "./Entity";
import { clamp } from "./MathUtils";
import { deflateRaw } from "zlib";
import { createTextChangeRange } from "../node_modules/typescript/lib/typescript";
import { colours } from "./colours";

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
  // range = range || 10;
  range = strength * 2;

  const entityType = EntityType.Source;

  const falloff = (dist: number) => {
    const boost = 100;
    const val = boost / (1 * dist);
    return val;
  };

  const sourceDraw = () => {
    // Range circle
    const count = 8;
    ctx.fillStyle = `rgba(${colours.yellowOrange}, ${0.3 * (1 / count)})`;
    for (let i = 1; i <= count; i++) {
      ctx.beginPath();
      ctx.arc(
        pos.x,
        pos.y,
        Math.floor(range / count) * i,
        0,
        Math.PI * 2,
        true
      );
      ctx.fill();
    }

    ctx.fillStyle = `rgba(${colours.yellow}, 1)`;
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
