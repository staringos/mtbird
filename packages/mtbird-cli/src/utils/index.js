import spawn from "cross-spawn";
import fs from "fs-extra";
import path from "path";
import flattenDeep from "lodash/flattenDeep";
const FormData = require("form-data");

export const getAllFileStreamInFolder = (dir) => {
  const formData = new FormData();
  const folderPath = path.resolve(dir);

  const folderLoop = (filePath) => {
    const files = fs.readdirSync(filePath);
    return files.forEach((filename) => {
      const fileDir = path.join(filePath, filename);
      const stat = fs.statSync(fileDir);
      if (stat.isFile()) {
        const dirPath = fileDir.split("dist");
        const relativePath = dirPath[dirPath.length - 1];
        formData.append(relativePath, fs.createReadStream(fileDir));
        return;
      }
      if (stat.isDirectory()) return folderLoop(fileDir);
    });
  };

  folderLoop(folderPath);
  return formData;
};

export const uploadFolder = (dir, token, folder) => {
  const folderPath = path.resolve(dir);

  const folderLoop = (filePath) => {
    const files = fs.readdirSync(filePath);
    return files.map((filename) => {
      const fileDir = path.join(filePath, filename);
      const stat = fs.statSync(fileDir);
      if (stat.isFile()) return uploadFile(fileDir, token, folder);
      if (stat.isDirectory()) return folderLoop(fileDir);
    });
  };
  const result = folderLoop(folderPath);

  return Promise.all(flattenDeep(result)).catch((e) => {
    console.log("catched:", e);
    throw e;
  });
};

export const execute = (cwd = "", args = "", spawnOptions, on) => {
  !spawnOptions && (spawnOptions = { stdio: "inherit" });

  return new Promise((resolve, reject) => {
    if (!cwd) resolve();

    const child = spawn(cwd, [...args], spawnOptions);

    child.on("close", (code) => {
      if (code !== 0) {
        return reject({
          command: `${cwd} ${args.join(" ")}`,
        });
      }

      resolve();
    });

    Object.keys(on || {}).forEach((evt) => {
      if (evt === "data") {
        child.stdout.on(evt, on[evt]);
      } else {
        child.on(evt, on[evt]);
      }
    });
  });
};

export const printLogo = () => {
  console.log("=====================================");
  console.log("--------- ---------------- ---------");
  console.log("--------- StaringOS MtBird ---------");
  console.log("--- Lightweight Low-Code Platform ---");
  console.log("--------- ----- [CLI] ----- ---------");
  console.log("=====================================");
};
