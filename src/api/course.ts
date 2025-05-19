import axios from "@/axios/live-service";

//字段要与后台一致
export const courseApi = {
  //获取所有课程
  getAllCourse() {
    return axios({
      url: "/api/course/allist",
      method: "get",
    });
  },
  //获取课程类型
  getAllCourseTypes() {
    return axios({
      url: "/api/course_type/alltype",
      method: "get",
    });
  },

  //获取课程分类
  getAllCourseCategory() {
    return axios({
      url: "/api/course_classify/alllist",
      method: "get",
    });
  },

  //获取课程分类，类型
  getAllCourseTypesByClassfyId(params : {
    types ?: string[];
    categories ?: string[];
    page ?: number;
    size ?: number;
    name ?: string;
  }) {
    return axios({
      url: "/api/course/search_byinfo",
      method: "get",
      params: {
        type: params.types,
        classify: params.categories,
        name: params.name,
        pageNum: params.page,
        pageSize: params.size,
      },
    });
  },
  info(courseid : string) {
    return axios({
      url: `/api/course/search/${courseid}`,
      method: "get",
    });
  },
  del(id : string) {
    return axios({
      url: "/api/course/del/" + id,
      method: "post",
    });
  },
  save(data: object) {
    return axios({
      url: "/api/course/save",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  },
};
