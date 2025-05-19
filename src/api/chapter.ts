import axios from "@/axios/live-service";

export const ChapterApi = {
  list(courseid: string) {
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
};
