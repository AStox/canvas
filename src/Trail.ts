import { colours } from "./colours";
import { EntityType } from "./EntityType";
import source, { Source, SourceProps } from "./Source";

export interface TrailProps extends SourceProps {
  strength?: number;
}

export interface Trail extends Source {}

const trail = (props: TrailProps) => {
  const dim = 3;
  const strength = 0.1;

  const sourceProps = source({ ...props, strength });
  sourceProps.entityType = EntityType.Trail;
  const { ctx, pos } = sourceProps;

  const trailDraw = () => {
    // console.log(pos);
    ctx.fillStyle = `rgba(${colours.blue}, 1)`;
    ctx.fillRect(pos.x - dim / 2, pos.y - dim / 2, dim, dim);
  };
  return { ...sourceProps, draw: trailDraw, strength };
};

export default trail;
