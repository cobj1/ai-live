<template>
    <AuroraBackground>
        <LetterPullup words="老年人饮食照护课程" :delay="0.05" class="text-black dark:text-white" />

        <v-container class="mt-4" max-width="90%" min-width="1280px" style=" align-content: center;">
            <div class="d-flex ga-8 justify-center">
                <s-avatar class="flex-1-0" @load-img="handleLoadImg"></s-avatar>

                <s-docs ref="docsRef" :data="images"></s-docs>
            </div>
        </v-container>
    </AuroraBackground>
    <Loading></Loading>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SAvatar from './avatar.vue'
import SDocs from './docs.vue'
import { DocsApi } from '@/api/docs';
import { useRoute } from 'vue-router'

import axios from '@/axios/live-service'

const route = useRoute()

const docsRef = ref()

const images = ref([])

const loadItmes = async () => {
    images.value = await DocsApi.list()

    await axios({
        url: `http://192.168.124.124:12001/api/ppt/list/${route.params.chapterid}`,
        method: 'post'
    })
}

const handleLoadImg = (img) => {
    const index = images.value.findIndex(item => item == img)
    docsRef.value.instance.slideTo(index)
}

onMounted(() => {
    loadItmes()
})
</script>

<style lang="scss" scoped></style>