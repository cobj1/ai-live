<!-- CourseCard.vue -->
<template>
  <v-card class="course-card">
    <!-- 课程封面照片 -->
    <v-img :src="course.thumbnail" height="100px" contain cover :aspect-ratio="16 / 9"></v-img>
    
    <!-- 人物图片和作者 -->
    <div class="card-content">
      <div class="header-section">
        <v-avatar color="grey-darken-3" :image="course.teacherIcon" class="mr-2"></v-avatar>
        <v-card-title class="my-auto">{{ course.name }}</v-card-title>
        <v-list-item color="black" :title="course.teacher"></v-list-item>
      </div>
      
      <div class="course-intro">
        <v-card-text>{{ course.introduce }}</v-card-text>
      </div>
      
      <v-card-actions class="action-section">
        <v-btn color="secondary" @click="$emit('view-details', course)">
          查看课程详情
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import type { Course } from '@/types/course';
import { defineProps, defineEmits } from 'vue'


const props = defineProps<{
  course: Course
}>()

const emit = defineEmits<{
  (e: 'view-details', course: Course): void
}>()
</script>

<style scoped>
.course-card {
  max-width: 200px;
  min-height: 250px;
  display: flex;
  flex-direction: column;
}

.card-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.header-section {
  display: flex;
  align-items: center;
  margin: 1px;
  flex-shrink: 0;
}

.action-section {
  justify-content: flex-end;
  margin: 0px;
  flex-shrink: 0;
}
</style>