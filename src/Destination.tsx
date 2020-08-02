import { EntityProps, Entity } from "./Entity";
import { EntityType } from "./EntityType";
import entity from "./Entity";
import { colours } from "./colours";
import pawn from "./Pawn";

export interface DestinationProps extends EntityProps {
  juice: number;
}

export interface Destination extends Entity {
  juice: number;
}

const destination = (props: DestinationProps) => {
  let ret: Partial<Destination> = {
    ...entity(props),
  };
  let { ctx, pos, Create, juice } = ret;

  ret.entityType = EntityType.Destination;

  ret.tick = () => {
    if (juice >= 10) {
      let pawnObj = pawn({
        ...props,
        pos: { x: pos.x, y: pos.y },
        destination: ret,
      });
      Create(pawnObj);
      juice -= 10;
    }
  };

  ret.draw = () => {
    ctx.fillStyle = `rgba(${colours.green}, 1)`;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, juice + 10, 0, Math.PI * 2, true);
    ctx.fill();
  };

  return ret;
};

export default destination;
