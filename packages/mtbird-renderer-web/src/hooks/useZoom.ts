import { useMemo } from "react";
import { getZoom } from "@mtbird/core";

import useWindowSize from "./useWindowSize";

const useZoom = (standardWidth?: number | undefined) => {
  const windowSize = useWindowSize();

  return useMemo(() => getZoom(standardWidth), [windowSize, standardWidth]);
};

export default useZoom;
