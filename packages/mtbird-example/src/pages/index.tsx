import React from "react";
import EditorComponent from "@/components/Editor";
import styles from "./style.module.css";

const IndexPage = () => {
  return (
    <div className={styles.editorPage}>
      <EditorComponent />
    </div>
  );
};

export default IndexPage;
