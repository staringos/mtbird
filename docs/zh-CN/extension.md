# Extension

## 开始

🤔 安装 CLI 工具

```
yarn global add @mtbird/cli
```

🚗 创建拓展项目

```
mtbird create my-extension
```

⬆️ 输入拓展信息（唯一标识、名称、描述）

💰 启动拓展项目

```
cd my-extension
yarn start
```

🥚 打开编辑器([https://mtbird.staringos.com](https://mtbird.staringos.com))，点击右上角 Debug 按钮，输入本地地址（http://localhost:3000/...），点击开始调试，拓展即挂载成功

## 进阶

### 入口 （src/index.ts）

拓展入口默认导出一个方法，方法接收一个 context（全局上下文）对象作为参数，该上下文中包括 当前编辑器和页面的基本信息（只读），和 注册、挂载和帮助方法

```typescript
const activity = (context: IExtensionContext) => {
  context.registerComponent('example.tab', Example);
};

export default activity;
```

### 描述文件 (manifest.json)

Manifest file 文件是关于组建的描述，有组件的基本信息 如 name、key，还有组件的注册信息，如 contributes

- name 拓展唯一名称
- title 拓展的显示名称
- private 是否为组织私有拓展
- contributes 拓展的贡献
- version 拓展版本

```json
{
  "name": "<%- name %>",
  "title": "<%- title %>",
  "version": "0.0.1",
  "desc": "<%- desc %>",
  "tags": ["拓展案例"],
  "contributes": {
    "toolbars": [
      {
        "sort": 3,
        "params": {
          "name": "拓展案例"
        },
        "link": "component",
        "component": "example.tab"
      }
    ]
  }
}
```

## APIs

### 全局上下文 context

TS Type: IExtensionContext

#### registerFeature

**_[参数]_**

- key: 组件唯一标识（会默认加上拓展名作为前缀，以方式污染全局命名空间。如跨拓展调用组件，需在组件前加上拓展名称）
- feature: React 组件（这个 React 组件中，也会以 props 形式传入一个 context 全局上下文对象）

将某一个 React 组件注册为可供编辑器使用的拓展组件

使用案例

在 manifest.json

```json
...
"contributes": {
  "toolbars": [
    {
      "params": {
        "name": "拓展案例"
      },
      "link": "component",
      "component": "example.tab" // component key
    }
  ]
}
...
```

#### contributes 类型

- header 头部
  - headerTools
  - headerButtons
- tool 工具面板
  - toolTabs
  - toolButtons
- schema 配置栏
  - schemaTabs
- canvas 画布
  - canvasTools

#### registerModal

**_[参数]_**

- key: 组件唯一标识（会默认加上拓展名作为前缀，以方式污染全局命名空间。如跨拓展调用组件，需在组件前加上拓展名称）
- modal: React 组件（这个 React 组件中，也会以 props 形式传入一个 context 全局上下文对象）

注册一个全局模态框
使用案例

在 manifest.json

```json
...
"contributes": {
  "toolbars": [
    {
      "params": {
        "name": "拓展案例"
      },
      "link": "modal",
      "modal": "example.tab" // component key
    }
  ]
}
...
```
