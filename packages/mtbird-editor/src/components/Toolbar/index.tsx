import React, { useContext, useEffect, useState } from "react";
import { Tabs, Button } from "antd";
import styles from "./style.module.less";
import values from "lodash/values";

import tools from "./tools.json";
import { ExtensionRender, helpers } from "@mtbird/helper-extension";
import {
  IComponentInstance,
  IComponentInstanceForm,
  IComponentManifest,
} from "@mtbird/shared";
import { EXTENSION_CONTRIBUTE_TYPE } from "@mtbird/core";
import Model from "../../store/types";
import { Events, EVENT_KEYS } from "@mtbird/core";
import ToolBoxList from "./ToolBoxList";

export default () => {
  const store = useContext(Model);
  const { state, actions } = store;
  const { editorSettings } = state.options;
  const [activeKey, setAcitveKey] = useState(editorSettings?.defaultToolbar);
  const categories = [...tools.categories];
  const tooltabs = state.extensionContributes.get(
    EXTENSION_CONTRIBUTE_TYPE.TOOL.BARS
  );
  const toolbarsBottom = state.extensionContributes.get(
    EXTENSION_CONTRIBUTE_TYPE.TOOL.BOTTOM
  );

  tooltabs?.map((cur) => {
    categories.push({
      ...cur,
      title: cur.params.name,
      key: cur.params.name,
    });
  });

  const manifest = state.registeredComponents; // { ...getManifests(), ...helpers.getExtensionComponentManifests(state.extensionComponents) };

  const getCategoriesGroup = () => {
    return values(manifest).reduce(
      (
        all: Record<
          string,
          IComponentManifest<IComponentInstance | IComponentInstanceForm>
        >,
        cur: IComponentManifest<IComponentInstance | IComponentInstanceForm>
      ) => {
        if (!cur) return all;
        all[cur.category] = all[cur.category] || [];
        if (cur.hideInToolbar) return all;
        all[cur.category].push(cur);
        return all;
      },
      {}
    );
  };

  const categoriesGroup = getCategoriesGroup();

  const Extra = ({ buttons }: any) => {
    return (
      <div className={styles.toolbarBottom}>
        {buttons?.map((cur: any, i: number) => {
          return (
            <Button
              type="text"
              className={styles.toolbarBottomButton}
              title={cur.name}
              onClick={helpers.generateEventHandler(store, cur)}
              key={i}
            >
              <i className={cur.params.icon} />
            </Button>
          );
        })}
      </div>
    );
  };

  const handleTabChange = (e: string) => {
    setAcitveKey(e);
    !state.tabsState["toolTabs"] && actions.toggleTab("toolTabs");
  };

  const tabItems = categories.map((category: any, i: number) => {
    return {
      label: category.title,
      key: category.key,
      children:
        category.link === "feature" ? (
          <ExtensionRender store={store} featureKey={category.feature} />
        ) : (
          <ToolBoxList category={category} categoriesGroup={categoriesGroup} />
        ),
    };
  });

  const handleEventTabChange = (params: { target: string }) => {
    setAcitveKey(params.target);
  };

  useEffect(() => {
    Events.on(EVENT_KEYS.TOOLBAR_SWITCH, handleEventTabChange);
    return () => {
      Events.off(EVENT_KEYS.TOOLBAR_SWITCH, handleEventTabChange);
    };
  }, []);

  return (
    <div
      id="toolTabs"
      className={
        styles.toolbarContainer +
        " " +
        (state.tabsState["toolTabs"] ? "" : styles.toolbarContentHidden)
      }
    >
      <div className={styles.toolbarContent} id="toolbarContent">
        <Tabs
          activeKey={activeKey}
          tabPosition="left"
          tabBarExtraContent={<Extra buttons={toolbarsBottom} />}
          items={tabItems}
          onChange={handleTabChange}
        ></Tabs>
      </div>
    </div>
  );
};
