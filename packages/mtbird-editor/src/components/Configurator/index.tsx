import React, { useState } from "react";
import Tabs from "../Tabs";
import set from "lodash/set";
import Model from "../../store/types";
import {
  SchemaEditorRender,
  IContributeManifest,
} from "@mtbird/helper-component";
import { useContext } from "react";
import { generateSchemaForm } from "../../utils";
import { EXTENSION_CONTRIBUTE_TYPE } from "@mtbird/core";
import { convertExtensionContributeToTab } from "../../utils/tools";

export default () => {
  const store = useContext(Model);
  const { state, actions } = store;
  const {
    currentComponent,
    schemaDataSource,
    extensionComponents,
    pageConfig,
    extensionContributes,
    options,
  } = state;
  const schemaTabs = extensionContributes.get(
    EXTENSION_CONTRIBUTE_TYPE.SCHEMA.TABS
  );
  const [data, setData] = useState({});
  const [tabActiveKey, setTabActiveKey] = useState("1");
  const handleTabChange = (key: string) => {
    setTabActiveKey(key);
  };

  const onChange = (keyPath: string, value: any) => {
    setData(set(data, keyPath, value));
  };

  const firstCurrentComponent = currentComponent?.[0];
  const schemaConfig = generateSchemaForm(
    extensionComponents as any,
    firstCurrentComponent?.componentName
  );

  const styleTab = {
    label: "样式",
    key: "1",
    children: (
      <SchemaEditorRender
        schemaConfig={schemaConfig}
        value={data}
        onChange={onChange}
        dataSource={schemaDataSource}
        onUpload={actions.onUpload}
        variables={state.variables}
      />
    ),
  };

  const tabItems = [
    styleTab,
    ...convertExtensionContributeToTab(
      schemaTabs as IContributeManifest[],
      store
    ),
  ];

  if (!state.tabsState["schemaTabs"]) return <div />;

  return (
    <Tabs
      onChange={handleTabChange}
      style={{ borderLeft: "1px solid var(--gray-8)" }}
      tabItems={tabItems}
      activeKey={tabActiveKey}
      width={260}
    />
  );
};
