import { colours } from "./colours";
import { EntityType } from "./EntityType";
import source, { Source, SourceProps } from "./Source";

export interface TrailProps extends SourceProps {}

export interface Trail extends Source {}

const trail = (props: TrailProps) => {
  const { ctx, pos } = props;

  const draw = () => {
    ctx.fillStyle = `rgba(${colours.blue}, 1)`;
    ctx.fillRect(pos.x - ret.dim / 2, pos.y - ret.dim / 2, ret.dim, ret.dim);
  };

  let ret: Trail = {
    ...source(props),
    entityType: EntityType.Trail,
    draw,
    dim: 3,
  };

  return ret;
};

export default trail;
