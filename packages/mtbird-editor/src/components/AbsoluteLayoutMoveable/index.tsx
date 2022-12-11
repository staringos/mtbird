import React, { Ref, useImperativeHandle, useEffect, useState, useContext, useMemo, forwardRef } from 'react';
import Moveable from 'react-moveable';
import { COMPONENT_NAME } from '@mtbird/core';
import isArray from 'lodash/isArray';
import { IComponentInstance } from '@mtbird/shared';
import Model from '../../store/types';
import { getDomTransform, getTransformMatrixRotate, setTransformRotate } from '../../utils';
import DimensionViewable from './DimensionViewable';
import DragToolbar from './DragToolbar';
import useShiftKey from '../../store/useShiftKey';
import DataItemEditable from '../DataItemEditable';

export const NON_DRAGGABLE_COMPONENT = [COMPONENT_NAME.CONTAINER_ROOT, COMPONENT_NAME.CONTAINER_BLOCK];
export const NON_RESIZEABLE_COMPONENT = [COMPONENT_NAME.CONTAINER_ROOT, COMPONENT_NAME.CONTAINER_BLOCK];
export const NON_ROTATEABLE_COMPONENT = [COMPONENT_NAME.CONTAINER_ROOT, COMPONENT_NAME.CONTAINER_BLOCK];

interface IProps {
  horizontalGuidelines: any;
  verticalGuidelines: any;
  zoom: number;
  infiniteViewerRef: any;
  selectoRef: any;
  leaderLine: any;
}

export interface IDraggableManagementRef {
  getMoveable: () => Moveable | null;
}

