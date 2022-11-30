import ImageLibTab from './features/ImageLibTab';
import { IExtensionContext } from '@mtbird/shared';

const activity = (context: IExtensionContext) => {
  context.registerFeature('imagelib.tab', ImageLibTab);
};

export default activity;
