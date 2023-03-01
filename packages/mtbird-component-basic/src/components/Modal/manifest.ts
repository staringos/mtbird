import type { IComponentManifest, IComponentInstance } from "@mtbird/shared";
import { SchemaGenerator, COMPONENT } from "@mtbird/core";
const { COMPONENT_DEFAULT_STYLE, SCHEMA_COMPONENT_BASIC_STYLE, SCHEMA_LAYOUT } =
  COMPONENT;

const manifest: IComponentManifest<IComponentInstance> = {
  type: "container",
  componentName: "Modal",
  title: "弹窗",
  icon: "mtbird-border-outer",
  desc: "",
  category: "basic",
  schema: [...SCHEMA_COMPONENT_BASIC_STYLE, ...SCHEMA_LAYOUT],
  instance: {
    type: "container",
    componentName: "Modal",
    layout: "absolute",
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    data: {
      alias: "弹窗",
    },
    pattern: {
      display: "function() { return ${{$modals.[id]}}; }",
    },
    children: [
      SchemaGenerator.container(
        [
          SchemaGenerator.icon(
            {
              right: 20,
              top: 20,
            },
            null,
            {
              events: {
                click: {
                  type: "change-variable",
                  keyPath: "$modals.[id]",
                  value: false,
                },
              },
            }
          ),
        ],
        {},
        {
          borderRadius: "10px",
          // position: 'fixed',
          // top: '50%',
          // left: '50%',
          width: 300,
          height: 500,
          backgroundColor: "white",
        }
      ),
    ],
  },
};

export default manifest;
