import * as Components from './';
import values from 'lodash/values';
import mapValues from 'lodash/mapValues';
import keyBy from 'lodash/keyBy';

let manifests;
const getManifests = () => {
  if (!manifests) {
    const manifestsList = values(Components).map((cur) => cur.manifest);
    manifests = mapValues(keyBy(manifestsList, 'componentName'));
  }

  return manifests;
};

export default getManifests;
