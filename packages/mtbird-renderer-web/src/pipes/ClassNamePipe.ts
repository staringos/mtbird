import { IPipeProps } from "@mtbird/shared";

/**
 * Set componentName to className
 * @param props
 * @returns
 */
const ClassNamePipe = (props: IPipeProps) => {
  const { node } = props;
  node.props.className = node.props.className + " " + node.componentName;

  return { ...props, node };
};

export default ClassNamePipe;
