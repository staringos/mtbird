import React from "react";
import { IComponentProps } from "@mtbird/shared";
import { Carousel } from "antd";
import styles from "./style.module.less";
import manifest from "./manifest";

const CarouselComponent = ({ node, style }: IComponentProps) => {
  const handleChange = () => {};
  const { options } = node.data as any;
  const { width, height } = node.props.style;

  return (
    <Carousel {...node.props} style={style} afterChange={handleChange}>
      {options.map((cur: any, i: number) => {
        return (
          <div className={styles.carouselItem} key={i}>
            <img src={cur.imageUrl} style={{ width, height }} />
            <h3 className={styles.carouselTitle}>{cur.label}</h3>
          </div>
        );
      })}
    </Carousel>
  );
};

CarouselComponent.manifest = manifest;

export default CarouselComponent;
