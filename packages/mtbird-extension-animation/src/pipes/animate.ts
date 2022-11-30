import { IComponentInstance } from '@mtbird/shared';

const ELEMENT_ID = 'animate-min-css';

export default (params: { node: IComponentInstance }) => {
  const { node } = params;
  const { animate } = node.pattern || {};

  if (!animate || !animate.open) return params;

  const cssDom = document.getElementById(ELEMENT_ID);
  if (!cssDom) {
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    link.id = ELEMENT_ID;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = `${process.env.REGISTRY_URL}/statics/animate.min.css`;
    link.media = 'all';
    head.appendChild(link);
  }

  node.props.className = (node.props.className || '') + ` animate__animated animate__${animate.type}`;

  if (animate.delay) {
    node.props.className = node.props.className + ` animate__delay-${animate.delay}s`;
  }

  if (animate.duration) {
    node.props.className = node.props.className + ` animate__duration-${animate.duration}s`;
  }

  if (animate.repeat) {
    node.props.className = node.props.className + ` animate__repeat-${animate.repeat}`;
  }

  if (animate.infinite) {
    node.props.className = node.props.className + ` animate__infinite`;
  }

  return params;
};
