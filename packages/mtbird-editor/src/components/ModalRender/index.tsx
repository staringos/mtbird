import React, { useContext } from 'react';
import Model from '../../store/types';
import { ExtensionModal } from '@mtbird/helper-extension';

const ModalRender = () => {
  const store = useContext(Model);
  const { state } = store;

  return (
    <>
      {Array.from(state.extensionModalVisible)
        .filter(([key, value]: any) => value)
        .map(([key, value]: any) => {
          return <ExtensionModal store={store} componentKey={key} config={value} featureKey={key} key={key}></ExtensionModal>;
        })}
    </>
  );
};

export default ModalRender;
