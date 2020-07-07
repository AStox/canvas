import React, { useState, useEffect } from "react";
import { Map } from "immutable";
import forEach from "lodash/forEach";
import Pawn from "./Pawn";
import Source from "./Source";

export interface OmniProps {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  frame: number;
  sceneObjects: SceneObject[];
}

const Game = () => {
  let canvas: HTMLCanvasElement = document.getElementById("canvas");
  let ctx: CanvasRenderingContext2D;
  let frame = 0;
  const TICKSPEED = 20;

  let sceneObjects: SceneObject[] = [];

  useEffect(() => {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas && canvas.getContext) {
      ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      const omniProps = { ctx, canvas, frame, sceneObjects };
      Run(omniProps);
    }
  }, []);

  function Run(props: OmniProps) {
    let pos = { x: 450, y: 400 };
    const pawn = Pawn({ pos, ...props });
    pos = { x: 100, y: 200 };
    const source = Source({ pos, ...props });
    sceneObjects = [...sceneObjects, pawn, source];
    setInterval(() => {
      frame += 1;

      Draw();
    }, TICKSPEED);
  }

  function Draw() {
    // ctx.fillStyle = "rgb(200, 0, 0)";
    // ctx.fillRect(10, 10, 50, 50);

    // ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    // ctx.fillRect(30, 30, 50, 50);

    // ctx.fillRect(25, 25, 100, 100);
    // ctx.clearRect(45, 45, 60, 60);
    // ctx.strokeRect(50, 50, 50, 50);
    ctx.clearRect(
      0,
      0,
      parseInt(canvas.style.height),
      parseInt(canvas.style.width)
    );
    forEach(sceneObjects, (obj: SceneObject) => {
      obj.draw(ctx);
    });
  }

  return <canvas id="canvas" height={550} width={550} />;
};

export default Game;
