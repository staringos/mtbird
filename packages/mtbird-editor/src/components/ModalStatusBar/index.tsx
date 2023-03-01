import React, { useContext } from "react";
import { Button } from "antd";
import get from "lodash/get";
import Model from "../../store/types";
import styles from "./style.module.less";
import { getCurrentModal } from "../../utils";

const ModalStatusBar = () => {
  const { state, actions } = useContext(Model);
  const currentModal = getCurrentModal(state.variables);

  if (!currentModal) return <div />;

  const modalComponent = state.componentMap.get(currentModal);
  const modalAlias = get(modalComponent, "data.alias") || "弹窗";

  return (
    <div className={styles.modalStatusBar}>
      <Button
        type="text"
        icon={<i className="mtbird-icon mtbird-arrowleft" />}
        onClick={() => actions.toggleRenderModal(currentModal, false)}
      >
        返回
      </Button>
      <span>{modalAlias}</span>
    </div>
  );
};

export default ModalStatusBar;
