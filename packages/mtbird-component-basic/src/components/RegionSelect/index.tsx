import React, { useEffect, useState } from 'react';
import { Select, Form } from 'antd';
import { ISchemaProps } from '../../../types/schema';
import styles from './style.module.less';
import manifest from './manifest';
import FormItemComponent from '../Form/FormItem';
import { getProvince, getRegions } from './services';

interface IAddress {
  id: number;
  name: string;
}

const RegionSelectComponent = (allProps: ISchemaProps) => {
  const { value, onChangeValue, componentOnly, node } = allProps;
  const { formConfig } = node;
  const [address, setAddress] = useState(value?.split(',') || new Array(3));
  const [provinces, setProvinces] = useState<IAddress[]>([]);
  const [cities, setCities] = useState<IAddress[]>([]);
  const [areas, setAreas] = useState<IAddress[]>([]);

  const initProvince = async () => {
    const res: any = await getProvince();
    setProvinces(res.data);
  };

  useEffect(() => {
    initProvince();
  }, []);

  useEffect(() => {
    onChangeValue(address.join(','));
  }, [address]);

  const handleChange = async (e: any, target: number) => {
    // address[target] = e;
    let res: any = [];

    switch (target) {
      case 0:
        res = await getRegions(e);
        setCities(res.data);
        setAreas([]);
        setAddress([provinces.find((cur) => cur.id === e)?.name]);
        break;
      case 1:
        res = await getRegions(e);
        setAreas(res.data);
        setAddress([address[0], cities.find((cur) => cur.id === e)?.name]);
        break;
      case 2:
        const name = areas.find((cur) => cur.id === e)?.name;
        setAddress([address[0], e, name]);
        break;
    }
  };

  const component = (
    <div className={styles.regionSelectItemContainer}>
      <Form.Item name={['address', 'province']} noStyle rules={[{ required: formConfig?.isRequired, message: '省不能为空！' }]}>
        <Select placeholder="请选择省" value={address[0]} className={styles.regionSelectItem} onChange={(e) => handleChange(e, 0)}>
          {provinces &&
            provinces.map((cur: IAddress) => {
              return (
                <Select.Option value={cur.id} key={cur.id}>
                  {cur.name}
                </Select.Option>
              );
            })}
        </Select>
      </Form.Item>
      <Form.Item name={['address', 'cities']} noStyle rules={[{ required: formConfig?.isRequired, message: '市不能为空！' }]}>
        <Select placeholder="请选择城市" value={address[1]} className={styles.regionSelectItem} onChange={(e) => handleChange(e, 1)}>
          {cities &&
            cities.map((cur: IAddress) => {
              return (
                <Select.Option value={cur.id} key={cur.id}>
                  {cur.name}
                </Select.Option>
              );
            })}
        </Select>
      </Form.Item>
      <Form.Item name={['address', 'areas']} noStyle rules={[{ required: formConfig?.isRequired, message: '区不能为空！' }]}>
        <Select placeholder="请选择区县" value={address[2]} className={styles.regionSelectItem} onChange={(e) => handleChange(e, 2)}>
          {areas &&
            areas.map((cur: IAddress) => {
              return (
                <Select.Option value={cur.id} key={cur.id}>
                  {cur.name}
                </Select.Option>
              );
            })}
        </Select>
      </Form.Item>
    </div>
  );

  if (componentOnly) {
    return component;
  }

  return (
    <FormItemComponent {...allProps} renderChildrenOnly={true}>
      {component}
    </FormItemComponent>
  );
};

RegionSelectComponent.manifest = manifest;

export default RegionSelectComponent;
