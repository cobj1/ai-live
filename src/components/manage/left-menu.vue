<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="John Leider" nav>
          <template v-slot:append>
            <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <!-- <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="首页" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="课程广场" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="课程列表" value="users"></v-list-item>
        </v-list> -->
        <v-list density="compact" nav>
          <template v-for="item in manageStore.defaultItems" :key="item.title">
            <!-- 普通菜单项 -->
            <v-list-item v-if="item.type === 'VListItem'" :to="item.to" :prepend-icon="item.icon">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>

            <!-- 分组菜单项 -->
            <v-list-group v-if="item.type === 'VListGroup'">
              <template #activator="{ props }">
                <v-list-item v-bind="props" :prepend-icon="item.activator.icon"
                  :title="item.activator.title"></v-list-item>
              </template>

              <!-- 子菜单项 -->
              <v-list-item v-for="(child, index) in item.childrenItems" :key="index" :to="child.to"
                :active="isActive(child.to)">
                <v-list-item-title>{{ child.title }}</v-list-item-title>
              </v-list-item>
            </v-list-group>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>

</template>

<script setup lang="ts">
  import {
    ref
  } from 'vue'
  import {
    useManageStore
  } from '@/stores/manage';
  import {
    useRoute
  } from 'vue-router'

  const manageStore = useManageStore();
  const route = useRoute();

  const drawer = ref(true)
  const rail = ref(true)


  const isActive = (path : string) => {
    return route.path.startsWith(path) || route.matched.some(r => r.path === path);
  };
</script>

<style>
  .v-card {
    position: absolute !important;
    left: 0;
    height: 100%;
  }
</style>
