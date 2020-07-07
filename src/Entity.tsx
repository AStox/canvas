export interface EntityProps {
  pos: Pos2D;
}

const Entity = ({ pos }: EntityProps) => {
  pos = pos || { x: 1, y: 1 };
  const dim = { height: 2, width: 2 };

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
  };
};

export default Entity;
