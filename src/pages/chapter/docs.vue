<template>
    <v-card class="rounded-lg" min-width="400px" max-width="1280px">
        <swiper :slidesPerView="1" :pagination="pagination" :modules="modules" @swiper="onSwiper"
            @slideChange="onSlideChange">
            <swiper-slide v-for="item in data">
                <v-img :src="item" max-height="600px"></v-img>
            </swiper-slide>
        </swiper>
    </v-card>
</template>

<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import { ref, watch } from 'vue';

const props = defineProps({
    data: Array,
    current: Number
})

const emit = defineEmits(['change'])

const modules = [Pagination]

const pagination = {
    clickable: true,
    renderBullet: (index, className) => '<span class="' + className + '">' + (index + 1) + '</span>'
}

const instance = ref()

const onSwiper = (swiper) => {
    instance.value = swiper
}

const onSlideChange = (swiper) => {
    emit('change', swiper.activeIndex)
}

watch(() => props.current, () => {
    if (props.current != null && instance.value != null) {
        instance.value.slideTo(props.current)
    }
})

defineExpose({
    instance
})

</script>

<style lang="scss" scoped>
.swiper {
    width: 100%;
    height: 100%;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

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

:deep(.swiper-pagination-bullet) {
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color: #000;
    opacity: 1;
    background: rgba(0, 0, 0, 0.2);
}

:deep(.swiper-pagination-bullet-active) {
    color: #fff;
    background: #007aff;
}
</style>