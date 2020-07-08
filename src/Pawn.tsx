import { forEach } from "lodash";
import entity, { EntityProps, Entity } from "./Entity";
import { EntityType } from "./EntityType";

export interface PawnProps extends EntityProps {
  load?: number;
  sight?: number;
}

export interface Pawn extends PawnProps {
  load?: number;
  tick(): void;
}

const pawn = (props: PawnProps) => {
  const entityType = EntityType.Pawn;
  const { load, sight, sceneObjects } = props;
  const { pos, move, tick } = entity(props);
  let dir = { x: 0, y: 0 };

  const _tick = () => {
    forEach(sceneObjects, (obj: Entity) => {
      if (obj.entityType === EntityType.Source) {
        const FACTOR = 0.01;
        dir.x = (obj.pos.x - pos.x) * FACTOR;
        dir.y = (obj.pos.y - pos.y) * FACTOR;
      }
    });
    move(dir);
    tick();
  };

  return {
    ...entity(props),
    entityType,
    load,
    tick: _tick,
  };
};

export default pawn;
