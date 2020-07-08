import { forEach } from "lodash";
import Entity, { EntityProps } from "./Entity";
import { EntityType } from "./EntityType";

export interface PawnProps extends EntityProps {
  load?: number;
  sight?: number;
}

export interface Pawn extends PawnProps {
  load?: number;
}

const Pawn = (props: PawnProps) => {
  const entityType = EntityType.Pawn;
  const { load, sight, sceneObjects } = props;
  const { pos, move, draw } = Entity(props);
  let dir: Pos2D;

  const tick = () => {
    forEach(sceneObjects, (obj: EntityFunc) => {
      obj.;
    });
  };

  return {
    ...Entity(props),
    entityType,
    load,
  };
};

export default Pawn;
