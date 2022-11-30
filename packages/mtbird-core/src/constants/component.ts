import type { IComponentInstanceForm } from '@mtbird/shared';
import React from 'react';
import SchemaGenerator from '../generator/SchemaGenerator';

export const ID_KEY = '%id%';

export const DEFAULT_ENTITIES = [
  {
    title: '显示值',
    keyPath: 'label',
    type: 'string',
    default: '',
    isRequired: true
  },
  {
    title: '实际值',
    keyPath: 'value',
    type: 'string',
    default: '',
    isRequired: true
  }
];

export const DEFAULT_OPTIONS = [
  {
    value: 'a',
    label: '选项1'
  },
  {
    value: 'b',
    label: '选项2'
  }
];

export const BUTTON_FORM_COMPONENT_NAME_OPTIONS = [
  {
    value: 'Input',
    label: '输入框'
  },
  {
    value: 'Select',
    label: '选择框'
  },
  {
    value: 'Radio',
    label: '单选框'
  },
  {
    value: 'Upload',
    label: '上传'
  },
  {
    value: 'Button',
    label: '按钮'
  }
];

export const EVENT_TYPE_OPTIONS = [
  {
    value: 'click',
    label: '点击'
  },
  {
    value: 'link',
    label: '链接'
  },
  {
    value: 'submit',
    label: '表单提交'
  },
  {
    value: 'clear',
    label: '表单清空'
  },
  {
    value: 'open-modal',
    label: '打开弹窗'
  },
  {
    value: 'close-modal',
    label: '关闭弹窗'
  },
  {
    value: 'link-blank',
    label: '行内代码'
  },
  {
    value: 'link-blank',
    label: '链接（新窗口）'
  }
];

export const COMPONENT_DEFAULT_STYLE: React.CSSProperties = {
  position: 'absolute'
};

export const SCHEMA_FORM_ITEM_LABEL_STYLE: React.CSSProperties = {
  color: 'white',
  fontSize: 12,
  textAlign: 'right'
};

export const SCHEMA_FORM_ITEM_COMPONENT_STYLE: React.CSSProperties = {
  backgroundColor: 'var(--gray-7)',
  border: 0,
  width: '100%',
  color: 'white',
  height: 22
};

export enum COMPONENT_TYPES {
  COMPONENT_ATOM = 'COMPONENT_ATOM',
  COMPONENT_3RD = 'COMPONENT_3RD',
  CONTAINER = 'CONTAINER',
  CONTAINER_ROOT = 'CONTAINER_ROOT',
  CONTAINER_BLOCK = 'CONTAINER_BLOCK',
  FORM = 'FORM',
  DIALOG = 'DIALOG'
}

export const SCHEMA_HEIGHT: IComponentInstanceForm = SchemaGenerator.input('高度', 'props.style.height', { 'formConfig.labelStyle.width': 40 }); //{
//   type: 'component',
//   componentName: 'FormItem',
//   formConfig: {
//     keyPath: 'props.style.height',
//     label: '高度',
//     componentName: 'Input',
//     componentProps: {
//       type: 'number',
//       style: SCHEMA_FORM_ITEM_COMPONENT_STYLE
//     },
//     labelStyle: SCHEMA_FORM_ITEM_LABEL_STYLE,
//     suffix: 'px'
//   },
//   props: {
//     style: {}
//   },
//   children: []
// };

