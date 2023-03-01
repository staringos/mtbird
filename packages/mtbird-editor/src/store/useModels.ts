import { useState } from "react";
import { IEditorOptions } from "@mtbird/shared";
import { IContext } from "./types";
import wrapOptions from "../utils/wrapOptions";
import useExtensionModal from "./modals/useExtension";
import useCommonModal from "./modals/useCommon";
import usePageModal from "./modals/usePage";

function useStateContext(userOptions: IEditorOptions): IContext {
  const [loading, setLoading] = useState(false);
  const options = wrapOptions(userOptions);
  const extension = useExtensionModal(options, setLoading);
  const common = useCommonModal(options);
  const page = usePageModal(options);

  const context: IContext = {
    state: {
      loading,
      ...extension.state,
      ...page.state,
      ...common.state,
    },
    actions: {
      ...extension.actions,
      ...page.actions,
      ...common.actions,
    },
  };

  return context;
}

export default useStateContext;
