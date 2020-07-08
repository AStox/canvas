import Entity, { EntityProps } from "./Entity";
import { EntityType } from "./EntityType";
import entity from "./Entity";

export interface SourceProps extends EntityProps {
  strength?: number;
  range?: number;
  falloff?: number;
}

export interface Source extends SourceProps {}

const source = (props: SourceProps) => {
  const { strength, range, falloff } = props;
  const entityType = EntityType.Source;
  return {
    ...entity(props),
    entityType,
    strength,
    range,
    falloff,
  };
};

export default source;
