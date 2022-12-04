import { ComponentEvent } from '@mtbird/core';
import { IPipeProps } from '@mtbird/shared';

/**
 * Get config from events to generate events handler
 * @param props
 * @returns
 */
const EventPipe = (props: IPipeProps) => {
  const { node, context } = props;
  // node.props.className = node.props.className + ' ' + node.componentName;

  let events = {};
  if (node.events) {
    events = ComponentEvent.generateEventHandlers(node.events, context);
    node.props = { ...node.props, ...events };
  }

  return { ...props, node };
};

export default EventPipe;
