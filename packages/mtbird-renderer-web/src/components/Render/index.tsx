import React, { useContext, useRef, useState } from 'react';
import type { IComponentInstanceForm, IPageConfig } from '@mtbird/shared';
import { LAYOUT_TYPE } from '@mtbird/core';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import flow from 'lodash/flow';
import pipes from '../../pipes';
import { IComponentInstance } from '@mtbird/shared';
import { generateFunction } from '@mtbird/core';
import RenderContext from 'src/context/RenderContext';
import styles from './style.module.less';
import cloneDeep from 'lodash/cloneDeep';

interface IProps {
  className: string;
  pageConfig: IPageConfig;
  parent?: IComponentInstance;
  formId?: string | undefined;
  platform: 'pc' | 'mobile';
  node: IComponentInstance | IComponentInstanceForm;
  zIndex: number;
  variables: Record<string, any>;
}

const Render = ({ node, className, zIndex, formId, parent, variables }: IProps & IPageConfig) => {
  // 1. no need to render, return empty or directly
  if (!node) return <div />;
  if (isString(node) || isNumber(node)) return node as any;

  const context = useContext(RenderContext);
  const { layoutMoveable, onClick, dataSource, onUpload, isEdit, renderExtra, Components, onChangeSelf } = context;

  const Component = node.extension ? Components[node.extension.extensionName]?.[node.extension.componentName] : Components[node.componentName];
  const componentRef = useRef(null);
  const { props, editing, pattern } = node;
  const { position, top, left, bottom, right, transform, flex, marginLeft, marginRight, marginTop, marginBottom, ...restStyle } = props?.style;
  const instanceFormId = node.componentName === 'Form' ? node.id : formId;
  const [showMask, setShowMask] = useState(true);

  // 2. set wrapper styles
  const wrapperProps: Record<string, any> = {
    className: '',
    style: {
      position,
      top,
      left,
      bottom,
      right,
      width: props.style.width,
      height: props.style.height,
      zIndex,
      transform,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      flex
    }
  };

  // 3. process with children
  const childrenRender = (props?: Record<string, any>, index?: number) => {
    let renderChildren: any = node.children;
    if (node.children && isArray(node.children)) {
      renderChildren = (node.children as IComponentInstance[]).map((child: IComponentInstance, i: number) => {
        let curChildNode = child;
        if (index !== undefined) curChildNode = cloneDeep(child);

        return (
          <Render
            key={(curChildNode.id || i) + '' + index}
            parent={node}
            node={curChildNode}
            formId={instanceFormId}
            zIndex={i + 1}
            variables={variables}
            {...props}
          />
        );
      });
    }

    return renderChildren;
  };

  // 4. node assembling pipeline
  // MRP https://zhuanlan.zhihu.com/p/384274011
  const pipeline = flow(pipes);
  const { display } = pipeline({
    node,
    dataSource,
    formId: instanceFormId,
    parent,
    containerStyle: restStyle,
    variables,
    context,
    isEdit,
    wrapperProps // 组件包装层 props，一般包含 className 和 style
  });

  // 5. not display or component(node.componentName) not find in component collection
  if (!display || !Component) return <div />;

  const handleValueChange = (value: any, keyPath: string) => {
    const keyPathHere = instanceFormId + '.' + (keyPath || node.formConfig?.keyPath || node.id);
    if (node.formConfig?.valueFormatter) {
      value = generateFunction(node.formConfig?.valueFormatter)(value, dataSource.getValue(keyPathHere));
    }
    // dataSource.modify(instanceFormId + '.' + (keyPath || node.formConfig?.keyPath || node.formConfig?.label || node.id), value);
    dataSource.modify(keyPathHere, value);
  };

  const handleMaskDBClick = () => {
    setShowMask(false);
    // inputRef.current && inputRef.current.focus();
  };

  const handleBlur = () => {
    setShowMask(true);
  };

  // 7. render extra
  const extra = renderExtra ? renderExtra(node) : '';

  // 6. event handler
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    wrapperProps.onClick && wrapperProps.onClick();
    onClick && onClick(node, e);
  };

  // 8. init component with its children and extra
  const component = (
    <Component
      {...node.props}
      className={`render-component ${className} ${node.props.className}`}
      node={node}
      style={restStyle}
      dataSource={dataSource}
      onUpload={onUpload}
      isEdit={isEdit}
      formId={instanceFormId}
      onSelectComponent={handleClick}
      onChangeValue={handleValueChange}
      onChangeSelf={onChangeSelf}
      parent={parent}
      variables={variables}
      childrenRender={childrenRender}
    >
      {childrenRender()}
      {extra}
    </Component>
  );

  const Moveable = layoutMoveable?.[node.layout || LAYOUT_TYPE.ABSOLUTE];

  if (pattern?.noWrapper) return component;

  // 9. return wrapper with component
  return (
    <div
      id={node.id}
      ref={componentRef}
      {...wrapperProps}
      onClick={handleClick}
      onBlur={handleBlur}
      className={styles.componentWrapper + ' ' + wrapperProps.className}
    >
      {/* 适配不同的布局模式 */}
      {isEdit && node.layout === LAYOUT_TYPE.GRID && Moveable ? <Moveable>{component}</Moveable> : component}

      {isEdit && editing?.showMask && showMask && (
        <div className={styles.mask} onDoubleClick={handleMaskDBClick}>
          <div className={styles.maskText}>{editing.maskText || '双击编辑'}</div>
        </div>
      )}
    </div>
  );
};

export default Render;
