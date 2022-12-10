import { ComponentEvent } from '@mtbird/core';
import { IPipeProps } from '@mtbird/shared';
import keys from 'lodash/keys';

/**
 * Get config from events to generate events handler
 * @param props
 * @returns
 */
const EventPipe = (props: IPipeProps) => {
  const { node, context, isEdit } = props;

  if (!node.events || isEdit) return props;

  const events = ComponentEvent.generateEventHandlers(node.events, context);
  keys(events).forEach((key: string) => {
    props.wrapperProps[key] = events[key];
  });
  return props;
};

export default EventPipe;
