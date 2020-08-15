import { OmniProps } from "./Game";
import { EntityType } from "./EntityType";

export interface EntityProps extends OmniProps {
  pos: Pos2D;
}

export interface Entity extends EntityProps {
  entityType: EntityType;
  dim: number;
  move(newPos: Pos2D): void;
  tick(): void;
  draw(): void;
  killed: boolean;
  layer: number;
}

const entity = (props: EntityProps) => {
  const { pos, ctx } = props;

  const move = (newPos: Pos2D) => {
    pos.x += newPos.x;
    pos.y += newPos.y;
  };

  const draw = () => {
    ctx.fillStyle = `rgba(256, 256, 256, 1)`;
    ctx.fillRect(pos.x, pos.y, ret.dim, ret.dim);
  };

  const tick = () => {};

  const ret: Entity = {
    ...props,
    entityType: EntityType.Entity,
    dim: 5,
    move,
    draw,
    tick,
    killed: false,
    layer: 1,
  };

  return ret;
};

export default entity;
