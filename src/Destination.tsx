import { EntityType } from "./EntityType";
import { colours } from "./colours";
import pawn from "./Pawn";
import source, { Source, SourceProps } from "./Source";

export interface DestinationProps extends SourceProps {
  juice: number;
}

export interface Destination extends Source {
  juice: number;
}

const destination = (props: DestinationProps) => {
  const { ctx, pos } = props;
  const juiceMin = 5;
  const pawnCost = 30;
  const tick = () => {
    ret.juice = Math.max(ret.juice, juiceMin);
    if (ret.juice >= pawnCost) {
      ret.juice -= pawnCost;
      const pawnObj = pawn({
        ...props,
        pos: { x: pos.x, y: pos.y },
        destination: ret,
      });
      ret.Create(pawnObj);
    }
  };

  const draw = () => {
    ctx.fillStyle = `rgba(${colours.green}, 1)`;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, ret.juice, 0, Math.PI * 2, true);
    ctx.fill();
    // ctx.beginPath();
    // ctx.arc(pos.x, pos.y, pawnCost, 0, Math.PI * 2, true);
    // ctx.stroke();
  };

  const ret: Destination = {
    ...source(props),
    entityType: EntityType.Destination,
    draw,
    tick,
    layer: 2,
  };

  return ret;
};

export default destination;
