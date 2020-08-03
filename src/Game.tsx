import React, { useEffect } from "react";
import forEach from "lodash/forEach";
import pawn from "./Pawn";
import source from "./Source";
import { Entity } from "./Entity";
import { colours } from "./colours";
import destination from "./Destination";
import { EntityType } from "./EntityType";

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

  function beforeTick(sceneObjects: Entity[]) {
    forEach(createList, (createObj) => {
      sceneObjects.push(createObj);
    });
    createList = [];
  }

  function afterTick(sceneObjects: Entity[]) {
    forEach(killList, (killObj) => {
      sceneObjects.splice(sceneObjects.indexOf(killObj), 1);
    });
    killList = [];
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
    const juiceMax = 15;
    for (let i = 0; i < props.count; i++) {
      const sourceObj = source({
        pos: {
          x: Math.floor(Math.random() * canvas.width),
          y: Math.floor(Math.random() * canvas.height),
        },
        juice: Math.random() * juiceMax,
        ...props,
      });
      sceneObjects.push(sourceObj);
    }
  }

  function Run(props: OmniProps) {
    let destinationObj = destination({
      pos: { x: 450, y: 400 },
      juice: 30,
      ...props,
    });
    let pawnObj1 = pawn({
      pos: { x: 200, y: 200 },
      destination: destinationObj,
      ...props,
    });
    let pawnObj2 = pawn({
      pos: { x: 400, y: 200 },
      destination: destinationObj,
      ...props,
    });
    // props.sceneObjects.push(pawnObj1);
    // props.sceneObjects.push(pawnObj2);
    props.sceneObjects.push(destinationObj);
    randomSources({ count: 100, ...props });
    // const sourceObj = source({
    //   pos: {
    //     x: 420,
    //     y: 400,
    //   },
    //   juice: 10,
    //   ...props,
    // });
    // sceneObjects.push(sourceObj);

    setInterval(() => {
      if (play) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frame += 1;

        Tick(props.sceneObjects);
        Draw(props.sceneObjects);
      }
    }, TICKSPEED);
  }
  let play = true;

  useEffect(() => {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas && canvas.getContext) {
      ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      const omniProps = { ctx, canvas, frame, sceneObjects, Kill, Create };
      Run(omniProps);
    }
    canvas.addEventListener("space", () => (play = !play));
  }, []);

  return (
    <canvas id="canvas" height={window.innerHeight} width={window.innerWidth} />
  );
};

export default Game;
