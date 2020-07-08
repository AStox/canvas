import React, { useEffect } from "react";
import forEach from "lodash/forEach";
import pawn from "./Pawn";
import source from "./Source";
import { Entity } from "./Entity";

export interface OmniProps {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  frame: number;
  sceneObjects: Entity[];
}

const Game = () => {
  let canvas: HTMLCanvasElement = document.getElementById("canvas");
  let ctx: CanvasRenderingContext2D;
  let frame = 0;
  const TICKSPEED = 50;

  let sceneObjects: Entity[] = [];

  function Draw(sceneObjects: Entity[]) {
    // ctx.fillStyle = "rgb(200, 0, 0)";
    // ctx.fillRect(10, 10, 50, 50);

    // ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    // ctx.fillRect(30, 30, 50, 50);

    // ctx.fillRect(25, 25, 100, 100);
    // ctx.clearRect(45, 45, 60, 60);
    // ctx.strokeRect(50, 50, 50, 50);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    forEach(sceneObjects, (obj: Entity) => {
      obj.tick();
    });
  }

  function Run(props: OmniProps) {
    let pos = { x: 450, y: 400 };
    const pawnObj = pawn({ pos, ...props });
    const sourceObj1 = source({ pos: { x: 100, y: 200 }, ...props });
    const sourceObj2 = source({ pos: { x: 400, y: 250 }, ...props });
    props.sceneObjects.push(pawnObj);
    props.sceneObjects.push(sourceObj1);
    props.sceneObjects.push(sourceObj2);
    setInterval(() => {
      frame += 1;

      Draw(props.sceneObjects);
    }, TICKSPEED);
  }

  useEffect(() => {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas && canvas.getContext) {
      ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      const omniProps = { ctx, canvas, frame, sceneObjects };
      Run(omniProps);
    }
  }, []);

  return <canvas id="canvas" height={550} width={550} />;
};

export default Game;
