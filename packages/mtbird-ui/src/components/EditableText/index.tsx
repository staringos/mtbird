import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { Input, Spin } from 'antd';
import styles from './style.module.less';

interface IProps {
  text: string;
  onChange: (text: string) => Promise<boolean>;
  editable: boolean;
}

const EditableText = ({ text, onChange, editable }: IProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editVal, setEditVal] = useState(text);
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    if (editable) {
      setIsEdit(true);
    }
  };

  const handleEditValChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditVal(e.target.value);
  };

  const handleChange = async () => {
    setLoading(true);
    try {
      const res = await onChange(editVal);
      if (res) {
        setIsEdit(false);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleChange();
    }
  };

  return (
    <Spin spinning={loading}>
      {!isEdit && (
        <span className={styles.editableTextText} onDoubleClick={handleEdit}>
          {text} <i className="mtbird-icon mtbird-edit" />
        </span>
      )}
      {isEdit && <Input value={editVal} onChange={handleEditValChange} onKeyDown={handleKeyDown} onBlur={handleChange} />}
    </Spin>
  );
};

export default EditableText;
