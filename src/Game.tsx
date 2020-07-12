import React, { useEffect } from "react";
import forEach from "lodash/forEach";
import pawn from "./Pawn";
import source from "./Source";
import { Entity } from "./Entity";
import { colours } from "./colours";

export interface OmniProps {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  frame: number;
  sceneObjects: Entity[];
  Kill(obj: Entity): void;
  Create(obj: Entity): void;
}

const Game = () => {
  let canvas: HTMLCanvasElement = document.getElementById("canvas");
  let ctx: CanvasRenderingContext2D;
  let frame = 0;
  const TICKSPEED = 16.6;
  // const TICKSPEED = 500;

  let sceneObjects: Entity[] = [];
  let killList: Entity[] = [];
  let createList: Entity[] = [];

  function afterTick(sceneObjects: Entity[]) {
    forEach(killList, (killObj) => {
      sceneObjects.splice(sceneObjects.indexOf(killObj), 1);
      killList.splice(killList.indexOf(killObj), 1);
    });
  }

  function beforeTick(sceneObjects: Entity[]) {
    forEach(createList, (createObj) => {
      sceneObjects.push(createObj);
      createList.splice(createList.indexOf(createObj), 1);
    });
  }

  function Tick(sceneObjects: Entity[]) {
    beforeTick(sceneObjects);
    forEach(sceneObjects, (obj: Entity) => {
      obj.tick();
    });
    afterTick(sceneObjects);
  }

  function Draw(sceneObjects: Entity[]) {
    ctx.fillStyle = `rgba(${colours.background},1)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    forEach(sceneObjects, (obj: Entity) => {
      // console.log(obj.pos);
      obj.draw();
    });
  }

  function Kill(obj: Entity) {
    killList.push(obj);
  }

  function Create(obj: Entity) {
    createList.push(obj);
  }

  function randomSources(props: { count: number } & OmniProps) {
    const strengthMax = 15;
    for (let i = 0; i < props.count; i++) {
      const sourceObj = source({
        pos: {
          x: Math.floor(Math.random() * canvas.width),
          y: Math.floor(Math.random() * canvas.height),
        },
        strength: Math.random() * strengthMax,
        ...props,
      });
      sceneObjects.push(sourceObj);
    }
  }

  function Run(props: OmniProps) {
    let pos = { x: 450, y: 400 };
    let pawnObj = pawn({ pos, ...props });
    props.sceneObjects.push(pawnObj);
    randomSources({ count: 20, ...props });
    // const sourceObj = source({
    //   pos: {
    //     x: 420,
    //     y: 400,
    //   },
    //   strength: 10,
    //   ...props,
    // });
    // sceneObjects.push(sourceObj);

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
      const omniProps = { ctx, canvas, frame, sceneObjects, Kill, Create };
      Run(omniProps);
    }
  }, []);

  return (
    <canvas id="canvas" height={window.innerHeight} width={window.innerWidth} />
  );
};

export default Game;
