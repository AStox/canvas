import entity, { EntityProps, Entity } from "./Entity";
import { EntityType } from "../EntityType";

export interface SourceProps extends EntityProps {
  strength: number;
}

export interface Source extends Entity {
  strength: number;
  falloff(dist: number): number;
}

const source = (props: SourceProps) => {
  const { strength } = props;

  const falloff = (dist: number) => {
    const boost = ret.strength * 30;
    const val = boost / (1 * dist);
    return val;
  };

  let ret: Source = {
    ...entity(props),
    falloff,
    strength,
  };

  ret.entityType = [...ret.entityType, EntityType.Source];

  return ret;
};

export default source;
