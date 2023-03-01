import * as Components from "./";
import values from "lodash/values";
import mapValues from "lodash/mapValues";
import keyBy from "lodash/keyBy";
import { IComponentManifest } from "@mtbird/shared/dist/types";

let manifests: IComponentManifest<any>;
const getManifests = () => {
  if (!manifests) {
    const manifestsList = values(Components).map((cur: any) => cur.manifest);
    manifests = mapValues(keyBy(manifestsList, "componentName"));
  }

  return manifests;
};

export default getManifests;
