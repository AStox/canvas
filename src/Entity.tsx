import { OmniProps } from "./game";

export interface EntityProps extends OmniProps {
  pos?: Pos2D;
}

const Entity = (props: EntityProps) => {
  let { pos } = props;
  pos = pos || { x: 1, y: 1 };
  const dim = { height: 5, width: 5 };

  //   console.log(pos);
  const move = (newPos: Pos2D) => {
    // console.log(pos);
    pos.x += newPos.x;
    pos.y += newPos.y;
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillRect(pos.x, pos.y, dim.height, dim.width);
  };

  return {
    pos,
    move,
    draw,
    ...props,
  };
};

export default Entity;
