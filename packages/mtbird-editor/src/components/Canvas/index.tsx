import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './style.module.less';
import InfiniteViewer from 'react-infinite-viewer';
import type { IPageConfig, IComponentInstance } from '@mtbird/shared';
import Model from '../../store/types';
import GuildLine, { IGuildLineRef } from '../GuildLine';
import AbsoluteLayoutMoveable, { IDraggableManagementRef, NON_DRAGGABLE_COMPONENT } from '../AbsoluteLayoutMoveable';
import Selecto from 'react-selecto';
import { getElementInfo } from 'react-moveable';
import { getSelectedComponent } from '../../utils';
import { CLASS_NAME_DRAG_BLOCK_HANDLER } from '../../utils/constants';
import RendererWrapper from '../RendererWrapper';
import DataItemEditableContainer from '../DataItemEditable';
import { useLeaderLine } from 'src/utils/hooks';

interface IProps {
  page: IPageConfig;
}

let domBlockContainerHandler: any = null;
let blockHandlerPositionStart: number = 0;

export default () => {
  const { state, actions } = useContext(Model);
  const { loading, options, editMode, moveableRef, currentComponent } = state;
  const { editorSettings } = options;
  const [zoom, setZoom] = useState(1);
  const selectoRef = useRef<Selecto | null>(null);
  const guildLineRef = useRef<IGuildLineRef>(null);
  const containerRef = useRef(null);
  const draggableManagementRef = useRef<IDraggableManagementRef>(null);
  const infiniteViewerRef = useRef<InfiniteViewer>(null);

  const [horizontalSnapGuides, setHorizontalSnapGuides] = useState<number[]>([]);
  const [verticalSnapGuides, setVerticalSnapGuides] = useState<number[]>([]);
  const selectableTargets = ['.mtbird-selectable-component'];
  const toggleContinueSelect = ['shift'];
  const leaderLine = useLeaderLine(currentComponent);

  const currentModal = actions.getCurrentModal();

  if (!state.pageConfig) {
    return <div>加载中...</div>;
  }

  const handleGuidesLineSnapChange = (direction: 'horizontal' | 'vertical', guides: number[]) => {
    if (direction === 'horizontal') return setHorizontalSnapGuides(guides);
    setVerticalSnapGuides(guides);
  };

  const handleCancelSelect = () => {
    // TODO cancel select and selecto event conflict
    // actions.onSelect(null);
  };

  const guideDom = guildLineRef.current;

  requestAnimationFrame(() => {
    if (guideDom) {
      guideDom?.getVert()?.resize();
      guideDom?.getHori()?.resize();
    }
  });

  useEffect(() => {
    if (infiniteViewerRef.current) {
      infiniteViewerRef.current!.scrollCenter();
    }
  }, []);

  const handlerMouseDown = (e: any) => {
    const { target, clientY } = e.nativeEvent;
    if (target.className === CLASS_NAME_DRAG_BLOCK_HANDLER) {
      e.preventDefault();
      e.stopPropagation();
      domBlockContainerHandler = target;
      target.style.display = 'block';
      blockHandlerPositionStart = clientY;
    }
  };

  const handlerMouseMove = (e: any) => {
    if (domBlockContainerHandler) {
      e.preventDefault();
      e.stopPropagation();
      const { clientY } = e.nativeEvent;
      domBlockContainerHandler.style.bottom = `${-clientY + blockHandlerPositionStart}px`;
      domBlockContainerHandler.parentNode.style.zIndex = 1;
    }
  };

  const handlerMouseUp = (e: any) => {
    if (domBlockContainerHandler) {
      e.preventDefault();
      e.stopPropagation();
      const { clientY } = e.nativeEvent;

      const component = state.componentMap.get(domBlockContainerHandler.dataset.id) as IComponentInstance;
      const height = component.props.style?.height;
      const distance = clientY - blockHandlerPositionStart;
      const newHeight = height + distance;

      actions.onChange('props.style.height', newHeight, component.id);

      domBlockContainerHandler.style.display = '';
      domBlockContainerHandler.style.bottom = 0;
      domBlockContainerHandler.parentNode.style.zIndex = -1;
      blockHandlerPositionStart = 0;
      domBlockContainerHandler = null;
    }
  };

  return (
    <div ref={containerRef} className={styles.canvasWrapper + ' selectoContainer'} onClick={handleCancelSelect}>
      <GuildLine
        zoom={zoom}
        ref={guildLineRef}
        containerRef={containerRef}
        infiniteViewerRef={infiniteViewerRef}
        horizontalSnapGuides={horizontalSnapGuides}
        verticalSnapGuides={verticalSnapGuides}
        onGuidesChange={handleGuidesLineSnapChange}
      />
      <InfiniteViewer
        ref={infiniteViewerRef}
        className={styles.infiniteViewer + ' viewer'}
        id="convas-container"
        usePinch={true}
        useWheelScroll={!state.currentComponent || state.currentComponent.length === 0}
        maxPinchWheel={3}
        zoom={zoom}
        onScroll={(e) => {
          leaderLine && leaderLine.position();
          if (!guildLineRef?.current) return;
          const horiz = guideDom?.getHori();
          if (horiz) {
            horiz.scroll(e.scrollLeft);
            horiz.scrollGuides(e.scrollTop);
          }

          const vert = guideDom?.getVert();
          if (vert) {
            vert.scroll(e.scrollTop);
            vert.scrollGuides(e.scrollLeft);
          }
        }}
        onDragEnd={(e) => {
          if (!e.isDrag) {
            selectoRef.current!.clickTarget(e.inputEvent);
          }
        }}
        onPinch={(e) => {
          const moveable = draggableManagementRef.current!.getMoveable();
          if (!moveable || moveable.isDragging()) {
            return;
          }

          e && e.zoom && setZoom(e.zoom);
        }}
      >
        <div
          className={styles.canvasContent + ' viewport'}
          style={{ width: editorSettings?.screenWidth }}
          onMouseUpCapture={handlerMouseUp}
          onMouseMoveCapture={handlerMouseMove}
          onMouseDownCapture={handlerMouseDown}
        >
          <AbsoluteLayoutMoveable
            ref={draggableManagementRef}
            selectoRef={selectoRef}
            zoom={zoom}
            horizontalGuidelines={horizontalSnapGuides}
            verticalGuidelines={verticalSnapGuides}
            infiniteViewerRef={infiniteViewerRef}
            leaderLine={leaderLine}
          />
          <div className={styles.canvasOutsider + ' ' + (currentModal ? styles.canvasOutsiderModal : '')}>
            <DataItemEditableContainer />
            {!loading && <RendererWrapper pageConfig={state.pageConfig} />}
          </div>
        </div>
      </InfiniteViewer>
      {/* https://github.com/daybrush/selecto/issues/87 */}
      <Selecto
        ref={selectoRef}
        getElementRect={getElementInfo}
        dragContainer={`.selectoContainer`}
        hitRate={0}
        ratio={0}
        selectByClick={true}
        selectFromInside={true}
        selectableTargets={selectableTargets}
        toggleContinueSelect={toggleContinueSelect}
        preventDefault={true}
        scrollOptions={
          infiniteViewerRef.current
            ? {
                container: infiniteViewerRef.current.getContainer(),
                threshold: 30,
                throttleTime: 30,
                getScrollPosition: () => {
                  const current = infiniteViewerRef.current!;
                  return [current.getScrollLeft(), current.getScrollTop()];
                }
              }
            : undefined
        }
        onDragStart={(e) => {
          const inputEvent = e.inputEvent;
          const target = inputEvent.path.find((cur: any) => cur?.className?.indexOf?.('mtbird-component') !== -1);
          const id = target.id;
          const cls = target.className?.split(' ') || [];

          if (!target) return e.stop();

          if (
            // moving temporarily group
            inputEvent.target?.className?.indexOf('moveable-area') !== -1 ||
            (inputEvent.type === 'touchstart' && e.isTrusted) ||
            moveableRef.current?.isDragging() ||
            // moving component draggable
            (!NON_DRAGGABLE_COMPONENT.find((cur) => cls.indexOf(cur) !== -1) &&
              // moving component already selected
              state.currentComponent.some((t: IComponentInstance) => t.id === id))
          ) {
            return e.stop();
          }
        }}
        onScroll={({ direction }) => {
          infiniteViewerRef.current!.scrollBy(direction[0] * 10, direction[1] * 10);
        }}
        onSelectEnd={(e) => {
          const { isDragStart, inputEvent, selected } = e;
          if (isDragStart) {
            inputEvent.preventDefault();
          }
          e.inputEvent.preventDefault();
          e.inputEvent.stopPropagation();

          // added
          if (editMode.componentName !== 'cursor') {
            const dom = e.inputEvent.path[0];
            const id = dom.id || dom.parentNode.id;
            const { left, top } = dom.getBoundingClientRect();

            actions.addComponentWithPos(
              {
                width: e.rect.width / zoom,
                height: e.rect.height / zoom,
                left: (e.rect.left - left) / zoom,
                top: (e.rect.top - top) / zoom
              },
              editMode as IComponentInstance,
              id
            );

            actions.setEditMode({ componentName: 'cursor' });
            return;
          }
          // const moveable = moveableRef.current;

          // select
          if (e.selected.length && e.selected[0]?.id) {
            const selected = getSelectedComponent(e.selected, state.componentMap);
            actions.onSelect(selected as any);

            isDragStart && moveableRef.current?.dragStart(e.inputEvent);

            // setTimeout(() => {
            //   moveable?.dragStart(e.inputEvent);
            // });
          }
        }}
      />
    </div>
  );
};
