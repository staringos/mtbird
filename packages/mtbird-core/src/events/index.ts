import EventEmitter from "eventemitter2";

export default new EventEmitter();

export const EVENT_KEYS = {
  TEMPLATE_ADDED: Symbol("TEMPLATE_ADDED"),
  TOOLBAR_SWITCH: Symbol("TOOLBAR_SWITCH"),
  SELECT_COMPONENT: Symbol("SELECT_COMPONENT"),
};
