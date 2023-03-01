import { IPipeProps } from "@mtbird/shared";
import { generateFunction } from "@mtbird/core";

/**
 * If parent.layout is flex, then positon: relative and flex: 1;
 * @param props
 * @returns
 */
const PatternDisplayPipe = (props: IPipeProps) => {
  const { node, dataSource, formId, parent } = props;
  let display = true;

  if (!dataSource || !dataSource.getValue) return { ...props, display };

  const realValue = dataSource.getValue(formId || "0.");

  try {
    // display or not
    if (node.pattern && node.pattern.display) {
      display = generateFunction(node.pattern.display)(realValue, dataSource);
    }
  } catch (e) {}

  return { ...props, display };
};

export default PatternDisplayPipe;
