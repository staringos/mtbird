import { IComponentInstance } from '@mtbird/shared';

const ELEMENT_ID = 'animate-min-css';

export default (params: { node: IComponentInstance; wrapperProps: any }) => {
  const { node, wrapperProps } = params;
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

  wrapperProps.className = (wrapperProps.className || '') + ` animate__animated animate__${animate.type}`;

  if (animate.delay) {
    wrapperProps.className = wrapperProps.className + ` animate__delay-${animate.delay}s`;
  }

  if (animate.duration) {
    wrapperProps.className = wrapperProps.className + ` animate__duration-${animate.duration}s`;
  }

  if (animate.repeat) {
    wrapperProps.className = wrapperProps.className + ` animate__repeat-${animate.repeat}`;
  }

  if (animate.infinite) {
    wrapperProps.className = wrapperProps.className + ` animate__infinite`;
  }

  return params;
};
