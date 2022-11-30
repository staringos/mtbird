import { IComponentInstance, IComponentCommon } from '@mtbird/shared';
import isArray from 'lodash/isArray';
import find from 'lodash/find';
import get from 'lodash/get';
import set from 'lodash/set';
import { COMPONENT_NAME, COMPONENT_TYPE, SchemaGenerator, findComponentByKey } from '@mtbird/core';
import { getManifests } from '@mtbird/component-basic';
import keys from 'lodash/keys';
import has from 'lodash/has';

export const needOverstep = (keyPath: string, value: any) => {
  return /\.height|\.top/.test(keyPath) || (/.style/.test(keyPath) && has(value, 'top')) || has(value, 'height');
};

export const getCurrentModal = (variables: Record<string, any>) => {
  return keys(variables.$modals).filter((cur: string) => !!variables.$modals[cur])[0];
};

export const getComponentArray = (currentComponent: IComponentInstance | IComponentInstance[] | null): IComponentInstance[] => {
  if (!currentComponent) return [];
  if (isArray(currentComponent)) return currentComponent as IComponentInstance[];
  return [currentComponent as IComponentInstance];
};

/**
 * If block children overstep
 * Move those children to other layer
 * @param component
 * @returns
 */
export const computeBlockOverstep = (component: IComponentInstance) => {
  let y0 = 0;
  let oversteps: { top: number; component: IComponentInstance }[] = [];
  let blockComponents: { top: number; bottom: number; component: IComponentInstance }[] = [];

  (component.children as IComponentInstance[]).map((block: IComponentInstance, i: number) => {
    if (block.componentName !== COMPONENT_NAME.CONTAINER_BLOCK) return block;
    const height = get(block, 'props.style.height');
    const bottom = y0 + height;

    blockComponents.push({
      top: y0,
      bottom,
      component: block
    });

    // check if this layer component has any overlaps
    block.children = block.children.filter((cmpt: IComponentInstance) => {
      const top = get(cmpt, 'props.style.top');
      const absTop = y0 + top;

      // if overstep this ContainerBlock
      if (top > height) {
        // set(component, 'props.style.top', top - bottom);
        oversteps.push({ top: absTop, component: cmpt });
        return false;
      }

      if (top < 0 && i !== 0) {
        oversteps.push({ top: absTop, component: cmpt });
        return false;
      }

      return true;
    });

    y0 = bottom;
  });

  if (oversteps.length === 0) return component;

  (component.children as IComponentInstance[]).some((block: IComponentInstance, i: number) => {
    const pos = blockComponents[i];

    // if find right block, remove from oversteps list, because there no element can have multi parent
    oversteps = oversteps.filter((sub, i) => {
      if (pos.top < sub.top && pos.bottom > sub.top) {
        set(sub.component, 'props.style.top', sub.top - pos.top);
        set(sub.component, 'parent', block.id);
        (block.children as IComponentInstance[]).push(sub.component);
        return false;
      }

      return true;
    });

    // if all oversteps component had right place, there's no need loop anymore
    return oversteps.length === 0;
  });
  return component;
};

export const generateSchemaForm = (extensionComponents: Map<string, IComponentCommon>, currentComponentName: string) => {
  const obj = Object.fromEntries(extensionComponents);
  const manifests = { ...getManifests(), ...obj };
  let currentSchema = manifests[currentComponentName || 'ContainerRoot']?.schema;
  const schemaConfig = SchemaGenerator.form();

  if (!currentSchema) {
    console.warn(`[mtbird warn] cannot find component (${currentComponentName}) schema, extension not install?`);
    currentSchema = manifests['ContainerRoot']?.schema;
  }

  schemaConfig.id = '0';
  schemaConfig.props.style.width = 243;
  schemaConfig.props.style.paddingBottom = 50;
  delete schemaConfig.props.style.height;
  schemaConfig.children = currentSchema;

  return schemaConfig;
};

/**
 * IComponentInstance list to Map<id, component>
 */
export const componentArrayToMap = (array: IComponentInstance): Map<string, IComponentInstance> => {
  const res = new Map<string, IComponentInstance>();

  array.forEach((cur: IComponentInstance) => {
    res.set(cur.id, cur);
  });
  return res;
};