export const SCHEMA_POSITION_STYLE: IComponentInstanceForm[] = [
  // SchemaGenerator.splitLine(),
  // SchemaGenerator.title('定位'),
  SchemaGenerator.containerFlex([
    SchemaGenerator.input('X', 'props.style.left', { 'formConfig.labelStyle.width': 40 }),
    SchemaGenerator.input('Y', 'props.style.top', { 'formConfig.labelStyle.width': 40 })
  ]) as any,
  SchemaGenerator.containerFlex([SchemaGenerator.input('宽度', 'props.style.width', { 'formConfig.labelStyle.width': 40 }), SCHEMA_HEIGHT]) as any
  // {
  //   type: 'component',
  //   componentName: 'FormItem',
  //   formConfig: {
  //     keyPath: 'props.style.left',
  //     label: 'X',
  //     componentName: 'Input',
  //     componentProps: {
  //       type: 'number',
  //       style: SCHEMA_FORM_ITEM_COMPONENT_STYLE
  //     },
  //     labelStyle: {
  //       ...SCHEMA_FORM_ITEM_LABEL_STYLE,
  //       width: 40
  //     },
  //     suffix: 'px'
  //   } as any,
  //   props: {
  //     style: {}
  //   },
  //   children: []
  // } as any,
  // {
  //   type: 'component',
  //   componentName: 'FormItem',
  //   formConfig: {
  //     keyPath: 'props.style.top',
  //     label: 'Y',
  //     componentName: 'Input',
  //     componentProps: {
  //       type: 'number',
  //       style: SCHEMA_FORM_ITEM_COMPONENT_STYLE
  //     },
  //     labelStyle: {
  //       ...SCHEMA_FORM_ITEM_LABEL_STYLE,
  //       width: 40
  //     },
  //     suffix: 'px'
  //   },
  //   props: {
  //     style: {}
  //   },
  //   children: []
  // } as any

  // {
  //   type: 'component',
  //   componentName: 'FormItem',
  //   formConfig: {
  //     keyPath: 'props.style.width',
  //     label: '宽度',
  //     componentName: 'Input',
  //     componentProps: {
  //       type: 'number',
  //       style: SCHEMA_FORM_ITEM_COMPONENT_STYLE
  //     },
  //     labelStyle: SCHEMA_FORM_ITEM_LABEL_STYLE,
  //     suffix: 'px'
  //   },
  //   props: {
  //     style: {}
  //   },
  //   children: []
  // },
  // SCHEMA_HEIGHT
];

export const SCHEMA_BACKGROUND_BASIC_STYLE: IComponentInstanceForm[] = [
  // SchemaGenerator.splitLine(),
  // SchemaGenerator.title('背景'),
  SchemaGenerator.colorPicker('背景色', 'props.style.backgroundColor'),
  SchemaGenerator.upload('背景图片', 'props.style.background', {
    'formConfig.valueFormatter': 'function (value) {return `url(${value})`;}',
    'formConfig.editFormatter': 'function (value) {return value ? value.substring(value.indexOf("(") + 1, value.lastIndexOf(")")) : value;}'
  }),
  SchemaGenerator.input('背景大小', 'props.style.backgroundSize'),
  SchemaGenerator.radio('背景重复', 'props.style.backgroundRepeat', [
    { label: '重复', value: 'repeat' },
    { label: '不重复', value: 'no-repeat' }
  ])
];

const TEXT_OPTIONS = [
  {
    keyPath: 'props.style.fontWeight',
    value: 700,
    defaultValue: 'normal',
    icon: 'mtbird-bold'
  },
  {
    keyPath: 'props.style.fontStyle',
    value: 'italic',
    defaultValue: 'normal',
    icon: 'mtbird-italic'
  },
  {
    keyPath: 'props.style.textDecoration',
    value: 'underline',
    defaultValue: 'none',
    icon: 'mtbird-underline'
  }
];

const TEXT_ALIGN_OPTIONS = [
  {
    keyPath: 'props.style.textAlign',
    value: 'left',
    defaultValue: 'left',
    icon: 'mtbird-align-left'
  },
  {
    keyPath: 'props.style.textAlign',
    value: 'center',
    defaultValue: 'left',
    icon: 'mtbird-align-center'
  },
  {
    keyPath: 'props.style.textAlign',
    value: 'right',
    defaultValue: 'left',
    icon: 'mtbird-align-right'
  }
];

export const SCHEMA_FONT_BASIC_STYLE = [
  // SchemaGenerator.splitLine(),
  // SchemaGenerator.title('文字'),
  {
    type: 'component',
    componentName: 'FormItem',
    formConfig: {
      keyPath: 'props.style.fontSize',
      label: '文字大小',
      componentName: 'Input',
      componentProps: {
        type: 'number',
        style: SCHEMA_FORM_ITEM_COMPONENT_STYLE
      },
      labelStyle: SCHEMA_FORM_ITEM_LABEL_STYLE,
      suffix: 'px'
    },
    props: {
      style: {
        position: 'relative'
      }
    },
    children: []
  },
  SchemaGenerator.colorPicker('文字颜色', 'props.style.color'),
  SchemaGenerator.formItem('文字样式', null, [SchemaGenerator.buttonGroup(TEXT_OPTIONS)]),
  SchemaGenerator.formItem('文字位置', null, [SchemaGenerator.buttonGroup(TEXT_ALIGN_OPTIONS)])
];

