const Entity = (pos) => {
  //   const pos = iPos || { x: 0, y: 0 };
  const dim = { height: 1, width: 1 };

  const move = (newPos) => {
    pos.x += newPos.x;
    pos.y += newPos.y;
  };

  return {
    pos,
    move,
    draw: (ctx: CanvasRenderingContext2D) => {
      ctx.fillRect(pos.x, pos.y, dim.height, dim.width);
    },
  };
};

export default Entity;
