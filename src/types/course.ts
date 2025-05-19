import { courseApi } from "@/api/course"

export interface CourseDetail {
    id: string
    courseName: string
    courseIntroduction: string
    teacher: string
    major: string
    credit: number
    courseIcon: string
    syllabus: string

}


export interface CourseType {
    id: number;
    name: string;
    deleted: string;
}
export interface CourseCategory {
    id: number;
    name: string;
    parentId: number;

 
  
}

export interface Course {
    id: number;
    uid: string;
    name: string;
    introduce: string;
    thumbnail: string;
    classifyId: string;
    type: string;
    isPublished: number;
    state: number;
    createTime: Date;
courseCode:string;
    teacher: string;
    author: string;
    major: string;
    teacherIcon: string;
};

export interface PaginatedResponse<T> {
  records: T[];
  total: number;
  size: number;
  current: number;
  pages: number;
}
// 定义响应数据结构
interface CourseAddResponse {
  success: boolean;
  message: string;
  result: {
    course_id: string;
    add_time: string;
  };
}

// 数据转换工具函数
const transformers = {
  // 课程类型转换
  transformCourseType(items: any[]): CourseType[] {
    return items.map(item => ({
      id: item.id ?? "",
      name: item.name ?? "",
      deleted: item.deleted ?? ""
    }));
  },

  // 课程分类转换
  transformCourseCategory(items: any[]): CourseCategory[] {
    return items.map(item => ({
      id: item.id ?? "",
      name: item.name ?? "",
      parentId: item.parentId ?? ""
    }));
  },

  // 课程转换--旧
  transformCourse(items: any[]): Course[] {
    return items.map(item => ({
      id: item.id ?? "",
      uid: item.uid ?? "",
      name: item.name ?? "",
      introduce: item.introduce ?? "",
      thumbnail: item.thumbnail ?? "",
      classifyId: item.classifyId ?? "",
      type: item.type ?? "",
      isPublished: item.isPublished ?? "",
      state: item.state ?? "",
      createTime: item.createTime ?? "",
courseCode:item.courseCode??"",
      teacher: item.teacher ?? "",
      author: item.author ?? "",
      major: item.major ?? "",
      teacherIcon: item.teacherIcon ?? "",
    }));
  },

};

export const courseTransformers = {
  // 课程转换方法
  transformCourse: (item: any): Course => ({
    id: item.id ?? "",
    uid: item.uid ?? "",
    name: item.name ?? "",
    introduce: item.introduce ?? "",
    thumbnail: item.thumbnail ?? "",
    classifyId: item.classifyId ?? "",
    type: item.type ?? "",
    isPublished: item.isPublished ?? "",
    state: item.state ?? "",
    createTime: item.createTime ?? "",
courseCode:item.courseCode??"",
    teacher: item.teacher ?? "",
    author: item.author ?? "",
    major: item.major ?? "",
    teacherIcon: item.teacherIcon ?? "",
  }),

  // 修改后的分页转换方法
  transformPaginated: (data: any): PaginatedResponse<Course> => {
    // 添加防御性校验
    if (!data || !Array.isArray(data.records)) {
      console.warn('Invalid paginated data structure:', data);
      return {
        records: [],
        total: 0,
        size: 0,
        current: 1,
        pages: 0
      };
    }

    return {
      ...data,
      records: data.records.map(courseTransformers.transformCourse)
    };
  },

};

class ApiService {
  //类型分类
  async fetchAllCourseTypes(): Promise<CourseType[]> {
    try {
      const response = await courseApi.getAllCourseTypes();

      // console.log("课程类型", response);

      return this.handleResponse(response, transformers.transformCourseType);

    } catch (error) {
      console.error('获取实验数据失败:', error);
      throw error;
    }
  }
  //学科分类
  async fetchAllCourseCategory(): Promise<CourseCategory[]> {
    try {
      const response = await courseApi.getAllCourseCategory();

      // console.log("课程分类", response);

      return this.handleResponse(response, transformers.transformCourseCategory);

    } catch (error) {
      console.error('获取实验数据失败:', error);
      throw error;
    }
  }
  //获取所有课程
  async fetchAllCourse(): Promise<Course[]> {
    try {
      const response = await courseApi.getAllCourse();


      // console.log("实验数据",response);
      return this.handleResponse(response, transformers.transformCourse);

    } catch (error) {
      console.error('获取实验数据失败:', error);
      throw error;
    }
  }

