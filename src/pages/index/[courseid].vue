<template>
  <v-app-bar :elevation="2">
    <template v-slot:prepend>
      <v-btn icon="mdi-arrow-left" class="ml-2" @click="router.back()"></v-btn>
    </template>

    <v-app-bar-title>{{ course.name }}</v-app-bar-title>
  </v-app-bar>

  <AuroraBackground v-if="course && items.length > 0">
    <Motion as="div" :initial="{ opacity: 0, y: 40, filter: 'blur(10px)' }" :while-in-view="{
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
    }" :transition="{
      delay: 0.3,
      duration: 0.8,
      ease: 'easeInOut',
    }" class="relative flex flex-col items-center justify-center gap-4 px-4">
      <div class="text-center text-3xl font-bold md:text-5xl dark:text-white">
        欢迎收看 {{ course.name }} 直播频道
      </div>
      <div class="py-4 text-base font-extralight md:text-3xl dark:text-neutral-200">
        请选择您感兴趣的章节。
      </div>
    </Motion>

    <swiper :slidesPerView="3" :spaceBetween="0" :centeredSlides="true" :loop="true" :navigation="true"
      :pagination="{ clickable: true, }" :modules="modules" class="mySwiper">
      <swiper-slide v-for="item in items" :key="item.id">
        <card :item="item"></card>
      </swiper-slide>
    </swiper>
  </AuroraBackground>

  <v-empty-state v-else image="https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/teamwork.png">
    <template v-slot:title>
      <div class="text-subtitle-2 mt-8">
        没有相应的课程内容
      </div>
    </template>

    <template v-slot:actions>
      <v-btn class="text-none" prepend-icon="mdi-arrow-left" elevation="1" rounded="lg" size="small" text="back"
        width="96" @click="router.back()"></v-btn>
    </template>
  </v-empty-state>
</template>

<script setup>
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Motion } from "motion-v";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';
import { onMounted, ref } from "vue";
import Card from './card.vue'

import { useRoute, useRouter } from 'vue-router';
import { courseApi } from '@/api/course';
import { ChapterApi } from '@/api/chapter';

const modules = ref([Pagination, Navigation])

const route = useRoute()

const router = useRouter()

const course = ref({})

const items = ref([])

const load = async () => {
  course.value = await courseApi.info(route.params.courseid)

  items.value = await ChapterApi.list(route.params.courseid)
}
onMounted(() => {
  load()
})

</script>

<style scoped>
.swiper {
  width: 80%;
  height: 60%;
  min-width: 1280px;
  max-width: 1700px;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>