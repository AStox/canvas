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
  Kill(obj: Entity): void;
}

const Game = () => {
  let canvas: HTMLCanvasElement = document.getElementById("canvas");
  let ctx: CanvasRenderingContext2D;
  let frame = 0;
  // const TICKSPEED = 16.6;
  const TICKSPEED = 50;

  let sceneObjects: Entity[] = [];
  let killList: Entity[] = [];

  function cleanup(sceneObjects: Entity[]) {
    forEach(killList, (killObj) => {
      sceneObjects.splice(sceneObjects.indexOf(killObj), 1);
      killList.splice(killList.indexOf(killObj), 1);
    });
  }

  function Tick(sceneObjects: Entity[]) {
    forEach(sceneObjects, (obj: Entity) => {
      obj.tick();
    });
    cleanup(sceneObjects);
  }

  function Draw(sceneObjects: Entity[]) {
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    forEach(sceneObjects, (obj: Entity) => {
      obj.draw();
    });
  }

  function Kill(obj: Entity) {
    killList.push(obj);
  }

  function randomSources(props: { count: number } & OmniProps) {
    const strengthMax = 20;
    const rangeMax = 100;
    for (let i = 0; i < props.count; i++) {
      const sourceObj = source({
        pos: {
          x: Math.floor(Math.random() * canvas.width),
          y: Math.floor(Math.random() * canvas.height),
        },
        strength: Math.random() * strengthMax,
        range: 400,
        // range: Math.random() * rangeMax + 500,
        ...props,
      });
      sceneObjects.push(sourceObj);
    }
  }

  function Run(props: OmniProps) {
    let pos = { x: 450, y: 400 };
    let pawnObj = pawn({ pos, ...props });
    pawnObj.this = pawnObj;
    props.sceneObjects.push(pawnObj);
    randomSources({ count: 10, ...props });
    setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame += 1;

      Tick(props.sceneObjects);
      Draw(props.sceneObjects);
    }, TICKSPEED);
  }

  useEffect(() => {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas && canvas.getContext) {
      ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      const omniProps = { ctx, canvas, frame, sceneObjects, Kill };
      Run(omniProps);
    }
  }, []);

  return <canvas id="canvas" height={550} width={550} />;
};

export default Game;
