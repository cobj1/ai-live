import axios from "@/axios/live-service";

export const PPTApi = {
  list(chapterid: string) {
    return axios({
      url: `/api/ppt_page/list/${chapterid}`,
      method: "post",
    });
  },
};