  // //获取课程
  // async fetchAllCourseById(classify: string,type:string): Promise<Course[]> {
  //   try {
  //     const response = await labApi.getAllCourseTypesByClassfyId(classify,type);
  //     // console.log("实验数据",response);
  //     return this.handleResponse(response, transformers.transformCourse);

  //   } catch (error) {
  //     console.error('获取实验数据失败:', error);
  //     throw error;
  //   }
  // }


  // 新增组合过滤方法
  async getFilteredCourses(params: {

    types?: string[]
    categories?: string[]
    page?: number;
    size?: number;
    name?: string
   

  }): Promise<PaginatedResponse<Course>> {
    try {
      const response = await courseApi.getAllCourseTypesByClassfyId(params);
      // 添加响应数据校验
      if (!response) {
        console.warn('Empty API response:', response);
        return {
          records: [],
          total: 0,
          size: 0,
          current: 1,
          pages: 0
        };
      }

      return courseTransformers.transformPaginated(response);
    } catch (error) {
      console.error('获取过滤课程失败:', error);
      return {
        records: [],
        total: 0,
        size: 0,
        current: 1,
        pages: 0
      };
    }
  }

   // 通过学生新增组合过滤方法
  async getFilteredCoursesByUser(params: {

    types?: string[]
    categories?: string[]
    page?: number;
    size?: number;
    name?: string;
   

  }): Promise<PaginatedResponse<Course>> {
    try {
      const response = await courseApi.getAllCourseTypesByClassfyStuId(params);
      // 添加响应数据校验
      if (!response) {
        console.warn('Empty API response:', response);
        return {
          records: [],
          total: 0,
          size: 0,
          current: 1,
          pages: 0
        };
      }

      return courseTransformers.transformPaginated(response);
    } catch (error) {
      console.error('获取过滤课程失败:', error);
      return {
        records: [],
        total: 0,
        size: 0,
        current: 1,
        pages: 0
      };
    }
  }

    // 通过课程码添加课程（增强版）
async fetchAddCourseById(course_code: string){
  try {
    // 1. 参数校验
    if (!course_code || typeof course_code !== 'string') {
      throw new Error('课程码格式无效');
    }

    // 2. 调用API
    const response = await courseApi.addCourseById(course_code);
    return response;
  
  } catch (error) {
    console.error('[课程添加失败]', error);
    
  
  }
}


//   // 通过课程码添加课程（增强版）
// async fetchAddCourseById(course_code: string): Promise<CourseAddResponse> {
//   try {
//     // 1. 参数校验
//     if (!course_code || typeof course_code !== 'string') {
//       throw new Error('课程码格式无效');
//     }

//     // 2. 调用API
//     const response = await courseApi.addCourseById(course_code);
    
//     // 3. 统一处理响应
//     return this.handleResponse_per<CourseAddResponse>(response, (data) => {
//       if (!data.success) {
//         throw new Error(data.message || '添加课程失败');
//       }
//       return data.result;
//     });

//   } catch (error) {
//     console.error('[课程添加失败]', error);
    
//     // 结构化错误返回
//     throw {
//       success: false,
//       error: error instanceof Error ? error.message : '未知错误'
//     };
//   }
// }

  // 统一响应处理
  private handleResponse<T>(
    response: any,
    transformer: (items: any[]) => T[]
  ): Promise<T[]> {
    const data = response.data ?? response;
    return Promise.resolve(transformer(data));
  }
 // 统一响应处理没有数组
  private handleResponse_per<T>(
  response: any,
  transformer: (item: any) => T
): Promise<T> {
  const data = response.data ?? response;
  
  if (!data.success) {
    throw new Error(data.message || '请求失败');
  }
  
  return Promise.resolve(transformer(data));
}
}


export const courseService = new ApiService();