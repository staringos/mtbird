import {
  IComponentInstance,
  IPosition,
  IEntity,
  IEntityField,
  IVariable,
  IComponentInstanceForm,
  IOptionItem,
  IModelField,
  IComponentInstanceCommon,
  IModel,
  IEditorOptions
} from '@mtbird/shared';
import map from 'lodash/map';
import union from 'lodash/union';
import assign from 'lodash/assign';
import omit from 'lodash/omit';
import set from 'lodash/set';
import keys from 'lodash/keys';
import flattenDeep from 'lodash/flattenDeep';
import { CSSProperties } from 'react';
import { customAlphabet } from 'nanoid';
import isObject from 'lodash/isObject';
import template from 'lodash/template';
import isString from 'lodash/isString';

import isNumber from 'lodash/isNumber';
import toNumber from 'lodash/toNumber';
import isBoolean from 'lodash/isBoolean';
import get from 'lodash/get';
import templateSettings from 'lodash/templateSettings';
import isArray from 'lodash/isArray';
import { COMPONENT_NAME } from '../constants';
import compact from 'lodash/compact';

export const VALIABLE_TEMPLATE_REGAX = /\${{([\s\S]+?)}}/g;
const nanoid = customAlphabet('1234567890qwertyuioplkjhgfdsazxcvbnm_$', 17);
export const SYSTEM_VERIABLES = () => ({ $modals: {} });

export const getFormKeypath = (node: IComponentInstanceForm) => {
  const { formConfig, id } = node;
  return formConfig?.keyPath || id || formConfig?.label;
};

export const findComponentByKey = (componentTree: IComponentInstance, key: string) => {
  const loop = (tree: IComponentInstance): any => {
    if (tree.id === key) {
      return tree;
    }

    if (!tree.children) return null;
    if (!isArray(tree.children)) return loop(tree.children as any);

    for (let i = 0; i < (tree.children as IComponentInstance[]).length; i++) {
      const curTarget = loop(tree.children[i]);
      if (curTarget) return curTarget;
    }
  };

  return loop(componentTree);
};

export const replaceVariable = (val: any, variables: Record<string, any>) => {
  if (isObject(val)) return injectVariables(variables)(val);

  // 如果字符串中只有变量，则将对应值赋为目标变量名
  if (isString(val) && val.startsWith('${{') && val.indexOf('}}') === val.length - 2) {
    return get(variables, val.replace('${{', '').replace('}}', ''));
  }

  // 如果字符串中非只有变量，为变量字符串模版，则使用 _.template 解析该模版
  if (isString(val) && val.indexOf('${{') !== -1) {
    const compiled = template(val);
    let value = val;
    try {
      value = compiled(variables);
    } catch (e) {}

    // no attribute in variables, set it as undefined
    if (VALIABLE_TEMPLATE_REGAX.test(value)) {
      value = value.replaceAll(VALIABLE_TEMPLATE_REGAX, 'undefined');
    }

    // set value to its origin data type
    if (isNumber(value)) return toNumber(value);
    if (isBoolean(value)) return Boolean(value);
    if (value === 'undefined') return undefined;

    return value;
  }

  return val;
};

export const injectVariables = (variables: Record<string, any>) => {
  templateSettings.interpolate = VALIABLE_TEMPLATE_REGAX;
  return (obj: any) => {
    keys(obj).map((key: string) => {
      const val = obj[key];
      const res = replaceVariable(val, variables);
      if (res) obj[key] = res;
    });
  };
};

export const getModalOptions = (node: IComponentInstance) => {
  const $modalsList: any[] = [];
  (node.children as IComponentInstanceCommon[]).forEach((cur: IComponentInstance) => {
    if (cur?.componentName === COMPONENT_NAME.MODAL) {
      $modalsList.push({
        label: cur.data?.alias,
        value: cur.id
      });
    }
  });
  return $modalsList;
};

export const initVariables = (node: IComponentInstance, options?: IEditorOptions) => {
  const variablesConfig = get(node, 'data.variables');

  // $modalsList
  const $modalsList: any[] = getModalOptions(node);
  const variables = {
    ...SYSTEM_VERIABLES(),
    $modalsList,
    $models: options ? options.models : [],
    $modelsOptions: options?.models ? options?.models.map((cur: IModel) => ({ ...cur, label: cur.name, value: cur.id })) : []
  };

  if (!variablesConfig) return variables;

  variablesConfig.forEach((cur: IVariable) => {
    variables[cur.key] = cur.value;
  });

  return variables;
};

export const safeEval = (codeStr: string) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.text = codeStr;
  document.getElementsByTagName('head')[0].appendChild(script);
  // document.head.removeChild(document.head.lastChild)
};

export const generateEntityValue = (entity: IEntity) => {
  const res = {};
  entity.forEach((cur: IEntityField) => {
    if (cur.default) {
      set(res, cur.keyPath, cur.default);
    }
  });

  return res;
};

export const getWrapperPosition = (components: IComponentInstance[]): IPosition => {
  const { style } = components[0].props;
  let left = style.left;
  let top = style.top;
  let width = style.width;
  let height = style.height;

  components.forEach((cur) => {
    const { style } = cur.props;
    if (style.left < left) left = style.left;
    if (style.top < top) top = style.top;
  });

  components.forEach((cur) => {
    const { style } = cur.props;
    const offsetRight = style.left - left + style.width;
    const offsetBottom = style.top - top + style.height;

    if (offsetRight > width) width = offsetRight;
    if (offsetBottom > height) height = offsetBottom;
  });

  return { left, top, width, height };
};

