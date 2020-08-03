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
}

// export interface EntityFunc {
//   (props: EntityProps): EntityReturn;
// }

let entity = function (props: EntityProps) {
  let { pos, ctx } = props;

  const move = (newPos: Pos2D) => {
    pos.x += newPos.x;
    pos.y += newPos.y;
  };

  const draw = () => {
    ctx.fillStyle = `rgba(256, 256, 256, 1)`;
    ctx.fillRect(pos.x, pos.y, dim, dim);
  };

  const tick = () => {};

  let ret: Entity = {
    ...props,
    entityType: EntityType.Entity,
    dim: 5,
    move,
    draw,
    tick,
    killed: false,
  };

  let { dim } = ret;

  return ret;
};

export default entity;
