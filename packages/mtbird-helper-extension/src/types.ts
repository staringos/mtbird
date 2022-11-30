export type ContributesKeys = 'toolbars' | 'headers' | 'schemas';

export interface IContributeManifest {
  sort: number;
  params: Record<string, any>;
  link:
    | 'feature' // render feature (react component) directly
    | 'modal' // render feature inside a modal
    | 'panel' // render feature inside a panel
    | 'default';
  feature?: string;
}

export interface ISandBox {
  proxy: WindowProxy;
  active: () => void;
  inactive: () => void;
}
