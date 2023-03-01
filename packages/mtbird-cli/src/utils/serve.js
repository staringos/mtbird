const servor = require("servor");
const getPort = require("get-port");

const fs = require("fs-extra");

export async function startServe(directory, port) {
  const realPort = await getPort({
    port: port || getPort.makeRange(3100, 3200),
  });

  fs.ensureDirSync(directory);

  const instance = await servor({
    root: directory,
    fallback: "index.html",
    port: realPort,
  });

  return instance;
}
