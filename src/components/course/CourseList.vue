<template>
    <div>
      <el-table :data="courses" style="width: 100%">
        <el-table-column prop="id" label="课程序号" />
        <el-table-column prop="category" label="课程分类" />
        <el-table-column prop="cover" label="课程封面">
          <template #default="scope">
            <img :src="scope.row.cover" alt="课程封面" style="width: 50px; height: 50px" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="课程名称" />
        <el-table-column prop="type" label="课程类型" />
        <el-table-column prop="code" label="课程代码" />
        <el-table-column prop="createTime" label="生成时间" />
        <el-table-column prop="status" label="课程状态" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="mini" @click="handleChapterManage(scope.row)">章节管理</el-button>
            <el-button size="mini" @click="handlePublish(scope.row)" v-if="scope.row.status === '未提交'">发布</el-button>
            <el-button size="mini" @click="handlePreview(scope.row)" v-if="scope.row.status === '审核通过'">预览</el-button>
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleDelete(scope.row)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  
  interface Course {
    id: number;
    category: string;
    cover: string;
    name: string;
    type: string;
    code: string;
    createTime: string;
    status: string;
  }
  
  export default defineComponent({
    name: 'CourseList',
    setup() {
      const courses = ref<Course[]>([]);
  
      const fetchCourses = async () => {
        try {
          const response = await axios.get('/api/courses'); // 假设后端接口地址
          courses.value = response.data;
        } catch (error) {
          console.error('获取课程列表失败', error);
        }
      };
  
      const handleChapterManage = (course: Course) => {
        console.log('进入章节管理', course);
      };
  
      const handlePublish = (course: Course) => {
        console.log('发布课程', course);
      };
  
      const handlePreview = (course: Course) => {
        console.log('预览课程', course);
      };
  
      const handleEdit = (course: Course) => {
        console.log('编辑课程', course);
      };
  
      const handleDelete = (course: Course) => {
        console.log('删除课程', course);
      };
  
      // 页面加载时获取课程列表
      fetchCourses();
  
      return {
        courses,
        handleChapterManage,
        handlePublish,
        handlePreview,
        handleEdit,
        handleDelete
      };
    }
  });
  </script>
  
  <style scoped>
  /* 可根据需求添加样式 */
  </style>