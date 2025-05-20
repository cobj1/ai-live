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
  getAllCourseTypesByClassfyId(params: {
    types?: string[];
    categories?: string[];
    state?: number | null;
    page?: number;
    size?: number;
    name?: string;
  }) {
    return axios({
      url: "/api/course/search_byinfo",
      method: "get",
      params: {
        type: params.types?.join(",") || "",
        classify: params.categories?.join(",") || "",
        name: params.name,
        pageNum: params.page,
        pageSize: params.size,
        state: 1,
      },
    });
  },
  //通过学生权限查所有课程
  getAllCourseTypesByClassfyStuId(params: {
    types?: string[];
    categories?: string[];
    state?: number | null;
    page?: number;
    size?: number;
    name?: string;
  }) {
    return axios({
      url: "/api/course/search_self",
      method: "get",
      params: {
        type: params.types?.join(",") || "",
        classify: params.categories?.join(",") || "",
        name: params.name,
        pageNum: params.page,
        pageSize: params.size,
        state: 1,
      },
    });
  },
  //通过课程码添加课程
  addCourseById(course_code: string) {
    return axios({
      url: `/api/course_user/add/${course_code}`,
      method: "get",
    });
  },
  info(courseid: string) {
    return axios({
      url: `/api/course/search/${courseid}`,
      method: "get",
    });
  },
  del(id: string) {
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
  detail(courseid: string) {
    return axios({
      url: `/api/course/detail/${courseid}`,
      method: "get",
    });
  },
  manage(params: {
    types?: string | null;
    categories?: string | null;
    state?: number | null;
    page?: number;
    size?: number;
    name?: string;
  }) {
    return axios({
      url: "/api/course/manage",
      method: "get",
      params: {
        type: params.types,
        classify: params.categories,
        name: params.name,
        pageNum: params.page,
        pageSize: params.size,
        state: params.state,
      },
    });
  },
};
