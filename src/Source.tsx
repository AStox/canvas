import Entity, { EntityProps, EntityFunc } from "./Entity";
import { EntityType } from "./EntityType";

export interface SourceProps extends EntityProps {
  strength?: number;
  range?: number;
  falloff?: number;
}

interface SourceReturn extends SourceProps {}

export interface SourceFunc {
  (props: SourceProps): SourceReturn;
}

const Source: SourceFunc = (props) => {
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
