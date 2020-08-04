import entity, { EntityProps, Entity } from "./Entity";
import { EntityType } from "./EntityType";
import { colours } from "./colours";

export interface SourceProps extends EntityProps {
  juice: number;
}

export interface Source extends Entity {
  juice: number;
  falloff(dist: number): number;
}

const source = (props: SourceProps) => {
  const { juice, ctx, pos } = props;

  const falloff = (dist: number) => {
    const boost = juice * 30;
    const val = boost / (1 * dist);
    return val;
  };

  const draw = () => {
    ctx.fillStyle = `rgba(${colours.yellow}, 1)`;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, Math.max(ret.juice, 0), 0, Math.PI * 2, true);
    ctx.fill();
  };

  let ret: Source = {
    ...entity(props),
    entityType: EntityType.Source,
    juice,
    falloff,
    draw,
  };

  return ret;
};

export default source;
