import Entity, { EntityProps } from "./Entity";
import { forEach } from "lodash";

interface PawnProps extends EntityProps {
  load?: number;
  sight?: number;
}

const Pawn = (props: PawnProps) => {
  const { load, sight, sceneObjects } = props;
  const { pos, move, draw } = Entity(props);
  let dir: Pos2D;

  const tick = () => {
    forEach(sceneObjects, (obj: SceneObject) => {});
  };

  return {
    load,
    ...Entity(props),
  };
};

export default Pawn;
