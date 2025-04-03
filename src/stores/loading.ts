import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore("loading", () => {
  const loading = ref(false);
  const show = ref(false);

  const initial = { opacity: 0, y: 40, filter: "blur(10px)" };
  const whileInWiew = { opacity: 1, y: 0, filter: "blur(0px)" };
  const exit = { opacity: 0, y: 40, filter: "blur(10px)" };
  const transition = { delay: 0.3, duration: 0.8, ease: "easeInOut" };

  const handleAnimationComplete = () => {
    loading.value = false;
  };

  const loadCompleted = () => {
    show.value = false;
  };

  const loadStart = () => {
    loading.value = true;
    show.value = true;
  };

  return {
    loading,
    show,
    initial,
    whileInWiew,
    exit,
    transition,
    handleAnimationComplete,
    loadStart,
    loadCompleted,
  };
});
