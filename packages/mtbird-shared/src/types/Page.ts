import { IComponentInstance } from './Component';

export interface IPageConfig {
  id: string;
  title: string;
  headImage: string;
  publishedHistoryId?: string;
  data: IComponentInstance;
  type: 'pc' | 'mobile' | 'form' | 'dashboard';
}
