# Component

组件配置

## Structure

```typescript
interface IComponentInstance {
  id: string;
  type: string; // 类型，包括：component: 普通组件 ｜ container: 容器组件 form: 表单组件
  componentName: string; // 当前组件名
  props: IProps; // 直接给组件赋值的变量，包括 style 行内样式
  layout: 'absolute' | 'grid' | 'flex'; // 布局方式，目前支持的包括 absolute 绝对布局 ｜ flex 流式布局
  data?: {
    variables?: Record<string, IVariable>;
    options?: Record<string, any>[]; // 选项：如 Select 选择器的选项数据
  };
  animation: [
    {
      type: '';
      delay: number;
      duration: number;
      sort: number;
      triggerMode: 'afterPrev' | 'fromStart' | 'withPrev';
    }
  ];
  pattern: {
    display: string; // 'function(node) { node.layout === "flex" }';
    background: 'image' | 'graduual' | 'color';
  };
  events?: Record<EventAction, IEvent>; // 事件
  parent: string; // 父组件 ID
  children: IComponentInstance[] | number | string;
}
```

### Event 事件

EventAction 包括 `click` `hover` `dbclick`

### FormConfig 表单配置

```typescript
export interface IComponentInstanceForm extends IComponentInstance {
  formConfig: {
    keyPath?: string | null;
    label: string;
    description?: string;
    placeholder?: string;
    labelStyle?: React.CSSProperties;
    verify?: {
      isRequired: boolean;
    };
    componentName?: string;
    componentProps?: IProps;
    suffix: string;
    valueFormatter: string; // 'function(value) { return value + "px"; }';
    rules: Array<IFormRules>; // 验证规则
  };
}
```
