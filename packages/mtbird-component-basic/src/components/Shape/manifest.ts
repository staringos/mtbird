import type { IComponentManifest, IComponentInstance } from '@mtbird/shared';
import { COMPONENT } from '@mtbird/core';
import { generateInputComponent, generateSchemaTitle, generateSplitLine } from '../../utils';
import { ShapePathFormulasKeys } from '@mtbird/shared';

const { COMPONENT_DEFAULT_STYLE, SCHEMA_COMPONENT_BASIC_STYLE } = COMPONENT;

const manifest: IComponentManifest<IComponentInstance> = {
  type: 'component',
  componentName: 'Shape',
  title: '形状',
  icon: 'mtbird-shapes',
  desc: '',
  category: 'basic',
  schema: [...SCHEMA_COMPONENT_BASIC_STYLE, generateSplitLine(), generateSchemaTitle('形状'), generateInputComponent('图形类型', 'props.path')],
  instance: {
    type: 'component',
    componentName: 'Shape',
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        height: 80,
        width: 60
      }
    },
    data: {
      viewBox: [200, 200],
      path: 'M 50 0 L 150 0 Q 200 0 200 50 L 200 150 Q 200 200 150 200 L 50 200 Q 0 200 0 150 L 0 50 Q 0 0 50 0 Z',
      pathFormula: ShapePathFormulasKeys.ROUND_RECT
    },
    children: []
  }
};

export default manifest;
