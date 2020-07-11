import { OmniProps } from "./Game";
import { EntityType } from "./EntityType";

export interface EntityProps extends OmniProps {
  pos: Pos2D;
}

export interface Entity extends EntityProps {
  entityType: EntityType;
  move(newPos: Pos2D): void;
  tick(): void;
  draw(): void;
  kill(): void;
}

// export interface EntityFunc {
//   (props: EntityProps): EntityReturn;
// }

let entity = function (props: EntityProps) {
  // entity = entity.bind(entity);
  const entityType = EntityType.Entity;
  let { pos, ctx, killList } = props;
  pos = pos || { x: 1, y: 1 };
  const dim = { height: 5, width: 5 };

  const move = (newPos: Pos2D) => {
    pos.x += newPos.x;
    pos.y += newPos.y;
  };

  const draw = () => {
    ctx.fillStyle = `rgba(0, 0, 0, 1)`;
    ctx.fillRect(pos.x, pos.y, dim.height, dim.width);
  };

  const tick = () => {};

  return {
    ...props,
    entityType,
    pos,
    tick,
    draw,
    move,
  };
};

export default entity;
