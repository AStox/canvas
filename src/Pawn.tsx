import { Entity, EntityProps } from "Entity";

interface PawnProps extends EntityProps {
  load: number;
  sight: number;
}

const Pawn = (props: PawnProps) => {
  const { load, sight } = props;
  const { pos, move, draw } = Entity(props);

  const tick = () => {};

  return {
    load,
    ...Entity(props),
  };
};

export default Pawn;
