import React, { useState, useEffect } from "react";
import { Map } from "immutable";
import forEach from "lodash/forEach";
import { debug } from "console";
import Entity from "./Entity";

interface Pos2D {
  x: number;
  y: number;
}

interface SceneObject {
  pos: pos2D;
  draw(): void;
}

interface Scene {
  objects: SceneObject[];
}

const Game = () => {
  let canvas: HTMLCanvasElement = document.getElementById("canvas");
  let ctx: CanvasRenderingContext2D;
  const DEBUG = false;
  let frame = 0;
  const tickSpeed = 1;
  const rect = { x: 5, y: 5 };
  const pos = { x: 10, y: 10 };
  const obj = Entity();
  let sceneObjects: SceneObject[] = [];

  useEffect(() => {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas && canvas.getContext) {
      ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      Run();
    }
  }, []);

  function Run() {
    sceneObjects = [...sceneObjects, obj];
    setInterval(() => {
      frame += 1;
      obj.move({ x: 1, y: 1 });
      Draw();
      if (DEBUG) {
        console.log(`frame ${frame}`);
      }
    }, tickSpeed);
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
