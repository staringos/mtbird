import React, { useContext, useMemo } from 'react';
import { Button, Dropdown, Tooltip } from 'antd';
import { IComponentInstance } from '@mtbird/shared';
import { getManifests } from '@mtbird/component-basic';
import Model from '../../../store/types';
import ShapeList from 'src/components/ShapeList';
import styles from './style.module.less';
interface IButton {
  icon: string;
  title: string;
  type: string;
  componentName: string;
  template: IComponentInstance;
}

const manifests = getManifests();

const HeaderBars = () => {
  const { actions, state } = useContext(Model);
  const { editMode } = state;

  const handleClick = (button: IButton) => {
    switch (button.type) {
      case 'newComponent':
        actions.setEditMode(button.template);
        break;
      case 'dropdown':
        break;
    }
  };

  const buttons: IButton[] = [
    {
      icon: 'mtbird-icon mtbird-pointer',
      title: '移动',
      type: 'newComponent',
      componentName: 'cursor',
      template: { componentName: 'cursor' }
    },
    {
      icon: 'mtbird-icon mtbird-text',
      title: '文本',
      type: 'newComponent',
      componentName: 'Text',
      template: manifests.Text.instance
    },
    {
      icon: 'mtbird-icon mtbird-image',
      title: '图片',
      type: 'newComponent',
      componentName: 'Image',
      template: manifests.Image.instance
    },
    {
      icon: 'mtbird-icon mtbird-video',
      title: '视频',
      type: 'newComponent',
      componentName: 'Video',
      template: manifests.Video.instance
    },
    {
      icon: 'mtbird-icon mtbird-border',
      title: '容器',
      type: 'newComponent',
      componentName: 'Container',
      template: manifests.Container.instance
    },
    {
      icon: 'mtbird-icon mtbird-shapes',
      title: '图形',
      type: 'dropdown',
      componentName: 'Shape',
      template: <ShapeList />
    },
    {
      icon: 'mtbird-icon mtbird-form',
      title: '表单',
      type: 'newComponent',
      componentName: 'Form',
      template: manifests.Form.instance
    }
  ];

  const btns = useMemo(() => {
    return buttons.map((cur) => {
      const className = styles.headerBarButton + ' ' + (editMode.componentName === cur.componentName ? styles.activeButton : '');

      if (cur.type === 'newComponent') {
        return (
          <Button className={className} type="link" key={cur.title} onClick={() => handleClick(cur)}>
            <Tooltip placement="top" title={cur.title}>
              <i className={cur.icon} />
            </Tooltip>
          </Button>
        );
      }

      return (
        <Dropdown overlay={cur.template} key={cur.title} trigger={['hover']}>
          <Button className={styles.headerBarButtonDropdown + ' ' + className} type="link" title={cur.title}>
            <Tooltip placement="top" title={cur.title}>
              <i className={cur.icon}></i>
              <i className="mtbird-icon mtbird-down" style={{ marginLeft: 5, fontSize: '10px' }} />
            </Tooltip>
          </Button>
        </Dropdown>
      );
    });
  }, [editMode]);

  return <div className={styles.headerBars}>{btns}</div>;
};

export default HeaderBars;
