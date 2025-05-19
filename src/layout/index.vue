<template>
    <v-layout>
        <v-navigation-drawer v-model="drawer">
            <template #prepend>
                <v-sheet class="d-flex justify-center py-4">
                    <v-avatar image="/letter-y.png" size="80" />
                </v-sheet>

                <v-divider />
            </template>

            <v-list density="compact" item-props :items="items" nav />
        </v-navigation-drawer>

        <v-app-bar border="b" class="ps-4" flat>
            <v-app-bar-nav-icon v-if="$vuetify.display.smAndDown" @click="drawer = !drawer" />

            <v-app-bar-title>AI 在线智慧课程平台</v-app-bar-title>

            <template #append>
                <spacegt-myaccount :account="accountsStore.account" @logout="handleLogout" @login="handleLogin"
                    @settings="handleSettings">
                </spacegt-myaccount>
            </template>
        </v-app-bar>

        <v-main>
            <slot></slot>
        </v-main>
    </v-layout>
</template>

<script setup>
import spacegt from 'spacegt'
import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'

const accountsStore = spacegt.stores.useAccountsStore()
const authorizationStore = spacegt.stores.useAuthorizationStore()
const router = useRouter()

const drawer = ref(true)

const items = ref([
    {
        title: '课程广场',
        prependIcon: 'mdi-palette-swatch-outline',
        link: true,
        to: '/manage/course/all'
    },
    {
        title: '我的课程',
        prependIcon: 'mdi-palette-swatch-outline',
        link: true,
        to: '/manage/course/student'
    },
    {
        title: '课程列表',
        prependIcon: 'mdi-palette-swatch-outline',
        link: true,
        to: '/manage/control'
    },
])

const handleLogout = () => {
    accountsStore.account = null
    accountsStore.authorities = []

    authorizationStore.token = ''

    nextTick(() => router.push('/login'))
}

const handleLogin = () => {
    router.push('/login')
}

const handleSettings = () => {
    window.open(`https://myaccount.yigee.cn?token=${authorizationStore.token}`)
}
</script>

<style lang="scss" scoped>
.v-layout {
    height: 100%;
}
</style>
