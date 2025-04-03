<template>
  <v-app-bar color="transparent" :elevation="0">
    <template #prepend>
      <v-img src="/favicon.ico" alt="Favicon" width="100" height="100" />
      <v-app-bar-title>
        AI智慧在线课程平台
      </v-app-bar-title>
    </template>
    <v-spacer></v-spacer>
    <v-btn>
      <span style="color: #ffffff;">用户名</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
</script>

<style scoped>
.v-responsive {
  max-width: 25%;
}

.v-app-bar-title {
  color: #ffffff;
  font-size: 19px;
}

.v-toolbar__content {
  height: 45px !important;
}
</style>

<style   scoped>
/* 移动端竖屏样式 */
@media (max-width: 1000px) and (orientation: portrait) {
  /* .v-main {
      padding-top: 45px;
      flex: 1;
    } */

  .v-responsive {
    max-width: 10%;
  }

  .v-app-bar-title {
    margin-left: 10px;
    font-size: 16px;
    color: #ffffff;
  }

  .v-app-bar {
    width: 100%;
    flex: 0 0 10%;
  }

  .v-toolbar__content {
    height: 36px !important;
  }
}

/* 移动端横屏样式 */
@media (max-width: 1000px) and (orientation: landscape) {
  .v-responsive {
    max-width: 10%;
  }

  .v-app-bar-title {
    margin-left: 10px;
    font-size: 16px;
    color: #ffffff;
  }

  .v-app-bar {
    width: 100%;
  }

  .v-toolbar__content {
    height: 36px !important;
  }
}
</style>
