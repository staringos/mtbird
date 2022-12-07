import { IComponentInstance, IComponentInstanceForm, IPosition, IEntity, ShapePoolItem, IEvent, IColumn } from '@mtbird/shared';
import { CSSProperties } from 'react';
import { mergeKeypath } from '..';
import {
  COMPONENT_DEFAULT_STYLE,
  DEFAULT_OPTIONS,
  SCHEMA_FORM_ITEM_COMPONENT_STYLE,
  SCHEMA_FORM_ITEM_LABEL_STYLE,
  DEFAULT_ENTITIES
} from '../constants/component';
import { IFeature } from '@mtbird/core';

const splitLine = (size: number = 1) => {
  return {
    type: 'form',
    componentName: 'SplitLine',
    props: {
      style: {
        ...SCHEMA_FORM_ITEM_COMPONENT_STYLE,
        height: size,
        backgroundColor: 'var(--gray-8)'
      }
    },
    children: []
  };
};

const title = (title: string, style?: any) => {
  return {
    type: 'form',
    componentName: 'Text',
    props: {
      style: style || {
        color: 'white',
        fontWeight: '700',
        height: 30,
        paddingTop: 5
      }
    },
    children: title
  };
};

export default {
  formList: (pageId: string, targetId: string, features?: IFeature, additionColumns?: IColumn[]) => {
    return {
      type: 'form',
      componentName: 'List',
      props: {
        style: {
          // ...COMPONENT_DEFAULT_STYLE
        }
      },
      formConfig: {},
      data: {
        type: 'form',
        pageId,
        targetId,
        features,
        additionColumns
      },
      children: []
    };
  },

  modelList: (targetId: string, features?: IFeature, additionColumns?: IColumn[]) => {
    return {
      type: 'form',
      componentName: 'List',
      props: {
        style: {
          // ...COMPONENT_DEFAULT_STYLE
        }
      },
      formConfig: {},
      data: {
        type: 'model',
        targetId,
        features,
        additionColumns
      },
      children: []
    };
  },

  list: (label: string = '列表', keyPath: string = 'data.options', entity: IEntity = DEFAULT_ENTITIES) => {
    return [
      splitLine(),
      title(label),
      {
        type: 'form',
        componentName: 'List',
        props: {
          style: {
            // ...COMPONENT_DEFAULT_STYLE
          }
        },
        formConfig: {
          keyPath
        },
        theme: {
          type: 'dark'
        },
        data: {
          type: 'entity',
          entity,
          features: {
            add: true,
            modify: true,
            delete: true
          }
        },
        children: []
      }
    ];
  },

  formItem: (label: string, keyPath: string | null, children: IComponentInstance[], style?: any): IComponentInstanceForm => {
    return {
      type: 'form',
      componentName: 'FormItem',
      formConfig: {
        label,
        keyPath,
        labelStyle: SCHEMA_FORM_ITEM_LABEL_STYLE
      },
      props: {
        style: style || {
          position: 'relative',
          height: 35
        }
      },
      children
    };
  },

  input: (label: string, keyPath?: string, data?: any) => {
    let res: any = {
      type: 'form',
      componentName: 'Input',
      formConfig: {
        label,
        keyPath,
        labelStyle: { ...SCHEMA_FORM_ITEM_LABEL_STYLE },
        componentProps: {
          type: 'text',
          style: SCHEMA_FORM_ITEM_COMPONENT_STYLE
        }
      },
      props: {
        style: {
          width: '100%'
        }
      },
      children: []
    };
    if (data) res = mergeKeypath(res, data);
    return res;
  },
  inputNumber: (label: string, keyPath?: string, data?: any) => {
    let res: any = {
      type: 'form',
      componentName: 'Input',
      formConfig: {
        label,
        keyPath,
        labelStyle: { ...SCHEMA_FORM_ITEM_LABEL_STYLE },
        componentProps: {
          type: 'number',
          style: SCHEMA_FORM_ITEM_COMPONENT_STYLE
        }
      },
      props: {
        style: {
          width: '100%'
        }
      },
      children: []
    };
    if (data) res = mergeKeypath(res, data);
    return res;
  },
  select: (label: string, keyPath: string, options: Record<string, any> | string, data?: any) => {
    let res: any = {
      type: 'form',
      componentName: 'Select',
      formConfig: {
        keyPath,
        label,
        componentProps: {
          style: SCHEMA_FORM_ITEM_COMPONENT_STYLE
        },
        labelStyle: SCHEMA_FORM_ITEM_LABEL_STYLE
      },
      data: {
        options
      },
      props: {
        style: {}
      },
      children: []
    };
    if (data) res = mergeKeypath(res, data);
    return res;
  },

  form: (props: Record<string, any>) => {
    return {
      type: 'form',
      componentName: 'Form',
      layout: 'flex',
      formConfig: {
        formLayout: 'horizontal'
      },
      props: {
        ...props,
        style: {
          position: 'relative',
          width: 260,
          height: 300
        }
      },
      children: []
    };
  },

  button: (children?: string, click?: IEvent, style?: any) => {
    return {
      type: 'component',
      componentName: 'Button',
      props: {
        style: style || {
          height: 40,
          width: 80
        },
        type: 'primary',
        shape: 'default'
      },
      events: {
        click: click || {
          type: 'link',
          src: 'http://staringos.com'
        }
      },
      editing: {
        showMask: true,
        maskText: '双击操作'
      },
      children: children || '按钮'
    };
  },

  buttonGroup: (options: any) => {
    return {
      type: 'form',
      componentName: 'ButtonGroup',
      data: {
        options
      },
      props: {
        style: {}
      },
      formConfig: {
        componentProps: {
          style: SCHEMA_FORM_ITEM_COMPONENT_STYLE
        }
      },
      children: []
    };
  },

  radio: (label: string, keyPath: string, options: any, data?: any) => {
    let res: any = {
      type: 'form',
      componentName: 'Radio',
      props: {
        style: {
          // ...COMPONENT_DEFAULT_STYLE,
          color: 'white'
        }
      },
      formConfig: {
        label,
        keyPath,
        labelStyle: SCHEMA_FORM_ITEM_LABEL_STYLE
      },
      data: {
        options
      },
      children: []
    };
    if (data) res = mergeKeypath(res, data);
    return res;
  },

  upload: (label: string, keyPath: string, data?: any) => {
    let schema: any = {
      type: 'form',
      componentName: 'Upload',
      props: {
        maxCount: 1,
        style: {
          // ...COMPONENT_DEFAULT_STYLE,
          width: 200,
          borderWidth: 0
        }
      },
      formConfig: {
        label,
        keyPath,
        labelStyle: SCHEMA_FORM_ITEM_LABEL_STYLE,
        componentProps: {
          style: SCHEMA_FORM_ITEM_COMPONENT_STYLE
        }
      },
      data: {
        options: DEFAULT_OPTIONS
      },
      children: []
    };
    if (schema) schema = mergeKeypath(schema, data);
    return schema;
  },

  textArea: (label: string, keyPath: string, data?: any) => {
    let schema: any = {
      type: 'form',
      componentName: 'TextArea',
      props: {
        maxCount: 1,
        style: {
          // ...COMPONENT_DEFAULT_STYLE
        }
      },
      formConfig: {
        label,
        keyPath,
        labelStyle: SCHEMA_FORM_ITEM_LABEL_STYLE,
        componentProps: {
          style: {
            ...SCHEMA_FORM_ITEM_COMPONENT_STYLE,
            height: 100
          }
        }
      },
      data: {
        options: DEFAULT_OPTIONS
      },
      children: []
    };
    if (schema) schema = mergeKeypath(schema, data);
    return schema;
  },

  richTextEditor: (label: string, keyPath: string, data?: any) => {
    let schema: any = {
      type: 'form',
      componentName: 'mtbird-extension-rich-textRichTextEditor',
      props: {
        maxCount: 1,
        style: {
          // ...COMPONENT_DEFAULT_STYLE
        }
      },
      formConfig: {
        label,
        keyPath,
        labelStyle: SCHEMA_FORM_ITEM_LABEL_STYLE,
        componentProps: {
          style: {
            ...SCHEMA_FORM_ITEM_COMPONENT_STYLE,
            height: 500
          }
        }
      },
      data: {
        options: DEFAULT_OPTIONS
      },
      children: [],
      extension: {
        isExtension: true,
        extensionName: 'mtbird-extension-rich-text',
        componentName: 'RichTextEditor'
      }
    };
    if (schema) schema = mergeKeypath(schema, data);
    return schema;
  },

  shape: (shape: ShapePoolItem, size = 28) => {
    return {
      type: 'component',
      componentName: 'Shape',
      props: {
        style: {
          ...COMPONENT_DEFAULT_STYLE,
          height: size,
          width: size,
          backgroundColor: 'var(--gray-3)'
        }
      },
      data: {
        viewBox: shape.viewBox,
        path: shape.path,
        pathFormula: shape.pathFormula
      },
      children: []
    };
  },

  containerFlex: (children: any) => {
    return {
      type: 'container',
      componentName: 'Container',
      layout: 'flex',
      props: {
        style: {
          display: 'flex'
        }
      },
      children
    };
  },

  container: (children: Array<IComponentInstance>, pos: IPosition, style: Record<string, any> = {}, layout: 'flex' | 'absolute') => {
    return {
      type: 'container',
      componentName: 'Container',
      layout: 'absolute',
      props: {
        style: {
          ...COMPONENT_DEFAULT_STYLE,
          ...pos,
          ...style
        }
      },
      children
    };
  },

  containerBlock: (children: Array<IComponentInstance>, data?: Record<string, any>) => {
    let init = {
      type: 'container',
      componentName: 'ContainerBlock',
      props: {
        style: {
          position: 'relative',
          height: 500
        }
      },
      children
    } as any;
    if (data) init = mergeKeypath(init, data);
    return init;
  },

  icon: (style: CSSProperties, className?: string, data?: Record<string, any>) => {
    let init: any = {
      type: 'component',
      componentName: 'Icon',
      props: {
        style: {
          ...COMPONENT_DEFAULT_STYLE,
          fontSize: 30,
          width: 30,
          height: 30,
          ...style
        },
        className: className || 'mtbird-icon mtbird-close'
      },
      children: []
    };
    if (data) init = mergeKeypath(init, data);
    return init;
  },

  colorPicker: (label: string = '颜色', keyPath: string = 'props.style.backgroundColor', data?: any) => {
    let init = {
      type: 'component',
      componentName: 'ColorPicker',
      formConfig: {
        keyPath,
        label,
        componentProps: {
          style: SCHEMA_FORM_ITEM_COMPONENT_STYLE
        },
        labelStyle: SCHEMA_FORM_ITEM_LABEL_STYLE
      },
      props: {
        style: {}
      },
      children: []
    } as any;

    if (data) init = mergeKeypath(init, data);
    return init;
  },

  collapse: (children: IComponentInstance[]) => {
    return {
      type: 'container',
      componentName: 'Collapse',
      layout: 'flex',
      props: {
        style: {
          minHeight: 100
        }
      },
      children: children || []
    };
  },

  collapsePanel: (title: string, children: IComponentInstance[], open: boolean = false, style: any = undefined) => {
    return {
      type: 'container',
      componentName: 'CollapsePanel',
      layout: 'flex',
      data: {
        title: title || '分组',
        open
      },
      pattern: {
        noWrapper: true
      },
      props: {
        style: style || {
          color: SCHEMA_FORM_ITEM_LABEL_STYLE.color
        }
      },
      children: children || []
    };
  },

  alignPanel: (data?: Record<string, any>) => {
    let res: any = {
      type: 'form',
      componentName: 'SchemaAlignPanel',
      props: {
        style: {
          ...COMPONENT_DEFAULT_STYLE
        }
      },
      children: []
    };

    if (data) res = mergeKeypath(res, data);
    return res;
  },

  spacingPanel: (data?: Record<string, any>) => {
    let res: any = {
      type: 'form',
      componentName: 'SchemaSpacingPanel',
      props: {
        style: {
          ...COMPONENT_DEFAULT_STYLE,
          marginLeft: 50
        }
      },
      formConfig: {
        keyPath: 'props.style'
      },
      children: []
    };

    if (data) res = mergeKeypath(res, data);
    return res;
  },

  switch: (label: string, keyPath: string) => {
    return {
      type: 'form',
      componentName: 'Switch',
      props: {
        style: {
          ...COMPONENT_DEFAULT_STYLE
        }
      },
      formConfig: {
        label: label || '开关',
        keyPath,
        labelStyle: SCHEMA_FORM_ITEM_LABEL_STYLE,
        componentProps: {
          type: 'text',
          style: SCHEMA_FORM_ITEM_COMPONENT_STYLE
        }
      },
      editing: {
        showMask: true
      },
      children: []
    };
  },

  splitLine,
  title
};

export const generateFormItemSelect = (
  keyPath: string,
  label: string,
  options: Array<{ value: string; label: string }>,
  data?: Record<string, any>
) => {
  let res: any = {
    type: 'component',
    componentName: 'FormItem',
    formConfig: {
      keyPath,
      label,
      componentName: 'Select',
      componentProps: {
        style: SCHEMA_FORM_ITEM_COMPONENT_STYLE
      },
      labelStyle: SCHEMA_FORM_ITEM_LABEL_STYLE,
      suffix: 'px'
    },
    data: {
      options
    },
    props: {
      style: {}
    },
    children: []
  };

  if (data) res = mergeKeypath(res, data);
  return res;
};
