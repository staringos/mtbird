import { IDataSource, IData } from "@mtbird/shared";

export default class InnerDataSource implements IDataSource {
  getValue = (keyPath: string) => {
    return "";
  };

  getState = () => "";
  query = (key: string, id: string) => "";
  modify = async (key: string, data: IData) => true;
  delete = async (key: string, id: string) => true;
  create = async (key: string, data: IData) => "";
  submit = (formId: string) => {};
}
