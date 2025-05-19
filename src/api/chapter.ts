import axios from "@/axios/live-service";

export const ChapterApi = {
  list(courseid: string) {
    return axios({
      url: `/api/chapter/list/${courseid}`,
      method: "post",
    });
  },
  info(chapterid: string) {
    return axios({
      url: `/api/chapter/search/${chapterid}`,
    });
  },
};
