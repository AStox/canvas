import { EntityProps, Entity } from "./Entity";
import { EntityType } from "./EntityType";
import entity from "./Entity";
import { colours } from "./colours";

export interface DestinationProps extends EntityProps {
  strength: number;
}

export interface Destination extends Entity {
  strength: number;
}

const destination = (props: DestinationProps) => {
  let ret: partial<Source> = {
    ...entity(props),
  };
  let { strength, ctx, pos } = props;
  let { draw } = entity(props);
  const minStrength = 2;
  ret.strength = Math.max(strength, minStrength);
  // range = range || 10;

  ret.entityType = EntityType.Destination;

  ret.tick = () => {};

  ret.draw = () => {
    ctx.fillStyle = `rgba(${colours.green}, 1)`;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, ret.strength, 0, Math.PI * 2, true);
    ctx.fill();
  };

  return ret;
};

export default destination;