export const SCHEMA_CONTAINER_BASIC_STYLE: any[] = [
  SchemaGenerator.collapsePanel('背景', SCHEMA_BACKGROUND_BASIC_STYLE, true),
  SchemaGenerator.collapsePanel('文字', SCHEMA_FONT_BASIC_STYLE)
];

const BORDER_STYLE_OPTIONS = [
  {
    label: '虚线',
    value: 'dashed'
  },
  {
    label: '点线',
    value: 'dotted'
  },
  {
    label: '双条线',
    value: 'double'
  },
  {
    label: '实线',
    value: 'solid'
  }
];

export const SCHEMA_BORDER_BASIC_STYLE = [
  // SchemaGenerator.splitLine(),
  // SchemaGenerator.title('边框'),
  SchemaGenerator.colorPicker('边框颜色', 'props.style.borderColor'),
  SchemaGenerator.input('边框大小', 'props.style.borderWidth', {
    'formConfig.componentProps.type': 'number',
    'formConfig.suffix': 'px'
  }),
  SchemaGenerator.select('边框样式', 'props.style.borderStyle', BORDER_STYLE_OPTIONS, null),
  SchemaGenerator.input('边框圆角', 'props.style.borderRadius', {
    'formConfig.componentProps.type': 'number',
    'formConfig.suffix': 'px',
    'formConfig.editFormatter': 'function(v) { return isNaN(parseFloat(v)) ? "" : parseFloat(v) }',
    'formConfig.valueFormatter': 'function(v) { return v + "px"}'
  })
];

const shadowEditFormatter = (index: number, notFloat?: boolean) => `function(v) {
  if (!v || !v.split) return "";
  let d = v.split(" ");
  if (d.length === 5) {
    return ${notFloat ? `d[${index}]` : `parseFloat(d[${index}])`};
  }
  return v;
}`;

const shadowValueFormatter = (index: number, hidePx?: boolean) => `function(v, oV) {
  var suffix = ${hidePx ? "''" : "'px'"};
  var empty = [0, 0, 0, 0, "#333"];
  if (!v && !oV) return empty; 
  if (v && !oV) {
    empty[${index}] = v + suffix;
    return empty.join(" "); 
  }
  let d = oV.split(" "); 
  var res = ${hidePx ? 'v' : 'parseFloat(v) + suffix'}; 
  d[${index}] = res;
  return d.join(" ")
}
`;

export const EFFECT_BASIC_STYLE = [
  SchemaGenerator.containerFlex([
    SchemaGenerator.input('X', 'props.style.boxShadow', {
      'formConfig.labelStyle.width': 40,
      'formConfig.componentProps.type': 'number',
      'formConfig.suffix': 'px',
      'formConfig.editFormatter': shadowEditFormatter(0),
      'formConfig.valueFormatter': shadowValueFormatter(0)
    }),
    SchemaGenerator.input('Y', 'props.style.boxShadow', {
      'formConfig.labelStyle.width': 40,
      'formConfig.componentProps.type': 'number',
      'formConfig.suffix': 'px',
      'formConfig.editFormatter': shadowEditFormatter(1),
      'formConfig.valueFormatter': shadowValueFormatter(1)
    })
  ]),
  SchemaGenerator.containerFlex([
    SchemaGenerator.input('模糊', 'props.style.boxShadow', {
      'formConfig.labelStyle.width': 40,
      'formConfig.componentProps.type': 'number',
      'formConfig.suffix': 'px',
      'formConfig.editFormatter': shadowEditFormatter(2),
      'formConfig.valueFormatter': shadowValueFormatter(2)
    }),
    SchemaGenerator.input('传播', 'props.style.boxShadow', {
      'formConfig.labelStyle.width': 40,
      'formConfig.componentProps.type': 'number',
      'formConfig.suffix': 'px',
      'formConfig.editFormatter': shadowEditFormatter(3),
      'formConfig.valueFormatter': shadowValueFormatter(3)
    })
  ]),
  SchemaGenerator.colorPicker('颜色', 'props.style.boxShadow', {
    'formConfig.editFormatter': shadowEditFormatter(4, true),
    'formConfig.valueFormatter': shadowValueFormatter(4, true)
    // 'formConfig.editFormatter':
    //   'function(v) { let d = v.split(" "); if (d.length === 5) {d[4] = v + "px"; return d;} return [0, 0, 0, 0, v + "px"] }',
    // 'formConfig.valueFormatter': 'function(v) { let d = v.split(" "); var res = parseFloat(d[4]); return isNaN(res) ? "" : res}'
  })
];

