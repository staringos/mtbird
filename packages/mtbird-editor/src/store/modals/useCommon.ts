import { IEditorOptions, IEditorSettings } from "@mtbird/shared";
import { initVariables, GlobalStorage } from "@mtbird/core";
import { useState } from "react";
import { IContext, EditMode } from "../types/common";
import set from "lodash/set";
import keys from "lodash/keys";

function useCommonModal(opts: IEditorOptions): IContext {
  const { onUpload, onSaveTemplate } = opts;
  const [options, setOptions] = useState(opts);
  const [editMode, setEditMode] = useState<EditMode>({
    componentName: "cursor",
  });
  const [variables, setVariables] = useState(
    initVariables(options.pageConfig.data, opts)
  );
  const [tabsState, setTabsState] = useState(GlobalStorage.tabState);
  const [tourState, setTourState] = useState(GlobalStorage.tourState);

  const context: IContext = {
    state: {
      options,
      variables,
      editMode,
      onlineUserList: options.onlineUserList,
      tabsState,
      tourState,
    },
    actions: {
      toggleTour: () => {
        const value = !tourState;
        setTourState(value);
        GlobalStorage.tourState = value;
      },
      toggleTab: (tabKey: string) => {
        const value = { ...tabsState, [tabKey]: !tabsState[tabKey] };
        setTabsState(value);
        GlobalStorage.tabState = value;
      },
      setEditMode,
      onUpload,
      onSaveTemplate,
      toggleRenderModal: (id, e: boolean) => {
        const key = `$modals.${id}`;
        set(variables, key, !!e);
        setVariables({ ...variables });
      },
      setEditorSettings: (settings: IEditorSettings) => {
        setOptions({
          ...options,
          editorSettings: {
            ...options.editorSettings,
            ...settings,
          },
        });
      },
      getCurrentModal: () => {
        return keys(variables.$modals).filter(
          (cur: string) => !!variables.$modals[cur]
        )[0];
      },
    },
  };

  return context;
}

export default useCommonModal;
