import React, { useRef, useState } from 'react';
import { Input, Space, Button } from 'antd';

interface IProps {
  value: any;
  onChange: (e: string) => void;
  onClear: () => void;
  label: string;
}

const FilterDropdown = ({ value, onChange, onClear, label }: IProps) => {
  const searchInput = useRef();
  const [tmpValue, setTmpValue] = useState<string | undefined>();

  const handleSearch = () => {
    tmpValue && onChange(tmpValue);
  };

  const handleClear = () => {
    onClear();
    setTmpValue(undefined);
  };

  return (
    <div style={{ padding: 8 }}>
      <Input
        ref={searchInput.current}
        placeholder={`搜索 ${label}`}
        value={value}
        onChange={(e) => setTmpValue(e.target.value)}
        onPressEnter={handleSearch}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button type="primary" onClick={handleSearch} icon={<i className="mtbird-icon mtbird-search-outlined" />} size="small" style={{ width: 90 }}>
          搜索
        </Button>
        <Button onClick={handleClear} size="small" style={{ width: 90 }}>
          清除
        </Button>
      </Space>
    </div>
  );
};

export default FilterDropdown;
