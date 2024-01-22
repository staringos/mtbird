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
        const isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i
        if (isJavaScriptProtocol.test(params.href)) {
            break;
        }
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
