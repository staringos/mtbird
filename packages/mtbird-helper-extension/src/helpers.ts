import { IContribute } from "@mtbird/shared";
import { IExtensionContext } from "@mtbird/shared";

export const generateEventHandler = (store: any, params: IContribute) => {
  return () => {
    switch (params.link) {
      case "panel":
        store.actions.togglePanel(params.feature, params);
        break;
      case "feature":
      case "modal":
        store.actions.toggleModal(params.feature, params);
        break;
      case "link":
        window.open(params.href);
        break;
    }
  };
};

export const getExtensionComponentManifests = (
  extensionComponents: Map<string, IExtensionContext>
) => {
  const res = {};
  Array.from(extensionComponents.keys()).forEach((key: string) => {
    res[key] = extensionComponents.get(key);
  });

  return res;
};
