import React from "react";
import { Image, Popover } from "antd";
import styles from "./style.module.less";
import { IImage } from "../ImageLibTab";
import { IExtensionContext } from "@mtbird/shared/dist/types";

interface IProps {
  list: IImage[];
  context: IExtensionContext;
}

const ImageList = ({ list, context }: IProps) => {
  const handleClick = (cur: IImage) => {
    context.addComponent({
      type: "component",
      componentName: "Image",
      props: {
        src: cur.urls.raw,
        style: {
          x: 10,
          y: 10,
          position: "absolute",
          height: cur.height / 10,
          width: cur.width / 10,
        },
      },
      children: [],
    });
  };

  const generateContent = (cur: IImage) => (
    <>
      <Image
        src={cur.urls.raw}
        width={cur.width / 10}
        height={cur.height / 10}
        onClick={() => handleClick(cur)}
        preview={false}
      />
    </>
  );

  return (
    <div className={styles.imageListWrapper}>
      <div className={styles.imageListContainer}>
        {list.map((cur, i) => (
          <Popover
            key={cur.id}
            placement="topLeft"
            title={cur.description}
            content={generateContent(cur)}
          >
            <Image
              onClick={() => handleClick(cur)}
              width={60}
              className={styles.imageListImage}
              key={i}
              title={cur.description}
              src={cur.urls.thumb}
              preview={false}
            />
          </Popover>
        ))}
      </div>
    </div>
  );
};

export default ImageList;
