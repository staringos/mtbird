import { GLOBAL_EXTENSION_KEY } from "@mtbird/core";
import { IContext } from "../../mtbird-editor/src/store/types";
import { IExtension } from "../../mtbird-shared/src/types/Extension";
import ExtensionContext from "./ExtensionContext";
import keys from "lodash/keys";

const extensionInit = async (store: IContext) => {
  const extensions: Record<string, IExtension> =
    (window[GLOBAL_EXTENSION_KEY] as any) || {};
  if (!extensions) {
    return;
  }

  await Promise.all(
    keys(extensions).map(async (extensionName: string) => {
      const cur = extensions[extensionName] as any;
      if (!cur.default) return;

      const context = new ExtensionContext(store, extensionName);
      await cur.default(context);
    })
  );
};

export default extensionInit;
