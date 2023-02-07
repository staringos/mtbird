import { useState } from 'react';
import IContext from '../types/extension';
import { IEditorOptions, IContribute, IComponentCommon, IComponentLibs } from '@mtbird/shared';
import { extensionLoader, extensionInit, helpers } from '@mtbird/helper-extension';
import clone from 'lodash/clone';
import { getManifests } from '@mtbird/component-basic';

function useExtensionModal(options: IEditorOptions, setLoading: (i: boolean) => void): IContext {
  const { extensions } = options;
  const [extensionsParams, setExtensionParams] = useState([]);
  const [componentLibs, setComponentLibs] = useState<IComponentLibs[]>([]);
  const [extensionContributes, setExtensionContributes] = useState(new Map());
  const [extensionPipes, setExtensionPipes] = useState(new Map());
  const [extensionModalVisible, setExtensionModalVisible] = useState(new Map());
  const [extensionComponents, setExtensionComponents] = useState(new Map());
  const [extensionFeatures, setExtensionFeatures] = useState(new Map());
  const [extensionLoadStatus, setExtensionLoadStatus] = useState<string>('not-start');
  const [extensionPanelVisible, setExtensionPanelVisible] = useState(new Map());
  const [registeredComponents, setRegisteredComponents] = useState<Record<string, IComponentCommon>>(getManifests() as any);

  const context: IContext = {
    state: {
      extensions: extensions || [],
      extensionComponents,
      extensionContributes,
      extensionLoadStatus,
      extensionModalVisible,
      extensionFeatures,
      extensionPipes,
      extensionPanelVisible,
      registeredComponents,
      componentLibs
    },
    actions: {
      init: async (store: IContext) => {
        if (extensionLoadStatus !== 'not-start') return;

        // has loaded
        if (extensionsParams && extensionsParams.length === extensions?.length) return;

        setExtensionLoadStatus('loading');
        setLoading(true);

        if (extensions && extensions.length > 0) {
          const res = await extensionLoader(extensions);

          setExtensionContributes(res.contributes);
          setExtensionPipes(res.pipes);
          setExtensionParams(res.extensionParams);
          setExtensionComponents(res.components);
          setComponentLibs(res.componentLibs);

          await extensionInit(store);

          setRegisteredComponents({ ...registeredComponents, ...helpers.getExtensionComponentManifests(res.components) });
        }
        setLoading(false);
        setExtensionLoadStatus('done');
      },
      appendContributes: () => {},
      registerFeature: (key: string, feature: any) => {
        extensionFeatures.set(key, feature);
        setExtensionFeatures(extensionFeatures);
      },
      toggleModal: (key: string, params: IContribute) => {
        extensionModalVisible.set(key, params);
        setExtensionModalVisible(clone(extensionModalVisible));
      },
      togglePanel: (key: string, params: IContribute) => {
        extensionPanelVisible.set(key, params);
        setExtensionPanelVisible(clone(extensionPanelVisible));
      }
    }
  };

  return context;
}

export default useExtensionModal;
