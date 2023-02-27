import { CSSProperties } from "react";
import { IComponentInstance, IComponentInstanceForm } from "./Component";
import { IDataSource } from "./DataSource";

export interface IPipeProps {
  node: IComponentInstanceForm;
  dataSource: IDataSource;
  formId: string | undefined;
  parent: IComponentInstance;
  containerStyle: CSSProperties;
  variables: Record<string, any>;
  wrapperProps: Record<string, any>;
  context: any;
}
