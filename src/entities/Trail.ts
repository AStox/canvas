import { colours } from "../colours";
import { EntityType } from "../EntityType";
import source, { Source, SourceProps } from "./Source";

export interface TrailProps extends SourceProps {}

export interface Trail extends Source {}

const trail = (props: TrailProps) => {
  const { ctx, pos } = props;

  const draw = () => {
    ctx.fillStyle = `rgba(${colours.blue}, 1)`;
    ctx.fillRect(
      pos.x - ret.radius / 2,
      pos.y - ret.radius / 2,
      ret.radius,
      ret.radius
    );
  };

  let ret: Trail = {
    ...source(props),
    draw,
    radius: 3,
  };

  ret.entityType = [...ret.entityType, EntityType.Trail];

  return ret;
};

export default trail;
