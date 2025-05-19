<template>
  <v-container>
    <div >
      <!-- 筛选组件 -->
      <FilterSection :types="coursesTypes" :categories="coursesCategory" :search="search"
        :selected-types="selectedCoursesTypes || []" :selected-category="selectedCoursesCategory || []"
        @update:types="updateSelectedTypes" @update:category="updateSelectedCategory" @update:search="updateSearch" />
      <v-row>
        <v-col cols="10">
        </v-col>
        <v-col cols="2">
          <div class="right-filter-container">
            <div class="d-flex align-center gap-3 w-64 justify-end">
              <v-col cols="11">
                <v-text-field v-model="inputCourse_code" label="输入课程码" variant="outlined" hide-details single-line
                  class="me-1" />
              </v-col>
              <v-col cols="1">
                <v-btn color="primary" @click="addCourse" class="align-self-center">
                  添加 </v-btn>
              </v-col>
            </div>
          </div>

        </v-col>
      </v-row>


      <!-- 课程列表 -->
      <v-container fluid class="mt-4">
        <v-row>
          <template v-for="(course, index) in displayedCourses" :key="course.id || index">
            <v-col :cols="12" :sm="6" :md="4" :lg="3">
              <CourseCard :course="course" @view-details="viewCourseDetails" />
            </v-col>
          </template>
        </v-row>
      </v-container>
      <!-- 分页 -->
      <v-footer>
        <v-pagination v-model="currentPage" :length="totalPages" :total-visible="100" @update="handlePageChange"
          @page-count="totalPages = $event" color="primary" class="mt-4" />
      </v-footer>

      <!-- <div v-if="loading" >
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div> -->
    </div>
  </v-container>
</template>

<script setup lang="ts">

import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import FilterSection from '@/components/course/FilterSection.vue'
import CourseCard from '@/components/course/CourseCard.vue'
import {
  courseService,
  type Course,
  type CourseCategory,
  type CourseType,
  type PaginatedResponse
} from '@/types/course'
import router from '@/router'

// 状态管理
const selectedCoursesTypes = ref<string[]>([])
const selectedCoursesCategory = ref<string[]>([])
const search = ref<string>('')
const currentPage = ref(1)
const pageSize = 8
const loading = ref(false)
const isSubmitting = ref(false);
const inputCourse_code = ref<string>('')


// 数据源
const coursesTypes = ref<CourseType[]>([])
const coursesCategory = ref<CourseCategory[]>([])
const coursesInfos = ref<PaginatedResponse<Course>>({
  records: [],
  total: 0,
  size: pageSize,
  current: 1,
  pages: 0
})



const fetchCourses = async () => {
  try {
    if (currentPage.value < 1) currentPage.value = 1 // 保证页码最小为1
    loading.value = true
    const params = buildQueryParams()
    const response = await courseService.getFilteredCoursesByUser(params)
    coursesInfos.value = response
  } catch (error) {
    console.error('获取课程失败:', error)
    // 这里可以添加错误提示
  } finally {
    loading.value = false
  }
}

// 计算属性
const displayedCourses = computed(() =>
  coursesInfos.value.records?.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize) || []
)

// 新增分页处理方法
const handlePageChange = (newPage: number) => {
  currentPage.value = newPage
  console.log("页码", currentPage.value)
  fetchCourses()
}

// 修改分页总数计算逻辑
const totalPages = computed(() =>
  Math.max(1, coursesInfos.value.pages || 0) // 确保至少显示1页
)



// 方法封装
const updateSelectedTypes = (types: string[]) => {
  selectedCoursesTypes.value = types
  currentPage.value = 1 // 重置分页
  fetchCourses()
}

const updateSelectedCategory = (categories: string[]) => {
  selectedCoursesCategory.value = categories
  currentPage.value = 1 // 重置分页
  fetchCourses()
}

const updateSearch = (keyword: string) => {
  search.value = keyword
  currentPage.value = 1 // 重置分页
  fetchCourses()
}

const buildQueryParams = () => ({
  types: selectedCoursesTypes.value,
  categories: selectedCoursesCategory.value,
  page: currentPage.value,
  size: pageSize,
  name: search.value
})
// API 封装
const fetchCourseTypes = async () => {
  try {
    const response = await courseService.fetchAllCourseTypes()
    coursesTypes.value = response

  } catch (error) {
    console.error('获取课程类型失败:', error)
  }
}

const fetchCourseCategories = async () => {
  try {
    const response = await courseService.fetchAllCourseCategory()
    coursesCategory.value = response

  } catch (error) {
    console.error('获取课程分类失败:', error)
  }
}
//课程码添加课程
async function addCourse() {
  try {
    const result = await courseService.fetchAddCourseById(inputCourse_code.value);

  } catch (error) {
    console.log('添加失败:');
  }
  fetchCourses()
}
// 生命周期
onMounted(async () => {
  await Promise.all([
    fetchCourseTypes(),
    fetchCourseCategories(),
    fetchCourses(),

  ])

})

// 新增防抖函数和变量
let debounceTimeout: number;
watch(
  () => ({
    types: selectedCoursesTypes.value,
    categories: selectedCoursesCategory.value,
    keyword: search.value
  }),
  (newVal, oldVal) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = window.setTimeout(() => {
      const typesEqual = arraysEqual(
        newVal.types || [],
        (oldVal?.types || [])
      );
      const categoriesEqual = arraysEqual(
        newVal.types || [],
        (oldVal?.types || [])
      );
      const searchEqual = newVal.keyword === oldVal.keyword;

      if (!typesEqual || !categoriesEqual || !searchEqual) {
        currentPage.value = 1;
        fetchCourses();
      }
    }, 500); // 防抖时间500ms
  },
  { deep: true }
);

// 在组件卸载时清除定时器
onUnmounted(() => {
  clearTimeout(debounceTimeout);
});

// 添加辅助函数
const arraysEqual = (a: string[], b: string[]) => {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  return a.every((val, index) => val === b[index]);
};


const viewCourseDetails = (course: Course) => {
  router.push(`/${course.id}`)
}
</script>

<style scoped>
/* 新增右侧容器样式 */
.right-filter-container {
  margin-top: 0px;
  /* 上移调整 */

}

/* 右侧对齐容器 */
.justify-end {
  margin-left: auto;
  /* 关键：将容器推到右侧 */
}

/* 操作区域固定宽度 */
.w-64 {
  width: 200px;
}

/* 输入框禁止换行 */
.flex-grow-0 {
  flex-grow: 0 !important;
}

.v-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  /* 新增 */
  right: 0;
  /* 新增 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  /* 添加左右内边距防止溢出 */
  box-sizing: border-box;
}
</style>