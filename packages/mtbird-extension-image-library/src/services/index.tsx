import { IImageListSearch } from "src/types";
import { IRequest } from "@mtbird/shared";

const baseUrl = process.env.API_URL;

export const getImageList = (request: IRequest, search: IImageListSearch) => {
  return request.get(baseUrl + "/imagelib", {
    params: search,
  });
};

export const getImageTags = (request: IRequest) => {
  return request.get(baseUrl + "/imagelib/tags");
};
