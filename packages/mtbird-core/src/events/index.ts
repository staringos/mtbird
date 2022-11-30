import EventEmitter from 'eventemitter2';
import { EventAction, IEvent } from '@mtbird/shared';
import keys from 'lodash/keys';
import { generateFunction } from '../utils';

export default new EventEmitter();

export const EVENT_KEYS = {
  TEMPLATE_ADDED: Symbol('TEMPLATE_ADDED'),
  TOOLBAR_SWITCH: Symbol('TOOLBAR_SWITCH'),
  SELECT_COMPONENT: Symbol('SELECT_COMPONENT')
};

export const EventActionConstants = { click: 'click', hover: 'hover', blur: 'blur', dbclick: 'dbclick', scroll: 'scroll' };
export const EventActionEventHandler = { click: 'onClick', hover: 'onHover', blur: 'onBlur', dbclick: 'onDbClick', scroll: 'onScroll' };

export const EventType = {
  link: 'link',
  linkBlank: 'link-blank',
  submit: 'submit',
  clear: 'clear',
  openModal: 'open-modal',
  closeModal: 'close-modal',
  inlineCode: 'inline-code',
  changeVariable: 'change-variable'
};

export const generateEventHandlers = (events: Record<EventAction, IEvent>, context: any) => {
  const handers = {};

  const handlerGenerator = (event: IEvent) => {
    return () => {
      switch (event.type) {
        case EventType.changeVariable:
          return context.changeVariable(event.keyPath, event.value);
        case EventType.openModal:
          return context.changeVariable(`$modals.${event.modalId}`, true);
        case EventType.closeModal:
          return context.changeVariable(`$modals.${event.modalId}`, false);
        case EventType.linkBlank:
          return window.open(event.src);
        case EventType.linkBlank:
          return (location.href = event.src);
        case EventType.inlineCode:
          return generateFunction(event.inlineCode);
      }
    };
  };

  keys(events).forEach((event: IEvent) => {
    handers[EventActionEventHandler[event]] = handlerGenerator(events[event]);
  });

  return handers;
};
