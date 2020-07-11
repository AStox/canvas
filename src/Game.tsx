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
  const TICKSPEED = 16.6;

  let sceneObjects: Entity[] = [];

  function Tick(sceneObjects: Entity[]) {
    forEach(sceneObjects, (obj: Entity) => {
      obj.tick();
    });
  }

  function Draw(sceneObjects: Entity[]) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    forEach(sceneObjects, (obj: Entity) => {
      obj.draw();
    });
  }

  function Run(props: OmniProps) {
    let pos = { x: 450, y: 400 };
    const pawnObj = pawn({ pos, ...props });
    const sourceObj1 = source({
      pos: { x: 100, y: 200 },
      strength: 5,
      range: 360,
      ...props,
    });
    const sourceObj2 = source({
      pos: { x: 400, y: 250 },
      strength: 1,
      range: 300,
      ...props,
    });
    props.sceneObjects.push(pawnObj);
    props.sceneObjects.push(sourceObj1);
    props.sceneObjects.push(sourceObj2);
    setInterval(() => {
      frame += 1;

      Tick(props.sceneObjects);
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
