import Entity, { EntityProps } from "./Entity";
import { EntityType } from "./EntityType";

export interface SourceProps extends EntityProps {
  strength?: number;
  range?: number;
  falloff?: number;
}

export interface SourceReturn extends SourceProps {}

const Source = (props: SourceProps) => {
  const { strength, range, falloff } = props;
  const entityType = EntityType.Source;
  return {
    ...Entity(props),
    entityType,
    strength,
    range,
    falloff,
  };
};

export default Source;
