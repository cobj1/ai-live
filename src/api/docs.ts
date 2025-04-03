import axios from "@/axios/live-service";

export const DocsApi = {
  list() {
    return axios({
      url: "/api/docs/list",
      method: "get",
    });
  },
};
