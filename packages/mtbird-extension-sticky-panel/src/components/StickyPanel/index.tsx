import React, {useMemo} from 'react';
import {Input, Space, Switch} from 'antd';
import styles from './style.module.less';
import manifest from '../../../manifest.json';
import {ISticky, IStickyExtensionContext,} from "../../definitions";

const DEFAULT_STICKY: ISticky = {
  open: false,
  position: 'top',
  verticalMargin: '10%',
  horizontalMargin: '10%'
}

type ValueOf<T> = T[keyof T]
type KeyValueDispatch<T> = (key: keyof T, value: ValueOf<T>) => void

const useCurrentComponent = (context: IStickyExtensionContext) => useMemo(() => {
  return Array.isArray(context.currentComponent) ? context.currentComponent[0] : context.currentComponent;
}, [context.currentComponent])

const useCurrentSticky = (context: IStickyExtensionContext): [ISticky, KeyValueDispatch<ISticky>] => {
  const stickyKeyPath = "pattern.sticky"

  const currentComponent = useCurrentComponent(context)
  const currentSticky: ISticky | undefined = currentComponent && currentComponent.pattern && currentComponent.pattern.sticky

  const plugSticky = (toPlug: boolean) => {
    if (toPlug) {
      context.injectRenderPipe(manifest.name, manifest.pipes[0]);
    } else {
      context.removeRenderPipe(manifest.name, manifest.pipes[0]);
    }
  }

  const updateCurrentSticky = (key: keyof ISticky, value: ValueOf<ISticky>) => {
    const newSticky = {...currentSticky, [key]: value}

    if (currentSticky) {
      context.onChangeValue(`${stickyKeyPath}.${key}`, value)
    } else {
      context.onChangeValue(stickyKeyPath, newSticky)
    }

    if (key === 'open') {
      plugSticky(!!value)
    }
  }

  return [{...DEFAULT_STICKY, ...currentSticky}, updateCurrentSticky]
}

const StickyPanel: React.FC<{ context: IStickyExtensionContext; }> = ({context}) => {
  const [currentSticky, updateCurrentSticky] = useCurrentSticky(context)
  return (
    <Space direction="vertical" size="large" className={styles.stickyPanel}>
      <div className={styles.switch}>开启跟随
        <Switch checked={currentSticky.open} onChange={(checked) => updateCurrentSticky('open', checked)}/>
      </div>
      <Space size="small" direction="vertical">跟随位置
        <select className={styles.select} value={currentSticky.position}
                onChange={(ev) => updateCurrentSticky("position", ev.currentTarget.value)}>
          <option value="top">屏幕上侧</option>
          <option value="bottom">屏幕下侧</option>
          <option value="left">屏幕左侧</option>
          <option value="right">屏幕右侧</option>
        </select>
      </Space>
      <Space size="middle">
        <Space size="small" direction="vertical">侧边距
          <Input size="small" value={currentSticky.horizontalMargin}
                 onChange={(ev) => updateCurrentSticky("horizontalMargin", ev.currentTarget.value)}/>
        </Space>
        <Space size="small" direction="vertical">底边距
          <Input size="small" value={currentSticky.verticalMargin}
                 onChange={(ev) => updateCurrentSticky("verticalMargin", ev.currentTarget.value)}/>
        </Space>
      </Space>
    </Space>
  );
};

export default StickyPanel;
