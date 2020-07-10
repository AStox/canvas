import { EntityProps, Entity } from "./Entity";
import { EntityType } from "./EntityType";
import entity from "./Entity";
import { clamp } from "./MathUtils";

export interface SourceProps extends EntityProps {
  strength?: number;
  range?: number;
}

export interface Source extends Entity {
  strength: number;
  range: number;
  falloff(dist: number): number;
}

const source = (props: SourceProps) => {
  let { strength, range } = props;
  strength = strength || 1;
  range = range || 10;
  const entityType = EntityType.Source;

  const falloff = (dist: number) => {
    const val = 1 - clamp(Math.pow(dist, 4), 0, 1);
    return val;
  };

  return {
    ...entity(props),
    entityType,
    strength,
    range,
    falloff,
  };
};

export default source;
