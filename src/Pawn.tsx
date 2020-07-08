import Entity, { EntityProps, EntityFunc } from "./Entity";
import { forEach } from "lodash";
import { EntityType } from "./EntityType";

export interface PawnProps extends EntityProps {
  load?: number;
  sight?: number;
}

interface PawnReturn extends PawnProps {
  load?: number;
}

export interface PawnFunc {
  (props: PawnProps): PawnReturn;
}

const Pawn: PawnFunc = (props) => {
  const entityType = EntityType.Pawn;
  const { load, sight, sceneObjects } = props;
  const { pos, move, draw } = Entity(props);
  let dir: Pos2D;

  const tick = () => {
    forEach(sceneObjects, (obj: EntityFunc) => {
      // obj.;
    });
  };

  return {
    ...Entity(props),
    entityType,
    load,
  };
};

export default Pawn;
