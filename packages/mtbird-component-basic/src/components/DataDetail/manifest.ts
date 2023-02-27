import type {
  IComponentManifest,
  IComponentInstanceForm,
} from "@mtbird/shared";
import { COMPONENT, SchemaGenerator } from "@mtbird/core";
const {
  COMPONENT_DEFAULT_STYLE,
  SCHEMA_COMPONENT_BASIC_STYLE,
  SCHEMA_GRID_LAYOUT,
} = COMPONENT;

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: "component",
  componentName: "DataDetail",
  title: "数据详情",
  icon: "mtbird-metroselect_m_back",
  desc: "",
  category: "basic",
  subCategory: "data",
  schema: [...SCHEMA_COMPONENT_BASIC_STYLE, ...SCHEMA_GRID_LAYOUT],
  instance: {
    data: {
      type: "model",
      targetId: "clbkdi8rb009ds6aadqodj8qz",
      isDataContainer: true,
    },
    type: "component",
    props: {
      style: {
        top: 16,
        left: 10,
        right: -10,
        width: 355,
        bottom: -16,
        height: 359,
        display: "flex",
        flexFlow: "wrap",
        position: "absolute",
        overflowY: "auto",
      },
    },
    parent: "443454",
    pattern: {
      spacing: 10,
    },
    children: [
      {
        data: {
          fieldId: "headImage",
        },
        type: "component",
        props: {
          src: "${{$detailclbkdi8rb009ds6aadqodj8qzData.data.headImage}}",
          style: {
            top: 0,
            left: 0,
            right: 0,
            width: 355,
            bottom: 0,
            height: 168,
            position: "absolute",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
        },
        children: [],
        componentName: "Image",
      },
      {
        data: {
          fieldId: "productName",
        },
        type: "component",
        props: {
          style: {
            top: 178,
            left: 3,
            right: -3,
            width: 148,
            bottom: -178,
            height: 22,
            position: "absolute",
            textAlign: "left",
            fontWeight: 700,
          },
        },
        children:
          "<h1>${{$detailclbkdi8rb009ds6aadqodj8qzData.data.productName}}</h1>",
        componentName: "Text",
      },
      {
        data: {
          fieldId: "details",
        },
        type: "component",
        props: {
          style: {
            top: 207,
            left: 3,
            color: "rgba(111,111,111,1)",
            right: -3,
            width: 347,
            bottom: -207,
            height: 94,
            position: "absolute",
            textAlign: "left",
            fontWeight: 700,
          },
        },
        children: "${{$detailclbkdi8rb009ds6aadqodj8qzData.data.details}}",
        componentName: "Text",
      },
      {
        data: {
          fieldId: "price",
        },
        type: "component",
        props: {
          style: {
            top: 182,
            left: 184,
            color: "rgba(208,2,27,1)",
            right: -184,
            width: 162,
            bottom: -182,
            height: 22,
            position: "absolute",
            textAlign: "right",
            fontWeight: 700,
          },
        },
        children:
          "<p>¥ ${{$detailclbkdi8rb009ds6aadqodj8qzData.data.price}}</p>",
        componentName: "Text",
      },
    ],
    componentName: "DataDetail",
  },
};

export default manifest;
