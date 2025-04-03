<template>
    <v-card :disabled="loading" :loading="loading" class="mx-auto my-12" width="380">
        <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
        </template>
        <v-hover v-slot="{ isHovering, props }">
            <v-img height="250" src="@/assets/cover/card-default.png" cover v-bind="props">
                <v-expand-transition>
                    <div v-if="isHovering" class="d-flex bg-black v-card--reveal text-h2" style="height: 100%;">
                        <video playsinline autoplay>
                            <source src="https://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4" />
                        </video>
                    </div>
                </v-expand-transition>
            </v-img>
        </v-hover>

        <v-card-item>
            <v-card-title>年人饮食照护课程</v-card-title>

            <v-card-subtitle>
                <span class="me-1">裴超琦</span>

                <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
            </v-card-subtitle>
        </v-card-item>

        <v-card-text>

            <div>我们精心打造了专业的老年照护直播间，这里将是您获取照护知识，守护长辈健康的温馨港湾。</div>
        </v-card-text>

        <v-card-actions class="justify-center">
            <v-btn width="100%" color="deep-purple-lighten-2" text="进入" @click="reserve"></v-btn>
        </v-card-actions>
    </v-card>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loading = ref(false)
const selection = ref(1)

const reserve = () => {
    loading.value = true

    setTimeout(() => router.push('/live/1'), 1000)
}


</script>

<style scoped>
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .9;
    position: absolute;
    width: 100%;
}
</style>