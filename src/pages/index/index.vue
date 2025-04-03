<template>
  <AuroraBackground>
    <Motion as="div" :initial="{ opacity: 0, y: 40, filter: 'blur(10px)' }" :while-in-view="{
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
    }" :transition="{
      delay: 0.3,
      duration: 0.8,
      ease: 'easeInOut',
    }" class="relative flex flex-col items-center justify-center gap-4 px-4">
      <div class="text-center text-3xl font-bold md:text-7xl dark:text-white">
        欢迎收看直播频道
      </div>
      <div class="py-4 text-base font-extralight md:text-4xl dark:text-neutral-200">
        请选择您感兴趣的直播间。
      </div>
    </Motion>

    <swiper :slidesPerView="3" :spaceBetween="0" :centeredSlides="true" :loop="true" :navigation="true"
      :pagination="{ clickable: true, }" :modules="modules" class="mySwiper">
      <swiper-slide>
        <card></card>
      </swiper-slide>
      <swiper-slide>
        <card></card>
      </swiper-slide>
      <swiper-slide>
        <card></card>
      </swiper-slide>
      <swiper-slide>
        <card></card>
      </swiper-slide>
      <swiper-slide>
        <card></card>
      </swiper-slide>
      <swiper-slide>
        <card></card>
      </swiper-slide>
      <swiper-slide>
        <card></card>
      </swiper-slide>
      <swiper-slide>
        <card></card>
      </swiper-slide>
      <swiper-slide>
        <card></card>
      </swiper-slide>
    </swiper>
  </AuroraBackground>
</template>

<script setup>
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Motion } from "motion-v";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';
import { ref } from "vue";
import Card from './card.vue'

const modules = ref([Pagination, Navigation])

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