import React from 'react';
import styles from './style.module.less';
import { Button } from 'antd';
// import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface IProps {
  editable?: (cur: Record<string, any>) => boolean;
  deleteable?: (cur: Record<string, any>) => boolean;
  data: Array<Record<string, any>>;
  columns: { key: string; render?: ((cur: Record<string, any>) => any) | undefined }[];
  onToChange?: (cur: Record<string, any>, i?: number) => void;
  onDelete?: (cur: Record<string, any>, i?: number) => void;
}

const List = ({ data, columns, onToChange, onDelete, editable, deleteable }: IProps) => {
  return (
    <ul className={styles.fieldsList}>
      {data &&
        data.map((cur: Record<string, any>, j: number) => {
          return (
            <li className={styles.fieldItem} key={cur.id}>
              <div className={styles.fieldItemLeft}>
                {columns.map((field, i) => {
                  return (
                    <span key={i} className={styles.fieldItemProperty}>
                      {field.render ? field.render(cur) : cur[field.key]}
                    </span>
                  );
                })}
              </div>
              <div>
                <Button type="link" disabled={editable ? editable(cur) : false} onClick={() => onToChange && onToChange(cur, j)}>
                  <i className="mtbird-icon mtbird-edit" />
                </Button>
                <Button type="link" disabled={deleteable ? deleteable(cur) : false} onClick={() => onDelete && onDelete(cur, j)}>
                  <i className="mtbird-icon mtbird-delete" />
                </Button>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default List;
