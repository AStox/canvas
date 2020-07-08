import { OmniProps } from "./Game";
import { EntityType } from "./EntityType";

export interface EntityProps extends OmniProps {
  pos: Pos2D;
}

export interface Entity extends EntityProps {
  entityType: EntityType;
  move(newPos: Pos2D): void;
  tick(): void;
}

// export interface EntityFunc {
//   (props: EntityProps): EntityReturn;
// }

const entity = (props: EntityProps) => {
  const entityType = EntityType.Entity;
  let { pos, ctx } = props;
  pos = pos || { x: 1, y: 1 };
  const dim = { height: 5, width: 5 };

  //   console.log(pos);
  const move = (newPos: Pos2D) => {
    // console.log(pos);
    pos.x += newPos.x;
    pos.y += newPos.y;
  };

  const draw = () => {
    ctx.fillRect(pos.x, pos.y, dim.height, dim.width);
  };

  const tick = () => {
    draw();
  };

  return {
    ...props,
    entityType,
    pos,
    tick,
    move,
  };
};

export default entity;
