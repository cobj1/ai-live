<template>
    <v-card class="rounded-lg" max-width="500px">
        <template #text>
            <v-responsive :aspect-ratio="3 / 4" width="450px" height="600px">
                <video ref="videoRef" class="h-100 w-100" autoplay="true" playsinline="true"
                    :src="data[current]"></video>
            </v-responsive>
            <audio ref="audioRef" autoplay="true"></audio>
        </template>
        <!-- <template #actions>
            <App class="w-100">
                <Sender v-model:value="message" submitType="shiftEnter"
                    placeholder="Press Shift + Enter to send message" class="w-100" @submit="ai" />
            </App>
        </template> -->
    </v-card>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { App } from 'ant-design-vue';
import { Sender } from 'ant-design-x-vue';

defineProps({
    data: Array,
    current: Number
})
const emit = defineEmits(['ended'])

const message = ref("")

const audioRef = ref()
const videoRef = ref()

onMounted(() => {
    videoRef.value.addEventListener("ended", () => {
        emit('ended')
    });

})

</script>

<style scoped>
:deep(.ant-btn) {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}
</style>
