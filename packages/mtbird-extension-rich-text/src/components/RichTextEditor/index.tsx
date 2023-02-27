import React, { useEffect } from "react";
import styles from "./style.module.less";
import manifest from "./manifest";
import {
  IComponentDefine,
  IComponentProps,
  IComponentInstanceForm,
} from "@mtbird/shared";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import isString from "lodash/isString";

const RichTextEditor: IComponentDefine<IComponentInstanceForm> = (
  props: IComponentProps
) => {
  const { value, onChangeValue } = props;
  const content = props.value;
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
    ],
    content: isString(content) ? content : "",
  });
  // if (!editor) {
  //   return <div />;
  // }

  useEffect(() => {
    editor?.off("update");
    editor?.on("update", ({ editor: updatedEditor }) =>
      onChangeValue(updatedEditor.getHTML())
    );

    return () => {
      editor?.off("update");
      // editor?.destroy();
    };
  }, [editor, onChangeValue]);

  useEffect(() => {
    if (editor?.getHTML() !== content) {
      editor?.commands.setContent(isString(content) ? content : "");
    }
  }, [value]);

  return (
    <div className={styles.editorWrapper} style={props.style}>
      {editor && <MenuBar editor={editor} />}
      <EditorContent className={styles.editorContent} editor={editor} />
    </div>
  );
};

RichTextEditor.manifest = manifest;

export default RichTextEditor;
