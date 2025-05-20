<template>

  <v-dialog v-model="dialogVisible" max-width="700" height="700" scrollable>
    <!-- 原有课程详情内容保持不变 -->
    <v-card v-if="course">
      <v-img :src="course.thumbnail" height="200px" cover></v-img>

      <v-card-title class="d-flex justify-center">
        {{ course.name }}
      </v-card-title>

      <v-card-title class="d-flex justify-center">
        {{ "课程码" + ":" + course.courseCode }}
      </v-card-title>

      <v-card-item>
        <v-list-item>
          <template v-slot:prepend>
            <v-avatar color="grey-darken-3" :image="course.teacherIcon"></v-avatar>

          </template>

          <v-list-item-subtitle>{{ course.teacher }}</v-list-item-subtitle>
        </v-list-item>
      </v-card-item>

      <v-card-text>

        <div class="mt-4">课程简介：{{ course.introduce }}</div>
        <div class="mt-2" v-if="course.introduce">
          详细内容：{{ course.introduce }}
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="addCourse(course.courseCode)">加入课程</v-btn>
        <v-btn color="primary" @click="dialogVisible = false">关闭</v-btn>
      </v-card-actions>
    </v-card>

    <!-- 新增成功提示对话框 -->
    <v-dialog v-model="successDialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="success lighten-1 white--text">
          <v-icon left>mdi-check-circle</v-icon>
          操作成功
        </v-card-title>
        <v-card-text class="pa-4">
          <div class="text-h6">{{ showMessage }}</div>
          <div class="text-body-1 mt-2">可以去我的课程进行学习</div>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="primary" to="/manage/course/student">
            我的课程
          </v-btn>
          <v-btn variant="outlined" @click="successDialog = false">
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-dialog>
</template>

<script setup lang="ts">
import { type Course, courseService } from '@/types/course';
import { computed, nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const showMessage = ref("")
const props = defineProps<{
  course: Course | null,
  modelValue: boolean
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'course-added'): void  // 新增事件
}>();

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const successDialog = ref(false); // 控制成功弹窗
//课程码添加课程
async function addCourse(courseCode: string) {
  try {
    const result = await courseService.fetchAddCourseById(courseCode) as any;
    console.log("课程:", result);
    if (result) {

      showMessage.value = result.message;
    }


  } catch (error) {
    console.log('添加失败:');
  }
  successDialog.value = true; // 显示成功弹窗
  emit('course-added');  // 添加成功后触发事件
}

</script>