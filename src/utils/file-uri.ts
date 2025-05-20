import { FileApi } from "@/api/file";

export const useFileUri = (url: string | null) => {
  return url?.includes("http") ? url : FileApi.filePath + url;
};
