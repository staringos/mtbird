import React, { useContext } from 'react';
import { Avatar, Tooltip } from 'antd';
import Model from '../../store/types';
import { IUser } from '@mtbird/shared';
import styles from './style.module.less';

const UserList = () => {
  const { state } = useContext(Model);
  const { onlineUserList } = state;
  if (!onlineUserList || onlineUserList.length === 0) return <div />;
  return (
    <div className={styles.userList}>
      {onlineUserList.map((cur: IUser, i: number) => {
        return (
          <Tooltip placement="bottom" title={cur.nickname} key={i}>
            <Avatar className={styles.userListAvatar} src={cur.avatar} />
          </Tooltip>
        );
      })}
    </div>
  );
};

export default UserList;