export const SCHEMA_COMPONENT_BASIC_STYLE: any[] = [
  SchemaGenerator.alignPanel({
    'pattern.display':
      'function (node, dataSource) { const parent = dataSource?.state["componentMap"]?.get(dataSource.getValue(0)?.parent)?.layout; return !parent || parent !== "flex";}'
  }),
  ...SCHEMA_CONTAINER_BASIC_STYLE,
  SchemaGenerator.collapsePanel('定位', SCHEMA_POSITION_STYLE),
  SchemaGenerator.collapsePanel('边框', SCHEMA_BORDER_BASIC_STYLE),
  SchemaGenerator.collapsePanel('影子', EFFECT_BASIC_STYLE as any)
];

export const SCHEMA_FORM_CONFIG = [
  // SchemaGenerator.splitLine(2),
  SchemaGenerator.collapsePanel('表单', [
    {
      type: 'component',
      componentName: 'FormItem',
      formConfig: {
        keyPath: 'formConfig.label',
        label: '标签',
        componentName: 'Input',
        componentProps: {
          style: SCHEMA_FORM_ITEM_COMPONENT_STYLE
        },
        labelStyle: SCHEMA_FORM_ITEM_LABEL_STYLE
      },
      props: {
        style: {}
      },
      children: []
    },
    {
      type: 'component',
      componentName: 'FormItem',
      formConfig: {
        keyPath: 'formConfig.componentProps.placeholder',
        label: '默认文本',
        componentName: 'Input',
        componentProps: {
          style: SCHEMA_FORM_ITEM_COMPONENT_STYLE
        },
        labelStyle: SCHEMA_FORM_ITEM_LABEL_STYLE
      },
      props: {
        style: {}
      },
      children: []
    },
    SchemaGenerator.radio('必填', 'formConfig.isRequired', [
      {
        label: '必填',
        value: true
      },
      {
        label: '非必填',
        value: false
      }
    ])
  ])
];

export const SCHEMA_LAYOUT_FLEX = [
  SchemaGenerator.select(
    '布局方向',
    'props.style.flexDirection',
    [
      {
        value: 'row',
        label: '水平'
      },
      {
        value: 'column',
        label: '垂直'
      }
    ],
    { 'pattern.display': 'function (node) { return node.layout === "flex";}' }
  )
];

export const COMPONENT_POSITION_STYLE = {
  CONTAINER_ROOT: {
    position: 'relative',
    width: '100%',
    height: '100%',
    zIndex: 0
  },
  COMPONENT: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0
  }
};
// | 'link-blank' | 'submit' | 'clear' | 'open-modal' | 'close-modal' | 'inline-code' | 'change-variable'
const OPTIONS_CLICK_TYPE = [
  {
    label: '跳转链接',
    value: 'link'
  },
  {
    label: '跳转链接',
    value: 'link-blank'
  },
  {
    label: '提交表单',
    value: 'submit'
  },
  {
    label: '清空表单',
    value: 'clear'
  },
  {
    label: '打开弹窗',
    value: 'open-modal'
  },
  {
    label: '关闭弹窗',
    value: 'close-modal'
  },
  {
    label: '执行代码',
    value: 'inline-code'
  }
];

export const SCHEMA_EVENT_CLICK = [
  SchemaGenerator.splitLine(2),
  SchemaGenerator.title('点击事件'),
  SchemaGenerator.select('点击事件类型', 'events.click.type', OPTIONS_CLICK_TYPE, null),
  SchemaGenerator.select('打开弹窗', 'events.click.modalId', '${{$modalsList}}', {
    pattern: {
      display: 'function (node) { return node?.events?.click?.type === "open-modal" || node?.events?.click?.type === "close-modal" }'
    }
  }),
  SchemaGenerator.input('跳转链接', 'events.click.link', {
    pattern: {
      display: 'function (node) { return node?.events?.click?.type === "link" }'
    }
  }),
  SchemaGenerator.textArea('代码', 'events.click.inlineCode', {
    pattern: {
      display: 'function (node) { return node?.events?.click?.type === "inline-code" }'
    }
  })
];
