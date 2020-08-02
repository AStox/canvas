import { colours } from "./colours";
import { EntityType } from "./EntityType";
import source, { Source, SourceProps } from "./Source";

export interface TrailProps extends SourceProps {
  juice?: number;
}

export interface Trail extends Source {}

const trail = (props: TrailProps) => {
  const dim = 3;
  const juice = 0.1;

  const sourceProps = source({ ...props, juice: juice });
  sourceProps.entityType = EntityType.Trail;
  const { ctx, pos } = sourceProps;

  const trailDraw = () => {
    // console.log(pos);
    ctx.fillStyle = `rgba(${colours.blue}, 1)`;
    ctx.fillRect(pos.x - dim / 2, pos.y - dim / 2, dim, dim);
  };
  return { ...sourceProps, draw: trailDraw, juice };
};

export default trail;
