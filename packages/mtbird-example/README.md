# MtBird Example

MtBird example for editor and web renderer

## Getting Started

run in local

```shell
yarn
yarn run start
```

## Dev mtbird Lib

cd mtbird root dir

```shell
lerna link
```

```
cd packages/mtbird-example
yarn run link
yarn run start
```

link script will help you link all mtbird library

and you can going to library you want to modify, like @mtbird/editor

```
cd packages/mtbird-editor
yarn start
```

change code, and example page will refresh for latest change.
