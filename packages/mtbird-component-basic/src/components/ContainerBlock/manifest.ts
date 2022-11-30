import type { IComponentManifest, IComponentInstanceForm } from '@mtbird/shared';
import { COMPONENT } from '@mtbird/core';
const { SCHEMA_CONTAINER_BASIC_STYLE, SCHEMA_HEIGHT } = COMPONENT;

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: 'container',
  componentName: 'ContainerBlock',
  title: '区块',
  icon: 'mtbird-qukuai',
  desc: '',
  schema: [...SCHEMA_CONTAINER_BASIC_STYLE, SCHEMA_HEIGHT],
  category: 'basic',
  subCategory: 'container',
  instance: {
    type: 'container',
    componentName: 'ContainerBlock',
    props: {
      style: {
        position: 'relative',
        height: 500
      }
    },
    children: []
  }
};

export default manifest;
