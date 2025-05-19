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

            <template #append>
                <v-list-item class="ma-2" link nav prepend-icon="mdi-cog-outline" title="Settings" />
            </template>
        </v-navigation-drawer>

        <v-app-bar border="b" class="ps-4" flat>
            <v-app-bar-nav-icon v-if="$vuetify.display.smAndDown" @click="drawer = !drawer" />

            <v-app-bar-title>AI 在线智慧课程平台</v-app-bar-title>

            <template #append>
                <spacegt-myaccount :account="accountsStore.account" proxy="https://myaccount.spacegt.com"
                    @logout="handleLogout" @login="handleLogin" @settings="handleSettings">
                </spacegt-myaccount>

                <!-- <v-btn class="text-none me-2" height="48" icon slim>
                    <v-avatar color="surface-light" image="https://cdn.vuetifyjs.com/images/john.png" size="32" />

                    <v-menu activator="parent">
                        <v-list density="compact" nav>
                            <v-list-item append-icon="mdi-cog-outline" link title="Settings" />

                            <v-list-item append-icon="mdi-logout" link title="Logout" />
                        </v-list>
                    </v-menu>
                </v-btn> -->
            </template>
        </v-app-bar>

        <v-main>
            <slot></slot>
        </v-main>
    </v-layout>
    <!-- <v-app>
        <LeftMenu />
        <v-main>
            <v-container fluid>
                <router-view />
                <spacegt-aippt @export-images="handleExportImages" @create-outline="handleCreateOutline"
                    @createPPT="handleCreatePPT"></spacegt-aippt>
            </v-container>
        </v-main>
    </v-app> -->
</template>

<script setup>
import { useAccountsStore } from '@/stores/data/accounts'
import { ref } from 'vue'

const accountsStore = useAccountsStore()

const drawer = ref(true)

const items = ref([
    {
        title: '课程广场',
        prependIcon: 'mdi-palette-swatch-outline',
        link: true,
        to: '/manage/course/all'
    },
    {
        title: '课程列表',
        prependIcon: 'mdi-palette-swatch-outline',
        link: true,
        to: '/manage/control'
    },
])

const handleExportImages = (data) => {
    console.log(data)
}
const handleCreateOutline = (data) => {
    console.log(data)
}
const handleCreatePPT = (data) => {
    console.log(data)
}

const handleLogout = () => {
    console.log("is logouted")
}

const handleLogin = () => {
    console.log("to login")
}

const handleSettings = () => {
    console.log("to settings")
}
</script>

<style lang="scss" scoped>
.v-layout {
    height: 100%;
}
</style>
