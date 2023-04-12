import type { IComponentManifest, IComponentInstance } from "@mtbird/shared";
import { COMPONENT } from "@mtbird/core";
import { SchemaGenerator } from "@mtbird/core";

const { COMPONENT_DEFAULT_STYLE, SCHEMA_COMPONENT_BASIC_STYLE } = COMPONENT;

const VIDEO_TYPE_OPTIONS = [
  {
    value: "upload",
    label: "上传",
  },
  {
    value: "input",
    label: "输入",
  },
];

const manifest: IComponentManifest<IComponentInstance> = {
  type: "component",
  componentName: "Video",
  title: "视频",
  icon: "mtbird-video",
  desc: "",
  category: "basic",
  schema: [
    ...SCHEMA_COMPONENT_BASIC_STYLE,
    SchemaGenerator.collapsePanel(
      "视频",
      [
        SchemaGenerator.radio("视频来源", "data.fileType", VIDEO_TYPE_OPTIONS),
        SchemaGenerator.upload("视频地址", "props.src", {
          "pattern.display":
            'function(node) { return node?.data?.fileType === "upload"; }',
        }),
        SchemaGenerator.upload("默认图片", "props.poster", {
          "pattern.display":
            'function(node) { return node?.data?.fileType === "upload"; }',
        }),
        SchemaGenerator.input("视频地址", "props.src", {
          "pattern.display":
            'function(node) { return node?.data?.fileType === "input"; }',
        }),
        SchemaGenerator.switch("控制栏", "props.controls"),
        SchemaGenerator.switch("循环播放", "props.loop"),
        SchemaGenerator.switch("自动播放", "props.autoPlay"),
      ],
      true
    ),
  ],
  instance: {
    type: "component",
    componentName: "Video",
    props: {
      src: "https://mtbird-cdn.staringos.com/DgerKLQeiu4ZaS3v.mp4",
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        height: 180,
        width: 150,
      },
    },
    data: {
      fileType: "upload",
    },
    children: [],
  },
};

export default manifest;
