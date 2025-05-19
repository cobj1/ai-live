<template v-slot:top>

  <!-- 使用筛选组件 -->
    <FilterSection
      :types="coursesTypes"
      :categories="coursesCategory"
      :search="search"
      :selected-types="selectedCoursesTypes"
      :selected-category="selectedCoursesCategory"
      @update:types="selectedCoursesTypes = $event"
      @update:category="selectedCoursesCategory = $event"
      @update:search="search = $event"
    />

    <v-container fluid>
      <v-row>
        <v-col 
          v-for="(course, index) in getInfoByCourse.value" 
          :key="index" 
          cols="12" 
          sm="6" 
          md="4" 
          lg="3"
        >
          <CourseCard :course="course" @view-details="viewCourseDetails" />
        </v-col>
      </v-row>
    </v-container>

    <v-footer>
      <v-pagination v-model="page" :length="15" :total-visible="7"></v-pagination>
    </v-footer>

</template>

<script lang="ts" setup>

import router from '@/router'
import { courseService, type Course, type CourseCategory, type CourseType } from '@/types/course'
import { ref, computed, onMounted, nextTick } from 'vue'
import CourseCard from '@/components/course/CourseCard.vue'
import FilterSection from '@/components/course/FilterSection.vue'

const selectedCoursesTypes = ref<string[]>([]);//课程类型
const selectedCoursesCategory = ref<string[]>([]);//课程分类
const search = ref<string>('');

const page = ref(1)
// 课程类型
const coursesTypes = ref<CourseType[]>([]);
// 课程分类
const coursesCategory = ref<CourseCategory[]>([]);
// 所有课程
const coursesInfos = ref<Course[]>([]);



const filterCoursesInfoByCourse = (cc: Course[], selectedCourse: string[], search: string): Course[] => {
  let filtered = cc;
  // 根据专业过滤
  if (selectedCourse.length > 0) {
    filtered = filtered.filter((c) => selectedCourse.includes(c.name));
  }
  // 根据搜索关键词过滤
  if (search) {
    filtered = filtered.filter((c) => {
      const courseName = c.name || ""; // 关键修复：处理 null/undefined
      return courseName.toLowerCase().includes(search.toLowerCase());
    });
  }

  return filtered;
};

const getInfoByCourse = computed(() => {
  return {
    value: filterCoursesInfoByCourse(coursesInfos.value, selectedCoursesTypes.value, search.value),
  };
});


onMounted(async () => {
  await fetchAllCoursesType();
  await fetchAllCoursesCategory();
  await fetchAllCourses();
  await nextTick(); // 等待DOM更新
});

//获取类型
async function fetchAllCoursesType() {
  try {

    const [cc] = await Promise.all([
      courseService.fetchAllCourseTypes(),
    ]);
    console.log("课程类型:", cc); // 检查是否有 name 为 null 的条目
    coursesTypes.value = cc;

  } catch (error) {
    console.error("获取课程类型失败:", error);
    // 处理错误（如提示用户）
    throw error; // 可选择继续抛出错误
  }
}

//获取类型
async function fetchAllCoursesCategory() {
  try {

    const [cc] = await Promise.all([
      courseService.fetchAllCourseCategory(),
    ]);
    console.log("课程分类:", cc); // 检查是否有 name 为 null 的条目
    coursesCategory.value = cc;

  } catch (error) {
    console.error("获取课程类型失败:", error);
    // 处理错误（如提示用户）
    throw error; // 可选择继续抛出错误
  }
}

//获取所有课程
async function fetchAllCourses() {
  try {

    const [cc] = await Promise.all([
      courseService.fetchAllCourse(),
    ]);
    //  console.log("原始课程数据:", cc); // 检查是否有 name 为 null 的条目
    coursesInfos.value = cc;

  } catch (error) {
    console.error("获取课程失败:", error);
    // 处理错误（如提示用户）
    throw error; // 可选择继续抛出错误
  }
}

// 查看课程详情的方法，同样只是模拟
const viewCourseDetails = (course: Course) => {
  if (course) {
    router.push(
      {
        path: '/course/detail',
        query: { courseId: course.id } // 动态参数});
      });
  }
};

</script>

<style scoped>

.v-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-main {
  padding-bottom: 72px;
  /* 需要等于分页器高度+padding */
}
</style>