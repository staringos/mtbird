import type { IPageConfig, ISchemaOptions } from '@mtbird/shared';

interface ISchemaProps {
  page?: IPageConfig;
  keyPath: string;
  value: string;
  options: ISchemaOptions;
  onChange: (keyPath: string, value: any) => void;
}