export const getSelectedComponent = (selected: any[], componentMap: Map<string, IComponentInstance>) => {
  if (!selected.length) return [];
  let sameLayerParent: string | null = null;
  return (
    selected
      .reverse()
      // 判断是否在同一层，取 第一个找到的id
      .filter((cur) => {
        if (!sameLayerParent) {
          const component = componentMap.get(cur.id);
          if (component && component.parent) sameLayerParent = component.parent;
          return true;
        }
        return sameLayerParent === componentMap.get(cur.id)?.parent;
      })
      .map((cur) => componentMap.get(cur.id))
      .filter((cur) => !!cur)
  );
};

export const flattenComponentTree = (componentTree: IComponentInstance): Map<string, IComponentInstance> => {
  const map = new Map<string, IComponentInstance>();

  const loop = (tree: IComponentInstance) => {
    map.set(tree.id, tree);
    if (tree.children && isArray(tree.children)) {
      tree.children.forEach((cur: IComponentInstance) => loop(cur));
    }
  };

  loop(componentTree);
  return map;
};

export const findParentByChildKey = (componentTree: IComponentInstance, key: string) => {
  const loop = (tree: IComponentInstance): any => {
    const result = find(tree.children, (cur: IComponentInstance) => cur.id === key);
    if (result && result.id) return [tree];

    if (!tree.children) return null;
    if (!isArray(tree.children)) return loop(tree.children);

    return tree.children.find((cur: IComponentInstance) => loop(cur));
  };

  const target = loop(componentTree);
  return isArray(target) ? target[0] : target;
};

export const FORM_CONTAINER = [COMPONENT_NAME.FORM, COMPONENT_NAME.FORM_ITEM];

export const findNearestContainer = (root: IComponentInstance, currentComponent: IComponentInstance) => {
  // if current is ContainerRoot, use its first child as parent
  if (currentComponent.componentName === COMPONENT_NAME.CONTAINER_ROOT) {
    return currentComponent.children[0];
  }

  const isForm = currentComponent.type === COMPONENT_TYPE.FORM;
  // if currentComponent is container, return itself
  if (currentComponent.type === COMPONENT_TYPE.CONTAINER || (isForm && FORM_CONTAINER.indexOf(currentComponent.componentName) !== -1))
    return currentComponent;

  // loop from bottom to top of all parents, find first container
  const loop = (component: IComponentInstance): any => {
    if (!component) return null;

    const parent = findComponentByKey(root, component.parent);

    if (!parent) return null;
    if (parent.type === COMPONENT_TYPE.CONTAINER || (isForm && parent.componentName === COMPONENT_NAME.FORM)) return parent;
    return loop(parent);
  };

  return loop(currentComponent);
};

export function setTransformRotate(transformStr: string, newValue: number) {
  if (!transformStr || transformStr === 'none' || transformStr.indexOf('matrix') !== -1) return `rotate(${newValue}deg)`;

  const transformArr = transformStr.split(' ');

  if (transformArr.length === 0) return `rotate(${newValue}deg)`;

  return transformArr
    .map((cur) => {
      if (cur.indexOf('rotate(') === -1) return;
      return `rotate(${newValue}deg)`;
    })
    .join(' ');
}

export function getDomTransform(el: any) {
  const st = window.getComputedStyle(el, null);
  return (
    st.getPropertyValue('-webkit-transform') ||
    st.getPropertyValue('-moz-transform') ||
    st.getPropertyValue('-ms-transform') ||
    st.getPropertyValue('-o-transform') ||
    st.getPropertyValue('transform') ||
    'none'
  );
}

export function getTransformMatrixRotate(stringTransform?: string) {
  if (!stringTransform || stringTransform === 'none') return 0;

  const values = stringTransform.split('(')[1].split(')')[0].split(',');

  /*
  a = values[0];
  b = values[1];
  angle = Math.round(Math.atan2(b,a) * (180/Math.PI));
  */
  let angle = Math.round(Math.atan2(parseFloat(values[1]), parseFloat(values[0])) * (180 / Math.PI));
  return angle < 0 ? angle + 360 : angle; //adding 360 degrees here when angle < 0 is equivalent to adding (2 * Math.PI) radians before
}
