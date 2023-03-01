import { IPipeProps } from "@mtbird/shared";
import { generateFunction } from "../../../mtbird-core/src/utils";
import get from "lodash/get";
import keys from "lodash/keys";

import { safeEval } from "@mtbird/core";

/**
 * If parent.layout is flex, then positon: relative and flex: 1;
 * @param props
 * @returns
 */
const ExtensionPipesPipe = (props: IPipeProps) => {
  const { node } = props;
  const windowGlobal = window as any;
  const renderPipes = get(node, "pipes.render");

  keys(renderPipes).forEach((pipeName: string) => {
    const handler = renderPipes[pipeName].handler;

    if (!windowGlobal[pipeName]) {
      safeEval(handler);
    }

    const pipeFn = windowGlobal[pipeName];

    if (pipeFn) {
      props = pipeFn(props);
    }
  });

  return props;
};

export default ExtensionPipesPipe;
