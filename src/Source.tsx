import Entity, { EntityProps } from "./Entity";

interface SourceProps extends EntityProps {
  strength?: number;
  range?: number;
  falloff?: number;
}

const Source = (props: SourceProps) => {
  const { strength, range, falloff } = props;
  return {
    strength,
    range,
    falloff,
    ...Entity(props),
  };
};

export default Source;
