import get from "lodash/get";
import type { IDataSource, IData } from "@mtbird/shared";

export class SchemaDataSource implements IDataSource {
  state?: IData;
  setState: ((keyPath: string, data: any) => void) | null = null;

  getState() {
    return this.state as IData;
  }

  getValue = (keyPath: string) => {
    return get(this.state, "currentComponent." + keyPath);
  };

  query = (keyPath: string, dataId: string) => {};

  modify = (keyPath: string, data: IData) => {
    const keys = keyPath.split(".");
    this.setState && this.setState(keys.splice(1, keys.length).join("."), data);
    return Promise.resolve(true);
  };

  delete = (keyPath: string, dataId: string) => Promise.resolve(true);
  create = (keyPath: string, data: IData) => {
    return Promise.resolve(true);
  };

  submit = (formId: string) => {};

  constructor(state: any, setState: (keyPath: string, data: any) => void) {
    this.state = state;
    this.setState = setState;
  }
}
