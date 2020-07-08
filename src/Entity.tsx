import { OmniProps } from "./Game";
import { EntityType } from "./EntityType";

export interface EntityProps extends OmniProps {
  pos: Pos2D;
}

interface EntityReturn extends EntityProps {
  entityType: EntityType;
  move(newPos: Pos2D): void;
  draw(): void;
}

export interface EntityFunc {
  (props: EntityProps): EntityReturn;
}

const Entity: EntityFunc = (props) => {
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

  return {
    ...props,
    entityType,
    pos,
    move,
    draw,
  };
};

export default Entity;
