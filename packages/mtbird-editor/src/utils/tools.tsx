import React from 'react';
import { ExtensionRender, IContributeManifest } from '@mtbird/helper-extension';

export const convertExtensionContributeToTab = (contributes: IContributeManifest[], store: any) => {
  return (contributes || []).map((cur) => ({
    label: cur.params.name,
    key: cur.params.name + cur.feature,
    children: cur.link === 'feature' ? <ExtensionRender store={store} featureKey={cur.feature} /> : ''
  }));
};
