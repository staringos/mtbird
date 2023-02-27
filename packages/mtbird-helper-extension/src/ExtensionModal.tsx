import React from "react";
import { Modal } from "antd";
import ExtensionRender from "./ExtensionRender";

interface IProps {
  store: any;
  featureKey: string;
  config: {
    params: {
      name: string;
      width: string;
    };
  };
}

const ExtensionModal = ({ store, featureKey, config }: IProps) => {
  const { actions, state } = store;
  const handleCancel = () => {
    actions.toggleModal(featureKey, false);
  };

  return (
    <Modal
      title={config.params?.name}
      width={config.params?.width}
      full
      visible={state.extensionModalVisible.get(featureKey)}
      onCancel={handleCancel}
      footer={null}
    >
      <ExtensionRender store={store} featureKey={featureKey}></ExtensionRender>
    </Modal>
  );
};

export default ExtensionModal;