/**
 * style without position
 */
export const pureStyle = (style: CSSProperties) => {
  if (!style) return {};
  const { left, right, height, width, bottom, position, display, ...restStyle } = style;
  return restStyle;
};

/**
 * Generate code from string code template
 * https://stackoverflow.com/questions/7650071/is-there-a-way-to-create-a-function-from-a-string-with-javascript
 *
 * Example:
 *  const template = codeTemplate('function(node) { node.layout === 'flex'}')
 *  template({layout: 'flex'}) // true
 *
 * @param codeTemplate
 * @returns
 */
export function generateFunction(codeTemplate: string) {
  return new Function('return ' + codeTemplate)();
}

export function getParamFromURL(url: string, key: string) {
  const urlObj = new URL(url);
  return urlObj.searchParams.get(key);
}

export function flattenComponentTree(tree: IComponentInstance[]) {
  function recurse(nodes: IComponentInstance, path: string[]) {
    return map(nodes, function (node: IComponentInstance) {
      if (!node) return [];
      let newPath = union(path, [node.name]);
      return [assign({ pathname: newPath.join(' > '), level: path.length }, omit(node, 'children')), recurse(node.children, newPath)];
    });
  }

  return flattenDeep(recurse(tree, []));
}

export function uuidv4(number: number) {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: any) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(number)
  );
}

export const generateKeys = () => {
  return 'i' + nanoid();
};

export const getZoom = (standardWidth: number = 375) => {
  let clientWidth = document.documentElement.clientWidth;
  return clientWidth / standardWidth;
};

/**
 * Same params like `lodash.flow`, support async function
 * @param fns: function list
 * @returns latest function return
 */
export const pipelineAsync = (fns: Function[]) => {
  return async (params: any) => {
    let lastParams = params;
    for (let i = 0; i < fns.length; i++) {
      lastParams = await fns[i](lastParams);
    }
    return lastParams;
  };
};

/**
 * Merge by Keypath
 *
 * Example:
 * let target = {data: {b: {value: 6}}, style: {color: 123}}
 * let mergeMap = {'data.b.label': 'Label', 'style.border': '1px solid #333'}
 *
 * mergeKeypath(target, mergeMap) // {data: {b: {value: 6}, label: 'Label'}, style: {color: 123, border: '1px solid #333'}}
 *
 * @param target
 * @param mergeMap
 * @returns
 */
export const mergeKeypath = (target: Record<string, any>, mergeMap: Record<string, any>) => {
  keys(mergeMap).forEach((keyPath: string) => {
    set(target, keyPath, mergeMap[keyPath]);
  });
  return target;
};

export const dataURItoBlob = (dataURI: string) => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  let byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  let ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  let ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  return new Blob([ab], { type: mimeString });
};

/**
 * 只有表单类型组件，或者子组件中有表单类型组件，意味着可以提交数据，才能作为表格的 Columns
 * @param component
 * @returns
 */
export const isFormComponent = ({ children, type, formConfig }: IComponentInstanceForm) => {
  // 如果没有formConfig，无法展示、提交数据（无label 和 keyPath），按照不是表单组件处理
  if (!isArray(children) || (children as IComponentInstanceForm[]).length === 0) return type === 'form' && formConfig;
  return !!(children as IComponentInstanceForm[]).find((chi: IComponentInstanceForm) => chi.type === 'form');
};

export const covertFormToColumn = (node: IComponentInstanceForm) => {
  if (!isArray(node.children)) return [];
  const res = (node.children as IComponentInstanceForm[]).map((cur: IComponentInstanceForm) => {
    const { formConfig, id } = cur;

    if (!isFormComponent(cur)) return null;

    return {
      field: cur,
      title: formConfig.label || formConfig.keyPath || id,
      dataIndex: formConfig.keyPath || id || formConfig.label,
      render: (value: any, row: Record<string, any>) => {
        return row[formConfig.keyPath as string] || row[id as string] || row[formConfig.label as string];
      }
    };
  });
  return compact(res);
};

export const convertModelToColumn = (fields: IModelField[]) => {
  return fields.map((cur) => {
    return {
      field: cur,
      title: cur.displayName,
      dataIndex: cur.key,
      render: (val: any, row: any) => {
        if (row.type === 'ENUM') {
          return row.options.find((cur: IOptionItem) => cur.value === row.type)?.label || val;
        }
        return val;
      }
    };
  });
};

export const getParentPath = (node: IComponentInstanceCommon, componentMap: Map<string, IComponentInstanceCommon>) => {
  const path: string[] = [];

  const loop = (target: IComponentInstanceCommon): string[] => {
    path.push(target.id as string);
    if (!target.parent) return path;
    const parent = componentMap.get(target.parent);
    if (!parent) return path;
    return loop(parent);
  };

  return loop(node);
};

export const getNodeFromTreeBranch = (
  node: IComponentInstanceCommon,
  componentMap: Map<string, IComponentInstanceCommon>,
  fn: (node: IComponentInstanceCommon) => boolean
) => {
  const loop = (target: IComponentInstanceCommon): IComponentInstanceCommon | number => {
    if (!target) return -1;
    if (fn(target)) {
      return target;
    }

    if (!target.parent) return -1;

    return loop(componentMap.get(target.parent) as IComponentInstance);
  };

  return loop(node);
};
