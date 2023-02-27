const path = require("path");
const { existsSync } = require("fs");
const fsPromise = require("fs/promises");

const build = async ({
  cwd,
  entryDir = "packages",
  output = "dist",
  metadataDirName = "metadata",
}) => {
  const rootDir = path.join(cwd, entryDir);

  const packages = await fsPromise.readdir(rootDir);

  let manifestList = await Promise.all(
    packages.map(async (pkgName) => {
      const manifestPathJS = path.join(
        rootDir,
        pkgName,
        metadataDirName,
        "manifest.json"
      );
      const manifestPathJSON = path.join(
        rootDir,
        pkgName,
        metadataDirName,
        "manifest.json"
      );
      const pkgPath = path.join(rootDir, pkgName, "package.json");

      // eslint-disable-next-line import/no-dynamic-require
      const package = (existsSync(pkgPath) && require(pkgPath)) || {};
      let manifest = null;

      if (existsSync(manifestPathJS)) {
        // eslint-disable-next-line import/no-dynamic-require
        const mf = require(manifestPathJS);
        if (typeof mf === "function") {
          manifest = mf();
        } else {
          manifest = mf;
        }
      } else if (existsSync(manifestPathJSON)) {
        const manifestJSON = await fsPromise.readFile(manifestPathJSON, {
          encoding: "utf-8",
        });

        try {
          manifest = JSON.parse(manifestJSON);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(`${pkgName} manifest.json Read Error`, error);
        }
      }

      if (manifest) {
        manifest.$version = package.version;
      }

      return manifest;
    })
  );

  manifestList = manifestList.filter(Boolean);

  const manifestString = JSON.stringify(manifestList);
  await writeFile(manifestString, path.join(cwd, output));

  // eslint-disable-next-line no-console
  console.log("manifest.json build success!");
};

const writeFile = async (content, outputPath) => {
  if (!existsSync(outputPath)) {
    await fsPromise.mkdir(outputPath);
  }

  // eslint-disable-next-line no-console
  console.log(
    "Prepare generate manifest.json",
    path.join(outputPath, "manifest.json")
  );
  await fsPromise.writeFile(path.join(outputPath, "manifest.json"), content, {
    encoding: "utf-8",
  });
};

module.exports = build;
