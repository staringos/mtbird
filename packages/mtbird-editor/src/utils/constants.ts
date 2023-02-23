import { COMPONENT_NAME } from '@mtbird/core';

export const PC_SIZE = {
  width: 1280,
  height: 800
};

export const SAVE_STATE: Record<string, 'SAVED' | 'SAVING'> = {
  SAVED: 'SAVED',
  SAVING: 'SAVING'
};

export const SAVE_STATE_LABEL = {
  SAVED: '已保存',
  SAVING: '保存中'
};

export const CLASS_NAME_DRAG_BLOCK_HANDLER = 'container-block-dragging-handler';

export const ADD_ROOT_COMPONENT = [COMPONENT_NAME.CONTAINER_BLOCK, COMPONENT_NAME.MODAL];
