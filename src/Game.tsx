import React, { useState, useEffect } from "react";
import { Map } from "immutable";
import forEach from "lodash/forEach";
import { debug } from "console";

interface Pos2D {
  x: number;
  y: number;
}

interface SceneObject {
  pos: pos2D;
  height: number;
  width: number;
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
  const obj = {
    pos: {
      x: 0,
      y: 0,
    },
    height: 5,
    width: 5,
  };
  let sceneObjects: SceneObject[] = [];

  useEffect(() => {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas && canvas.getContext) {
      ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      // Run();
    }
  }, []);

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
      ctx.fillRect(obj.pos.x, obj.pos.y, obj.height, obj.width);
    });
  }

  function Run() {
    sceneObjects = [...sceneObjects, obj];
    setInterval(() => {
      frame += 1;
      obj.pos = { x: 1 + obj.pos.x, y: 1 + obj.pos.y };
      Draw();
      if (DEBUG) {
        console.log(`frame ${frame}`);
      }
    }, tickSpeed);
  }

  return <canvas id="canvas" height={550} width={550} />;
};

export default Game;
