import dotenv from "rollup-plugin-dotenv";
import extensions from "rollup-plugin-extensions";
import babelGenerate from "../builder/babel.config";
const babel = require("@rollup/plugin-babel").default;
const json = require("@rollup/plugin-json");
const commonjs = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve").default;
const { uglify } = require("rollup-plugin-uglify");
const path = require("path");
const importAssets = require("rollup-plugin-import-assets");

const NpmImport = require("less-plugin-npm-import");
const autoExternal = require("rollup-plugin-auto-external");
const postcss = require("rollup-plugin-postcss");
const global = require("rollup-plugin-node-globals");
const builtins = require("rollup-plugin-node-builtins");

const external = require("rollup-plugin-peer-deps-external");
const typescript = require("rollup-plugin-typescript2");
const replace = require("@rollup/plugin-replace");
const url = require("@rollup/plugin-url");
const svgr = require("@svgr/rollup");
const sourceMap = require("rollup-plugin-sourcemaps");

const { DEFAULT_EXTENSIONS } = require("@babel/core");

export const getPollupPlugins = (
  outDir,
  cwd,
  extractPlugins = [],
  outputCssName = "index.css"
) => {
  const rootDir = path.join(cwd, `src`);
  const tsconfigPath = path.join(cwd, "tsconfig.json");
  const plugins = [
    dotenv(),
    postcss({
      use: [
        [
          "less",
          {
            javascriptEnabled: true,
            plugins: [new NpmImport({ prefix: "~" })],
          },
        ],
      ],
      plugins: [],
      minimize: true,
      extract: path.join(outDir, outputCssName),
      extensions: [".css", ".less"],
      // ...postcssCfg,
    }),
    extensions({
      extensions: [".tsx", ".ts", ".jsx", ".js"],
      resolveIndex: true,
    }),
    importAssets({
      // files to import
      include: [
        /\.gif$/i,
        /\.jpg$/i,
        /\.jpeg$/i,
        /\.png$/i,
        /\.svg$/i,
        /\.woff2$/i,
        /\.ttf$/i,
        /\.woff$/i,
      ],
      // files to exclude
      exclude: [],
      // copy assets to output folder
      emitAssets: true,
      // name pattern for the asset copied
      fileNames: "assets/[name]-[hash].[ext]",
      // public path of the assets
      publicPath: "",
    }),
    commonjs({
      include: /node_modules/,
    }),
    json(),
    external({
      packageJsonPath: path.join(cwd, "package.json"),
    }),
    typescript({
      typescript: require("typescript"),
      clean: true,
      include: [rootDir],
      // 项目根目录只需要存在一个tsconfig
      tsconfig: tsconfigPath,
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          rootDir,
          declaration: true,
          declarationDir: "dist/types",
          resolveJsonModule: true,
        },
      },
      exclude: [
        "scripts/**",
        "dist/**",
        "node_modules/**",
        "*.d.ts",
        "*.test.{js+(|x), ts+(|x)}",
        "**/*.test.{js+(|x), ts+(|x)}",
      ],
    }),
    babel({
      ...babelGenerate(),
      extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
      babelHelpers: "runtime",
      skipPreflightCheck: true,
      babelrc: true,
      exclude: "node_modules/**",
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      preventAssignment: true,
    }),
    resolve({
      extensions: [".mjs", ".js", ".json"],
      skip: ["antd"],
    }),
    global(),
    url(),
    svgr(),
    // copy({
    //   targets: [
    //     { src: 'src/static/*', dest: 'dist', flatten: false }
    //   ]
    // }),
    ...extractPlugins,
  ];

  if (process.env.NODE_ENV !== "development") {
    plugins.push(uglify());
  } else {
    plugins.push(sourceMap());
  }

  return plugins;
};
