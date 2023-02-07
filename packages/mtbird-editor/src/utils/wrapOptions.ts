import { PC_SIZE } from './constants';
import { IEditorOptions } from '@mtbird/shared';
import cloneDeep from 'lodash/cloneDeep';
import { getParamFromURL, PreviewMobileType, GlobalStorage } from '@mtbird/core';

const wrapEditorSettings = (options: IEditorOptions) => {
  const { pageConfig, editorSettings } = options;
  const platform = pageConfig.type === 'pc' ? 'pc' : 'mobile';
  let mobileType = editorSettings?.mobileType as string;

  if (platform === 'mobile' && !mobileType) mobileType = 'iPhone SE';

  return {
    platform,
    ...editorSettings,
    mobileType,
    defaultToolbar: pageConfig.type === 'form' ? 'form' : 'basic',
    screenWidth: platform === 'pc' ? PC_SIZE.width : PreviewMobileType[mobileType].width,
    screenHeight: platform === 'pc' ? PC_SIZE.height : PreviewMobileType[mobileType].height
  };
};

const wrapOptions = (userOptions: IEditorOptions): IEditorOptions => {
  const options = cloneDeep(userOptions);
  let { extensions, onlineUserList, pageList, pageConfig } = options;
  const debug = GlobalStorage.debugExtension;

  if (!extensions) extensions = [];
  if (!onlineUserList) onlineUserList = [];
  if (!pageList) pageList = [pageConfig];

  // add debug extension
  if (debug) {
    const debugs = debug.split('||');
    debugs.map((curDebug: string) => {
      const name = getParamFromURL(curDebug, 'name');
      extensions = extensions.filter((cur: string) => cur.split('@')[0] !== name);
      extensions.push(curDebug);
    });
  }

  // add screen type
  options.editorSettings = wrapEditorSettings(options);

  return {
    ...options,
    extensions,
    onlineUserList,
    pageList,
    debug
  };
};

export default wrapOptions;
