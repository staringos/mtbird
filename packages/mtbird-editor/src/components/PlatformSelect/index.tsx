import React, { useContext } from 'react';
import { Radio } from 'antd';
import { PreviewMobileType } from '@mtbird/core';
import { IEditorSettings } from '@mtbird/shared';
import Model from 'src/store/types';
import styles from './style.module.less';
import { PC_SIZE } from '../../utils/constants';

interface IProps {
  platform: string;
}

const PlatformSelect = () => {
  const { state, actions } = useContext(Model);
  const { editorSettings } = state.options;

  // const handleSizeChange = (e: string) => {
  //   const newSettings: IEditorSettings = {
  //     platform: 'mobile'
  //   };
  //   newSettings.mobileType = e;
  //   newSettings.screenWidth = PreviewMobileType[newSettings.mobileType];
  //   newSettings.screenHeight = PreviewMobileType[newSettings.mobileType];

  //   actions.setEditorSettings(newSettings);
  // };

  const handlePlatformChange = (platform: string) => {
    const newSettings: IEditorSettings = {
      platform
    };

    if (platform === 'mobile') {
      if (!editorSettings.mobileType) {
        newSettings.mobileType = 'iPhone SE';
      }
      newSettings.screenWidth = PreviewMobileType[newSettings.mobileType];
      newSettings.screenHeight = PreviewMobileType[newSettings.mobileType];
    }

    if (platform === 'pc') {
      newSettings.screenWidth = PC_SIZE.width;
      newSettings.screenHeight = PC_SIZE.height;
    }

    actions.setEditorSettings(newSettings);
  };

  // const DeviceSelect = (
  //   <Select size="small" onChange={handleSizeChange} value={editorSettings.mobileType}>
  //     {keys(PreviewMobileType).map((cur: any) => {
  //       return <Select.Option key={cur}>{cur}</Select.Option>;
  //     })}
  //   </Select>
  // );

  return (
    <div className={styles.platformSelect}>
      {/* {editorSettings.platform === 'mobile' && DeviceSelect} */}
      <Radio.Group
        className={styles.platformRadio}
        size="small"
        value={editorSettings.platform}
        onChange={(e: any) => handlePlatformChange(e.target.value)}
      >
        <Radio.Button className={styles.platformRadioButton} value="pc" size="small">
          <i className="mtbird-icon mtbird-desktop" />
        </Radio.Button>
        <Radio.Button className={styles.platformRadioButton} value="mobile" size="small">
          <i className="mtbird-icon mtbird-mobile" />
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default PlatformSelect;
