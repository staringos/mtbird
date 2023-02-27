import { useContext } from "react";
// import ReactJson from 'react-json-view'
import Model from "../../store/types";

const JsonViewer = () => {
  const context = useContext(Model);
  return (
    <div>
      <h3>页面配置</h3>
      <div>{JSON.stringify(context.state.pageConfig)}</div>
    </div>
  );
};

export default JsonViewer;
