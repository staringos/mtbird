import { getAllFileStreamInFolder } from "../utils";
import { REGISTRY } from "../utils/constants";
const axios = require("axios");

export const uploadFileToRegistry = (distPath, token, manifest) => {
  const formData = getAllFileStreamInFolder(distPath);

  return axios.post(
    `${REGISTRY.REGISTRY_SERVER_URL}/registry/extension/upload`,
    formData,
    {
      params: {
        name: manifest.name,
        version: manifest.version,
        desc: manifest.desc,
        title: manifest.title,
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
        ...formData.getHeaders(),
      },
      'maxContentLength': Infinity,
      'maxBodyLength': Infinity
    }
  );
};

export const publishExtension = (manifest, token) => {
  return axios.post(
    REGISTRY.REGISTRY_SERVER_URL + "/registry/extension",
    {
      name: manifest.name,
      desc: manifest.desc,
      version: manifest.version,
    },
    {
      headers: {
        Authorization: "Beare " + token,
      },
    },
  );
};

export const recallHistory = (name, version, token) => {
  return axios.delete(
    REGISTRY.REGISTRY_SERVER_URL + "/registry/extension/history",
    {
      name,
      version,
    },
    {
      headers: {
        Authorization: "Beare " + token,
      },
    },
  );
};
