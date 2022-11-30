import { IExtensionContext } from '@mtbird/shared';
import StickyPanel from './components/StickyPanel';

const activity = (context: IExtensionContext) => {
  context.registerFeature('sticky.panel', StickyPanel);
};

export default activity;