const AbsoluteLayoutMoveable = (
  { selectoRef, horizontalGuidelines, verticalGuidelines, zoom, leaderLine }: IProps,
  ref: Ref<IDraggableManagementRef>
) => {
  const { actions, state } = useContext(Model);
  const { onChange, onBatchChange } = actions;
  const { currentComponent, moveableRef, pageConfig } = state;
  const [moveDom, setMoveDom] = useState<(HTMLElement | SVGElement)[]>([] as any);
  const [targets, setTargets] = useState<any[]>([]);
  const currentFirstComponent = currentComponent?.[0];
  const isShift = useShiftKey();

  useEffect(() => {
    const currentComponentArr = currentComponent as any as IComponentInstance[];
    // don't select root container and empty currentComponent means cancel select
    if (!currentComponent || (currentComponentArr.length === 1 && currentFirstComponent?.componentName === 'ContainerRoot')) {
      return setTargets([]);
    }

    const getTarget = (cur: { id?: string }) => {
      return document.getElementById(cur.id || '');
    };

    const tmpTargets = currentComponent ? currentComponentArr.map(getTarget) : [];
    setTargets([...tmpTargets]);
  }, [pageConfig, currentComponent]);

  const parent = state.componentMap.get(currentFirstComponent?.parent as string);

  const resizeable = useMemo(() => {
    if (!currentComponent || !currentFirstComponent) return false;
    return NON_RESIZEABLE_COMPONENT.indexOf(currentFirstComponent?.componentName) === -1 && (!parent || parent?.layout !== 'flex');
  }, [currentComponent]);

  const draggable = useMemo(() => {
    if (!currentComponent || !currentFirstComponent) return false;
    return NON_DRAGGABLE_COMPONENT.indexOf(currentFirstComponent?.componentName) === -1 && (!parent || parent?.layout !== 'flex');
  }, [currentComponent]);

  const rotatable = useMemo(() => {
    if (!currentComponent || !currentFirstComponent) return false;
    return NON_ROTATEABLE_COMPONENT.indexOf(currentFirstComponent?.componentName) === -1 && (!parent || parent?.layout !== 'flex');
  }, [currentComponent]);

  useImperativeHandle(ref, () => ({
    getMoveable: () => moveableRef?.current
  }));

  const elementGuidelines = useMemo(() => {
    if (!currentFirstComponent) {
      return []; // Array.from(state.componentMap.keys()).map((cur) => document.getElementById(cur));
    }

    const parent = state.componentMap.get(currentFirstComponent.parent as string);
    let brothers: IComponentInstance[] | undefined =
      parent && parent.children ? [parent, ...(parent.children as any)] : parent ? [parent] : undefined;

    if (!brothers) brothers = isArray(currentComponent) ? currentComponent : ([currentComponent] as any);

    return (brothers as any).map((cur: IComponentInstance) => document.getElementById(cur.id || ''));
  }, [state.componentMap]);

  return (
    <Moveable
      ables={[DimensionViewable, DragToolbar, DataItemEditable]}
      ref={moveableRef}
      targets={targets}
      props={{
        dimensionViewable: true,
        editable: true,
        dataItemEditable: true
      }}
      draggable={draggable}
      resizable={resizeable}
      // pinchable={["rotatable"]}

      zoom={1 / zoom}
      throttleResize={1}
      throttleDragRotate={isShift ? 45 : 0}
      keepRatio={targets.length > 1 ? true : isShift}
      rotatable={rotatable}
      snappable={true}
      snapDirections={{ top: true, left: true, right: true, center: true, middle: true }}
      elementSnapDirections={{ top: true, left: true, right: true, center: true, middle: true }}
      snapGap={true}
      isDisplaySnapDigit={true}
      origin={false}
      snapCenter={true}
      snapElement={true}
      snapVertical={true}
      snapHorizontal={true}
      horizontalGuidelines={horizontalGuidelines}
      verticalGuidelines={verticalGuidelines}
      elementGuidelines={elementGuidelines as any}
      defaultClipPath={'inset'}
      // clipArea={true}
      // clipVerticalGuidelines={[0, '50%', '100%']}
      // clipHorizontalGuidelines={[0, '50%', '100%']}
      // clipTargetBounds={true}
      snapThreshold={1}
      snapDigit={1}
      checkInput={true}
      onClick={(e) => {
        const target = e.inputTarget as any;

        if (e.isDouble && target.isContentEditable) {
          return;
        } else {
          selectoRef.current.clickTarget(e.inputEvent, e.inputTarget);
        }
      }}
      onClickGroup={(e) => {
        if (selectoRef.current) {
          selectoRef.current.clickTarget(e.inputEvent, e.inputTarget);
        }
      }}
      onDragGroupStart={(e) => {
        setMoveDom(Array.from(document.querySelectorAll('.mtbird-component')));
      }}
      onDragGroup={(e) => {
        e.events.forEach((cur) => {
          const target = cur.target;
          const config = state.componentMap.get(target.id);
          if (config?.props?.style) {
            const { top, left, right, bottom } = config?.props.style;
            const [translateX, translateY] = cur.beforeTranslate;

            target.style.left = `${parseFloat(left) + translateX}px`;
            target.style.top = `${parseFloat(top) + translateY}px`;
            target.style.right = `${parseFloat(right) - translateX}px`;
            target.style.bottom = `${parseFloat(bottom) - translateY}px`;
          }
        });
      }}
      onDragGroupEnd={(e) => {
        const changeMap = new Map<string, Record<string, any>>();
        e.targets.forEach((target) => {
          changeMap.set(target.id, {
            'props.style.left': parseFloat(target.style.left),
            'props.style.top': parseFloat(target.style.top)
          });
        });
        onBatchChange(changeMap);
      }}
      onResize={(e) => {
        const [translateX, translateY] = e.drag.beforeTranslate;
        const { width, height } = e;
        const style = e.target.style;

        style['top'] = translateY + 'px';
        style['left'] = translateX + 'px';
        style['right'] = -translateX + 'px';
        style['bottom'] = -translateY + 'px';
        style['width'] = width + 'px';
        style['height'] = height + 'px';
      }}
      onResizeEnd={(e) => {
        const target = e.target;
        const { top, left, bottom, right, width, height } = target.style;

        if (!currentComponent) return;

        const handleResize = (cur: IComponentInstance) => {
          const { style } = cur.props;
          onChange('props.style', {
            ...style,
            top: parseInt(top),
            left: parseInt(left),
            bottom: parseInt(bottom),
            right: parseInt(right),
            width: parseInt(width),
            height: parseInt(height)
          });
        };

        isArray(currentComponent) ? (currentComponent as any).forEach(handleResize) : handleResize(currentComponent);
        leaderLine && leaderLine.position();
      }}
      onDragStart={(e) => {
        setMoveDom(Array.from(document.querySelectorAll('.mtbird-component')));
      }}
      onDrag={(e) => {
        if (!draggable) return;

        const target = e.target;
        const node = currentComponent.find((cur: IComponentInstance) => cur.id === target.id);

        if (!node) return;

        const [translateX, translateY] = e.beforeTranslate;
        let { top, left } = node.props.style;

        top = top || 0;
        left = left || 0;

        target.style['top'] = top + translateY + 'px';
        target.style['left'] = left + translateX + 'px';
        target.style['right'] = left - translateX + 'px';
        target.style['bottom'] = top - translateY + 'px';
      }}
      onDragEnd={(e) => {
        const target = e.target;
        const { top, left, bottom, right } = target.style;

        currentComponent.forEach((cur: IComponentInstance) => {
          const { style } = cur.props;

          onChange('props.style', {
            ...style,
            top: parseInt(top),
            left: parseInt(left),
            bottom: parseInt(bottom),
            right: parseInt(right)
          });
        });
        leaderLine && leaderLine.position();
      }}
      onRotate={(e) => {
        if (!rotatable) return;

        const target = e.target;
        const node = currentComponent.find((cur: IComponentInstance) => cur.id === target.id);

        if (!node) return;

        const transformStr = getDomTransform(target);
        const rotateBefore = getTransformMatrixRotate(transformStr);
        const rotateNew = e.beforeDelta;

        const value = setTransformRotate(transformStr, rotateBefore + rotateNew);

        target.style['transform'] = value;
      }}
      onRotateEnd={(e) => {
        if (!rotatable) return;
        const target = e.target;
        const { transform } = target.style;

        currentComponent.forEach((cur: IComponentInstance) => {
          const { style } = cur.props;

          onChange('props.style', {
            ...style,
            transform
          });
        });
      }}
    />
  );
};

export default forwardRef(AbsoluteLayoutMoveable);
