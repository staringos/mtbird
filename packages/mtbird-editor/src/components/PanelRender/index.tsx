import React, { useContext } from 'react';
import { Card } from 'antd';
import Model from '../../store/types';
import { ExtensionRender } from '@mtbird/helper-extension';
import styles from './style.module.less';

const POSITION = [
  {
    top: 50,
    right: 50
  },
  {
    top: 50,
    left: 50
  },
  {
    bottom: 50,
    right: 50
  },
  {
    bottom: 50,
    right: 50
  }
];

const PanelRender = () => {
  const store = useContext(Model);
  const { state, actions } = store;

  if (!state.extensionPanelVisible) return <div />;

  const handleClose = (key: string) => {
    actions.togglePanel(key, null);
  };

  return (
    <>
      {Array.from(state.extensionPanelVisible)
        .filter(([key, value]: any) => value)
        .map(([key, value]: any, i: number) => {
          return (
            <Card
              className={styles.panelContainer}
              size="small"
              title={value.params.name}
              extra={
                <a href="javascript:void(0);" onClick={() => handleClose(key)}>
                  <i className="mtbird-icon mtbird-close" />
                </a>
              }
              style={{ width: 300, ...POSITION[i % 3] }}
            >
              <ExtensionRender store={store} componentKey={key} config={value} featureKey={key} key={key}></ExtensionRender>
            </Card>
          );
        })}
    </>
  );
};

export default PanelRender;
