const basicAPI = '/api';

export const getProvince = async () => {
  let path = `${basicAPI}/common/region/provinces`;

  if (location.href.indexOf(HOST) === -1 && location.href.indexOf(':8888/') === -1) {
    path = `${HOST}${path}`;
  }

  const response = await fetch(path);
  const province = await response.json();
  return province;
};

const HOST = 'https://mtbird.staringos.com';

export const getRegions = async (parentId: number | undefined) => {
  if (!parentId) return [];

  let path = `${basicAPI}/common/region/regions?parentId=${parentId}`;

  if (location.href.indexOf(HOST) === -1 && location.href.indexOf(':8888/') === -1) {
    path = `${HOST}${path}`;
  }

  const response = await fetch(path);
  const regions = await response.json();
  return regions;
};
