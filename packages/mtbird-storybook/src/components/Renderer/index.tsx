import Renderer from '@mtbird/renderer-web';
import { IPageConfig, IDataSource, IData } from '@mtbird/shared';
import InnerDataSource from '../../utils/InnerDataSource';

interface IProps {
  pageConfig: IPageConfig;
  dataSource: IDataSource;
}

const RendererComponent = ({ pageConfig, dataSource }: IProps) => {
  let innerDataSource = dataSource;
  if (!innerDataSource) {
    innerDataSource = new InnerDataSource();
  }
  return <Renderer pageConfig={pageConfig as any} dataSource={innerDataSource as any} />;
};

export default RendererComponent;
