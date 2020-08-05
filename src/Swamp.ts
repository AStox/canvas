import { random } from "lodash";
import entity, { Entity, EntityProps } from "./Entity";

export interface SwampProps extends EntityProps {
  radius: number;
}

export interface Swamp extends Entity {}

const swamp = (props: SwampProps) => {
  let { ctx, pos, radius } = props;
  radius = 100;
  const pt1: Pos2D = { x: pos.x, y: pos.y + radius };
  const pt2: Pos2D = { x: pos.x + radius, y: pos.y };
  const pt3: Pos2D = { x: pos.x, y: pos.y - radius };
  const pt4: Pos2D = { x: pos.x - radius, y: pos.y };

  const point = (start: Pos2D, end: Pos2D, lastCp?: Pos2D) => {
    const max = 100;
    const min = 50;
    let cp1: Pos2D;
    if (lastCp) {
      cp1 = {
        x: start.x + (start.x - lastCp.x),
        y: start.y + (start.y - lastCp.y),
      };
    } else {
      cp1 = {
        x: start.x + (random(1) > 0.5 ? 1 : -1) * random(min, max),
        y: start.y + (random(1) > 0.5 ? 1 : -1) * random(min, max),
      };
    }
    const cp2 = {
      x: end.x + (random(1) > 0.5 ? 1 : -1) * random(min, max),
      y: end.y + (random(1) > 0.5 ? 1 : -1) * random(min, max),
    };
    return { cp1, cp2 };
  };
  const { cp1, cp2 } = point(pt1, pt2);
  const { cp1: cp3, cp2: cp4 } = point(pt2, pt3, cp2);
  const { cp1: cp5, cp2: cp6 } = point(pt3, pt4, cp4);
  const { cp1: cp7, cp2: cp8 } = point(pt4, pt1, cp6);
  const draw = () => {
    ctx.beginPath();
    ctx.moveTo(pt1.x, pt1.y);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, pt2.x, pt2.y);
    ctx.bezierCurveTo(cp3.x, cp3.y, cp4.x, cp4.y, pt3.x, pt3.y);
    ctx.bezierCurveTo(cp5.x, cp5.y, cp6.x, cp6.y, pt4.x, pt4.y);
    ctx.bezierCurveTo(cp7.x, cp7.y, cp8.x, cp8.y, pt1.x, pt1.y);
    ctx.stroke();

    // ctx.fillStyle = "green";
    // ctx.beginPath();
    // ctx.arc(pt2.x, pt2.y, 5, 0, 2 * Math.PI); // Control point one
    // ctx.fill();

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(cp1.x, cp1.y, 5, 0, 2 * Math.PI); // Control point one
    ctx.fill();
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(cp2.x, cp2.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(cp3.x, cp3.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(cp4.x, cp4.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(cp5.x, cp5.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(cp6.x, cp6.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(cp7.x, cp7.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(cp8.x, cp8.y, 5, 0, 2 * Math.PI);
    ctx.fill();
  };

  const ret: Swamp = {
    ...entity(props),
    draw,
  };
  return ret;
};

export default swamp;
