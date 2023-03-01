import React, { useContext } from "react";
import { Avatar, Tooltip, Dropdown, Button } from "antd";
import Model from "../../store/types";
import { IUser } from "@mtbird/shared";
import styles from "./style.module.less";

const UserList = () => {
  const { state, actions } = useContext(Model);
  const { onlineUserList } = state;
  if (!onlineUserList || onlineUserList.length === 0) return <div />;

  const items = [
    {
      key: "1",
      label: (
        <a href="javascript:void(0);" onClick={() => actions.toggleTour()}>
          观看引导
        </a>
      ),
    },
  ];

  return (
    <div className={styles.userList}>
      {onlineUserList.map((cur: IUser, i: number) => {
        return (
          <Tooltip
            placement="bottom"
            title={cur.nickname}
            key={i}
            placement="left"
          >
            <Dropdown menu={{ items }}>
              <Avatar
                className={styles.userListAvatar}
                src={
                  cur.avatar ||
                  "https://mtbird-cdn.staringos.com/product/assets/logo.ico.png"
                }
              />
            </Dropdown>
          </Tooltip>
        );
      })}
      <Tooltip placement="bottom" title="添加团队成员">
        <Avatar
          className={styles.userListAvatarAdd}
          onClick={() => window.open("/team/members")}
          src={<i className="mtbird-icon mtbird-plus-circle" />}
        />
      </Tooltip>
    </div>
  );
};

export default UserList;
