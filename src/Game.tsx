import React, { useEffect } from "react";
import { sortBy, forEach } from "lodash";
import source from "./Source";
import { Entity } from "./Entity";
import { colours } from "./colours";
import destination from "./Destination";
import swamp, { SwampProps } from "./Swamp";

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

  const sceneObjects: Entity[] = [];
  const killList: Entity[] = [];
  const createList: Entity[] = [];

  function beforeTick() {
    forEach(createList, (createObj) => {
      sceneObjects.push(createObj);
    });
    createList.splice(0, createList.length);
  }

  function afterTick() {
    forEach(killList, (killObj) => {
      sceneObjects.splice(sceneObjects.indexOf(killObj), 1);
    });
    killList.splice(0, killList.length);
  }

  function Tick() {
    beforeTick();
    forEach(sceneObjects, (obj: Entity) => {
      obj.tick();
    });
    afterTick();
  }

  function Draw() {
    ctx.fillStyle = `rgba(${colours.background},1)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    forEach(sortBy(sceneObjects, "layer"), (obj: Entity) => {
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

  function RandomSwamps(props: SwampProps) {
    const swampObj = swamp({ ...props });
    sceneObjects.push(swampObj);
  }

  let play = true;

  function Run(props: OmniProps) {
    const destinationObj = destination({
      pos: { x: 450, y: 400 },
      juice: 30,
      ...props,
    });
    // const pawnObj1 = pawn({
    //   pos: { x: 200, y: 200 },
    //   destination: destinationObj,
    //   ...props,
    // });
    // const pawnObj2 = pawn({
    //   pos: { x: 400, y: 200 },
    //   destination: destinationObj,
    //   ...props,
    // });
    // props.sceneObjects.push(pawnObj1);
    // props.sceneObjects.push(pawnObj2);
    props.sceneObjects.push(destinationObj);
    randomSources({ count: 100, ...props });
    RandomSwamps({ radius: 50, pos: { x: 250, y: 250 }, ...props });
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

  function togglePlay(e: KeyboardEvent) {
    if (e.key === " ") {
      play = !play;
      e.preventDefault();
    }
  }

  useEffect(() => {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas && canvas.getContext) {
      canvas.focus();
      ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      const omniProps = { ctx, canvas, frame, sceneObjects, Kill, Create };
      Run(omniProps);
    }
    document.addEventListener("keydown", togglePlay);
    return () => {
      document.removeEventListener("keydown", togglePlay);
    };
  }, []);

  return (
    <canvas
      id="canvas"
      tabIndex={0}
      height={window.innerHeight}
      width={window.innerWidth}
    />
  );
};

export default Game;
