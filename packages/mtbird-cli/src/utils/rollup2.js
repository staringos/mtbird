export const getPollupPlugins = (outDir, cwd) => {
  const tsconfigPath = path.join(cwd, 'tsconfig.json')
  const plugins = [
    dotenv(),
    autoExternal({
      dependencies: false,
      packagePath: path.resolve(`${cwd}/package.json`),
      peerDependencies: true
    }),
    postcss({
      use: [
        [
          'less',
          {
            javascriptEnabled: true,
            plugins: [new NpmImport({ prefix: '~' })]
          }
        ]
      ],
      plugins: [],
      minimize: true,
      extract: path.join(outputDir, 'index.css'),
      extensions: ['.css', '.less']
      // ...postcssCfg,
    }),
    extensions({
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      resolveIndex: true
    }),
    importAssets({
      // files to import
      include: [/\.gif$/i, /\.jpg$/i, /\.jpeg$/i, /\.png$/i, /\.svg$/i, /\.woff2$/i, /\.ttf$/i, /\.woff$/i],
      // files to exclude
      exclude: [],
      // copy assets to output folder
      emitAssets: true,
      // name pattern for the asset copied
      fileNames: 'assets/[name]-[hash].[ext]',
      // public path of the assets
      publicPath: publicPath
    }),
    // commonjs插件的顺序很重要!
    commonjs({
      include: /node_modules/
    }),
    json(),
    external({
      packageJsonPath: path.join(cwd, 'package.json')
    }),
    typescript({
      typescript: require('typescript'),
      clean: true,
      include: [rootDir],
      // 项目根目录只需要存在一个tsconfig
      tsconfig: tsconfigPath,
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          rootDir,
          declaration: true,
          declarationDir: 'dist/types',
          resolveJsonModule: true
        }
      },
      exclude: ['scripts/**', 'dist/**', 'node_modules/**', '*.d.ts', '*.test.{js+(|x), ts+(|x)}', '**/*.test.{js+(|x), ts+(|x)}']
    }),
    // builtins(),
    babel({
      // ...pkg.babel,
      ...babelConfig(),
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
      babelHelpers: 'runtime',
      skipPreflightCheck: true,
      babelrc: true,
      exclude: 'node_modules/**'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      preventAssignment: true
    }),
    resolve({
      extensions: ['.mjs', '.js', '.json'],
      skip: ['antd']
    }),
    global(),
    builtins(),
    url(),
    svgr(),
    copy({
      targets: [
        {
          src: ['src/assets/iconfont/*'],
          dest: 'dist/iconfont'
        },
        {
          src: ['src/assets/images/*'],
          dest: 'dist/images'
        },
        {
          src: ['src/statics/*'],
          dest: 'dist/statics'
        },
        {
          src: ['manifest.json'],
          dest: 'dist'
        }
      ]
    })
  ]

  if (process.env.NODE_ENV !== 'development') {
    plugins.push(uglify())
  }
}