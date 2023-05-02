# Contributing Guides

First off, thank you for considering contributing to MtBird. It's people like you that make MtBird such a great tool.

**Need more inspiration?**

[1] [MtBird Docs](https://docs.staringos.com/)

[2] [React JS](https://reactjs.org/)

[3] [Ant Design](https://ant.design)

[3] [Lerna](https://lerna.js.org/)

[3] [Rollup](https://rollupjs.org/guide/en/)

## Git

MtBird 项目库的提交规范采用 [Angular 提交规范](https://zj-git-guide.readthedocs.io/zh_CN/latest/message/Angular%E6%8F%90%E4%BA%A4%E4%BF%A1%E6%81%AF%E8%A7%84%E8%8C%83/)

## 快速开始

```shell
git clone https://github.com/staringos/mtbird
yarn
yarn bootstrap
yarn start
```

在浏览器打开: http://localhost:3000/

## 调试本地模块

这时候，example 中所有 mtbird 相关依赖已经被 link 到本地，您可以在本地开启代码监听，进行代码修改，example 中的引用会自动更新。比如修改 editor 模块:

```shell
cd packages/mtbrid-editor
yarn start
```
## 发布到 npmjs.com

在根目录执行

```shell
yarn run build
yarn run update-version
yarn run publish
```

## Packages

- mtbird-cli: 命令行工具
- mtbird-component-basic: 全部基础组件
- mtbird-core: 基础工具方法与常量集
- mtbird-editor: 编辑器核心库
- mtbird-extension-image-library: 图库拓展
- mtbird-helper-component: 组件加载和样式调整工具和组件集
- mtbird-helper-extension: 拓展加载、沙盒环境、初始化及数据流转工具集
- mtbird-renderer-web: web 端渲染器
- mtbird-shared: 共享 TS 类型库
