import React, { useContext } from 'react';
import { Button, Tooltip } from 'antd';
import styles from './style.module.less';
import isArray from 'lodash/isArray';
import { MoveableManagerInterface, Renderer } from 'react-moveable';
import Model from '../../../store/types';
import { COMPONENT_NAME, LAYOUT_TYPE, dataURItoBlob, EXTENSION_CONTRIBUTE_TYPE } from '@mtbird/core';
import { toPng } from 'html-to-image';
import { helpers } from '@mtbird/helper-extension';
import { IComponentInstance } from '@mtbird/shared/src/types/Component';
import DataItemEditableContainer from '../../DataItemEditable';

interface IProps {
  moveable: MoveableManagerInterface<any, any>;
}

const DragToolbarContainer = ({ moveable }: IProps) => {
  const store = useContext(Model);
  const { state, actions } = store;
  const rect = moveable.getRect();
  const { pos2 } = moveable.state;
  const contributes = state.extensionContributes.get(EXTENSION_CONTRIBUTE_TYPE.CANVAS.TOOLS);

  const EditableViewer = moveable.useCSS(
    'div',
    `
    {
      position: absolute;
      will-change: transform;
      transform-origin: 0px 0px;
    }
  `
  );

  const currentFirstComponent = state.currentComponent[0] as IComponentInstance;
  const currentNumber = isArray(state.currentComponent) ? state.currentComponent.length : 1;
  const parent = state.componentMap.get(currentFirstComponent?.parent as string) as IComponentInstance;

  const handleUpper = () => {
    // absolute is move layer, upper is upper, lower is lower. grid and flex is move order then upside down
    if (!parent.layout || parent.layout === LAYOUT_TYPE.ABSOLUTE) {
      actions.goUpper();
    } else {
      actions.goLower();
    }
  };

  const handleLower = () => {
    // absolute is move layer, upper is upper, lower is lower. grid and flex is move order then upside down
    if (!parent.layout || parent.layout === LAYOUT_TYPE.ABSOLUTE) {
      actions.goLower();
    } else {
      actions.goUpper();
    }
  };

  const handleTop = () => {
    if (!parent.layout || parent.layout === LAYOUT_TYPE.ABSOLUTE) {
      actions.goTop();
    } else {
      actions.goBottom();
    }
  };

  const handleBottom = () => {
    if (!parent.layout || parent.layout === LAYOUT_TYPE.ABSOLUTE) {
      actions.goBottom();
    } else {
      actions.goTop();
    }
  };

  const handleGroup = () => {
    actions.group(state.currentComponent);
  };

  const handleUngroup = () => {
    actions.ungroup(state.currentComponent[0]);
  };

  const handleSaveTemplate = async () => {
    const currentFirstComponent = state.currentComponent[0];
    const dom = document.getElementById(currentFirstComponent.id as string);
    let urls: string[] = [];

    if (dom) {
      let dataUrl = await toPng(dom, { quality: 0.8 });
      urls = await actions.onUpload([dataURItoBlob(dataUrl)]);
    }

    actions.onSaveTemplate(currentFirstComponent, urls[0]);
  };

  const buttons = [
    {
      title: '复制',
      icon: 'mtbird-icon mtbird-file-copy',
      condition: true,
      action: actions.copyComponent
    },
    {
      title: '删除',
      icon: 'mtbird-icon mtbird-delete',
      condition: true,
      action: actions.deleteComponent
    },
    {
      title: '上移一层',
      icon: 'mtbird-icon mtbird-arrowup',
      condition: true,
      action: handleUpper
    },
    {
      title: '下移一层',
      icon: 'mtbird-icon mtbird-arrowdown',
      condition: true,
      action: handleLower
    },
    {
      title: '置于顶层',
      icon: 'mtbird-icon mtbird-vertical-align-top',
      condition: true,
      action: handleTop
    },
    {
      title: '置于底层',
      icon: 'mtbird-icon mtbird-vertical-align-botto',
      condition: true,
      action: handleBottom
    },
    // {
    //   title: '增加',
    //   icon: 'mtbird-icon mtbird-plus',
    //   action: () => {},
    //   condition: currentFirstComponent?.componentName === COMPONENT_NAME.CONTAINER_BLOCK
    // },
    {
      title: '解除组合',
      icon: 'mtbird-icon mtbird-ungroup',
      action: handleUngroup,
      condition: currentNumber === 1 && currentFirstComponent?.componentName === COMPONENT_NAME.CONTAINER
    },
    {
      title: '组合',
      icon: 'mtbird-icon mtbird-group',
      id: 'groupBtn',
      action: handleGroup,
      condition: currentNumber > 1
    },
    {
      title: '保存为组件模版',
      id: 'saveComponentTemplateBtn',
      icon: 'mtbird-icon mtbird-save',
      action: handleSaveTemplate,
      condition: currentNumber === 1
    }
  ];

  return (
    <EditableViewer
      className={styles.dragToolbarContainer + ' ' + 'moveable-editable'}
      style={{
        transform: `translate(${pos2[0]}px, (${pos2[1]}px) rotate((${rect.rotation}deg) translate(10px)`,
        left: `${rect.width + 10}px`,
        top: `0px`
      }}
    >
      {/* <div className={styles.dataItemWrapper}>
        <DataItemEditableContainer />
      </div> */}

      {buttons.map((cur, i) => {
        if (!cur.condition) return '';
        return (
          <Tooltip placement="right" key={i} title={cur.title}>
            <Button className={styles.dragToolbarButton} id={cur.id} key={cur.title} icon={<i className={cur.icon} />} onClick={cur.action} />
          </Tooltip>
        );
      })}

      {contributes?.map((cur, i) => {
        return (
          <Button
            key={i}
            className={styles.dragToolbarButton}
            id={cur.params.id}
            title={cur.params.name}
            icon={<i className={cur.params.icon} />}
            onClick={helpers.generateEventHandler(store, cur)}
          />
        );
      })}
    </EditableViewer>
  );
};

const DragToolbar = {
  name: 'editable',
  props: {},
  events: {},
  render: (moveable: MoveableManagerInterface<any, any>, React: Renderer) => {
    return <DragToolbarContainer moveable={moveable} />;
  }
};

export default DragToolbar;
