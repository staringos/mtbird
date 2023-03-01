import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Guides from "@scena/react-guides";
import styles from "./style.module.less";

export interface IGuildLineRef {
  getHori: () => Guides | null;
  getVert: () => Guides | null;
}

export interface IProps {
  containerRef: any;
  infiniteViewerRef: any;
  horizontalSnapGuides: number[];
  verticalSnapGuides: number[];
  onGuidesChange: (
    direction: "horizontal" | "vertical",
    guides: number[]
  ) => void;
  zoom: number;
}

const GuildLine = (
  {
    containerRef,
    zoom,
    infiniteViewerRef,
    horizontalSnapGuides,
    verticalSnapGuides,
    onGuidesChange,
  }: IProps,
  ref: Ref<IGuildLineRef>
) => {
  const guideHoriRef = useRef<Guides>(null);
  const guideVertRef = useRef<Guides>(null);

  let unit = 50;

  if (zoom < 0.8) {
    unit = Math.floor(1 / zoom) * 50;
  }

  useEffect(() => {
    let scrollX = 0;
    let scrollY = 0;

    if (!containerRef) return;
  }, [containerRef]);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (infiniteViewerRef && infiniteViewerRef.current) {
        guideHoriRef.current!.resize();
        guideVertRef.current!.resize();
        infiniteViewerRef.current!.scrollCenter();
      }
    });
  }, []);

  useImperativeHandle(ref, () => ({
    getHori: () => guideHoriRef.current,
    getVert: () => guideVertRef.current,
  }));

  const handleClick = () => {
    if (infiniteViewerRef && infiniteViewerRef.current) {
      infiniteViewerRef.current!.scrollCenter();
    }
  };

  return (
    <>
      <Guides
        type="horizontal"
        className={styles.ruler + " " + styles.horizontal}
        snapThreshold={5}
        snaps={horizontalSnapGuides}
        displayDragPos={true}
        dragPosFormat={(v) => `${v}px`}
        zoom={zoom}
        unit={unit}
        ref={guideHoriRef}
        style={{ zIndex: 888 }}
        backgroundColor="#272e3b"
        textColor="#c9cdd4"
        onChangeGuides={({ guides }) => {
          onGuidesChange("horizontal", guides);
        }}
      />
      <Guides
        ref={guideVertRef}
        type="vertical"
        className={styles.ruler + " " + styles.vertical}
        snapThreshold={5}
        snaps={verticalSnapGuides}
        displayDragPos={true}
        zoom={zoom}
        backgroundColor="#272e3b"
        textColor="#c9cdd4"
        unit={unit}
        onChangeGuides={({ guides }) => {
          onGuidesChange("vertical", guides);
        }}
      />
      <div
        className={styles.centerButton}
        title="回到中心"
        onClick={handleClick}
      >
        <i className="mtbird-icon mtbird-border-outer" />
      </div>
    </>
  );
};

export default forwardRef(GuildLine);
