const basicAPI = '/api';

export const getProvince = async () => {
  const response = await fetch(`${basicAPI}/common/region/provinces`);
  const province = await response.json();
  return province;
};

export const getRegions = async (parentId: number | undefined) => {
  if (!parentId) return [];
  const response = await fetch(`${basicAPI}/common/region/regions?parentId=${parentId}`);
  const regions = await response.json();
  return regions;
};
