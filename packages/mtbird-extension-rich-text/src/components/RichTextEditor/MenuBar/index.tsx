import styles from "./style.module.less";
import React, { Fragment } from "react";
import MenuItem from "../MenuItem";

interface IProps {
  editor: any;
}

export default ({ editor }: IProps) => {
  const items = [
    {
      icon: "mtbird-icon mtbird-bold",
      title: "加粗",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
    },
    {
      icon: "mtbird-icon mtbird-italic",
      title: "倾斜",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
    },
    {
      icon: "mtbird-icon mtbird-strikethrough",
      title: "中划线",
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("strike"),
    },
    {
      icon: "mtbird-icon mtbird-code",
      title: "强调",
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive("code"),
    },
    {
      icon: "mtbird-icon mtbird-highlight",
      title: "高亮",
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive("highlight"),
    },
    {
      type: "divider",
    },
    {
      icon: "mtbird-icon mtbird-H-",
      title: "标题 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      icon: "mtbird-icon mtbird-H-1",
      title: "标题 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      icon: "mtbird-icon mtbird-unorderedlist",
      title: "强调列表",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      icon: "mtbird-icon mtbird-orderedlist",
      title: "顺序列表",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      icon: "mtbird-icon mtbird-codelibrary",
      title: "代码块",
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
    },
    {
      type: "divider",
    },
    {
      icon: "mtbird-icon mtbird-quote-left",
      title: "引用块",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      icon: "mtbird-icon mtbird-line",
      title: "水平线",
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      type: "divider",
    },
    {
      icon: "mtbird-icon mtbird-align-left",
      title: "居左",
      action: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: () => editor.isActive({ textAlign: "left" }),
    },
    {
      icon: "mtbird-icon mtbird-align-center",
      title: "居中",
      action: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: () => editor.isActive({ textAlign: "center" }),
    },
    {
      icon: "mtbird-icon mtbird-align-right",
      title: "居右",
      action: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: () => editor.isActive({ textAlign: "right" }),
    },
    {
      type: "divider",
    },
    {
      icon: "mtbird-icon mtbird-clear",
      title: "Clear Format",
      action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    },
    {
      type: "divider",
    },
    {
      icon: "mtbird-icon mtbird-arrowleft",
      title: "Undo",
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: "mtbird-icon mtbird-arrowright",
      title: "Redo",
      action: () => editor.chain().focus().redo().run(),
    },
  ];

  return (
    <div className={styles.editorHeader}>
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.type === "divider" ? (
            <div className={styles.divider} />
          ) : (
            <MenuItem {...item} />
          )}
        </Fragment>
      ))}
      <input
        title="修改颜色"
        type="color"
        onInput={(event) =>
          editor.chain().focus().setColor(event.target.value).run()
        }
        value={editor.getAttributes("textStyle").color}
      />
    </div>
  );
};
