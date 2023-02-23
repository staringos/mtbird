import { IComponentInstance, IComponentInstanceForm } from '@mtbird/shared';
import React, { useContext } from 'react';
import { RenderContext } from '@mtbird/core';

interface IProps {
  slotKey: string;
  className?: string;
  parent?: IComponentInstance;
  formId?: string | undefined;
  platform?: 'pc' | 'mobile';
  node: IComponentInstance | IComponentInstanceForm;
  zIndex?: number;
  variables: Record<string, any>;
}

const slotEditStyle = {
  border: '1px solid var(--gray-5)',
  background: 'var(--gray-3)'
};

export const Slot = ({ slotKey, node, className, zIndex, formId, variables }: IProps) => {
  const context = useContext(RenderContext);
  const { Render, isEdit } = context as any;
  const AnyRender = Render as any;
  const slot = node?.slots?.[slotKey];

  if (!slot) {
    return (
      <div className={className} style={isEdit ? slotEditStyle : {}}>
        {isEdit && '选中元素，添加组件'}
      </div>
    );
  }

  if (className) slot.props.className = slot.props.className ? slot.props.className + ' ' + className : className;

  return <AnyRender node={slot} parent={node.id} zIndex={zIndex} formId={formId} parent={node} variables={variables}></AnyRender>;
};

export default Slot;
