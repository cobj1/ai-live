import { courseApi } from "@/api/course";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCourseStore = defineStore("course", () => {
  const types = ref([]);
  const classify = ref([]);

  const loadTypes = async () => {
    types.value = (await courseApi.getAllCourseTypes()) as any;
  };
  const loadClassifys = async () => {
    classify.value = (await courseApi.getAllCourseCategory()) as any;
  };
  return {
    types,
    loadTypes,
    classify,
    loadClassifys,
  };
});
