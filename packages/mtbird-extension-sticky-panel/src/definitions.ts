import { IComponentInstanceForm, IExtensionContext } from "@mtbird/shared";

type Override<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type ISticky = {
  open: boolean;
  position: "top" | "right" | "bottom" | "left";
  verticalMargin: string;
  horizontalMargin: string;
};

export type IStickyComponentInstance = IComponentInstanceForm & {
  pattern?: {
    sticky?: ISticky;
  };
};

export type IStickyExtensionContext = Override<
  IExtensionContext,
  {
    currentComponent: IStickyComponentInstance[] | IStickyComponentInstance;
  }
>;
