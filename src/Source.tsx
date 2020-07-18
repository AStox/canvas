import { EntityProps, Entity } from "./Entity";
import { EntityType } from "./EntityType";
import entity from "./Entity";
import { clamp } from "./MathUtils";
import { deflateRaw } from "zlib";
import { createTextChangeRange } from "../node_modules/typescript/lib/typescript";
import { colours } from "./colours";

export interface SourceProps extends EntityProps {
  strength: number;
}

export interface Source extends Entity {
  strength: number;
  range: number;
  falloff(dist: number): number;
}

const source = (props: SourceProps) => {
  let ret: Partial<Source> = {
    ...entity(props),
  };
  let { strength, ctx, pos } = props;
  let { draw } = ret;
  const minStrength = 2;
  ret.strength = Math.max(strength, minStrength);
  // range = range || 10;
  ret.range = strength * 1.8;

  ret.entityType = EntityType.Source;

  ret.falloff = (dist: number) => {
    const boost = strength * 30;
    const val = boost / (1 * dist);
    return val;
  };

  ret.tick = () => {};

  ret.draw = () => {
    // Range circle
    // const count = 8;
    // ctx.fillStyle = `rgba(${colours.yellowOrange}, ${0.3 * (1 / count)})`;
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

    ctx.fillStyle = `rgba(${colours.yellow}, 1)`;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, ret.strength, 0, Math.PI * 2, true);
    ctx.fill();
  };

  return ret;
};

export default source;
