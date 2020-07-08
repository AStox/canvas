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

  const pawnTick = () => {
    let dir = { x: 0, y: 0 };
    let sourceCount = 0;
    forEach(sceneObjects, (obj: Entity) => {
      if (obj.entityType === EntityType.Source) {
        sourceCount += 1;
        const FACTOR = 0.01;
        let dirToSource = {
          x: (obj.pos.x - pos.x) * FACTOR,
          y: (obj.pos.y - pos.y) * FACTOR,
        };
      }
    });
    dir = { x: dir.x / sourceCount, y: dir.y / sourceCount };
    move(dir);
    tick();
  };

  return {
    ...entity(props),
    entityType,
    load,
    tick: pawnTick,
  };
};

export default pawn;
