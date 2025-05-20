import axios from "@/axios/live-service";

export const ChapterApi = {
  list(courseid: any) {
    return axios({
      url: `/api/chapter/list/${courseid}`,
      method: "get",
    });
  },
  info(chapterid: string) {
    return axios({
      url: `/api/chapter/search/${chapterid}`,
    });
  },
  save(data: object) {
    return axios({
      url: "/api/chapter/save",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  },
};
