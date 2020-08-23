import { colours } from "../colours";
import entity from "./Entity";
import { EntityType } from "../EntityType";
import source, { Source, SourceProps } from "./Source";

export type SugarProps = Omit<SourceProps, "strength"> & {
  juice: number;
};
export interface Sugar extends Source {
  juice: number;
}

const sugar = (props: SugarProps) => {
  const { juice, ctx, pos } = props;

  const ret: Sugar = {
    ...source({ ...props, strength: juice }),
    juice,
  };
  ret.entityType = [...ret.entityType, EntityType.Sugar];
  ret.draw = () => {
    ret.radius = juice;
    ctx.fillStyle = `rgba(${colours.yellow}, 1)`;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, Math.max(ret.radius, 0), 0, Math.PI * 2, true);
    ctx.fill();
  };

  return ret;
};

export default sugar;
