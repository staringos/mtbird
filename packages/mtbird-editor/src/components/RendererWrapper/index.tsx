import React, { useContext } from 'react';
import Renderer from '@mtbird/renderer-web';
import Model from '../../store/types';
import { IComponentInstance, IPageConfig } from '@mtbird/shared';
import { CLASS_NAME_DRAG_BLOCK_HANDLER } from '../../utils/constants';

interface IProps {
  pageConfig: IPageConfig;
}

const RendererWrapper = ({ pageConfig }: IProps) => {
  const { state, actions } = useContext(Model);

  const handleChangeSelf = (keyPath: string, value: any) => {
    return actions.onChange(keyPath, value);
  };

  return (
    <Renderer
      isEdit={true}
      pageConfig={pageConfig}
      platform={pageConfig.type === 'pc' ? 'pc' : 'mobile'}
      dataSource={state.pageDataSource}
      onUpload={actions.onUpload}
      variables={state.variables}
      onChangeSelf={handleChangeSelf}
      renderExtra={(node: IComponentInstance) => {
        if (node?.componentName !== 'ContainerBlock') return '';
        return (
          <div className={CLASS_NAME_DRAG_BLOCK_HANDLER} data-id={node.id}>
            ————————
          </div>
        );
      }}
    />
  );
};

export default RendererWrapper;
