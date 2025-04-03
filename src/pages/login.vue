<template>
  <div class="video-container">
    <video autoplay muted loop playsinline class="background-video">
      <source src="/video/首页视频.mp4" type="video/mp4">
    </video>

    <div class="content-layer">
      <div class="right-section">
        <v-card class="login-form">

          <v-theme-provider theme="dark">
            <spacegt-login :proxy="proxy" @login="onLogin"> </spacegt-login>
          </v-theme-provider>

          <div class="qrcode-group">
            <div class="qrcode-item">
              <a href="#" target="_blank">
                <img src="/image/gz.jpg" alt="易格云仿真" width="150" height="150">
              </a>
            </div>
            <div class="qrcode-item">
              <a href="#" target="_blank" class="image-link">
                <img src="/image/sz.jpg" alt="墨影AI数字人" width="150" height="150">
              </a>
            </div>
          </div>
        </v-card>
      </div>

      <footer class="transparent-footer">
        <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
          京ICP备14018031号-1@2018-2025 北京易格通智仿真技术有限公司</a>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { snackbar } from '@/stores/snackbar';
import { useRouter } from 'vue-router';
import { useAuthorizationStore } from '@/stores/authorization'
import { useAccountsStore } from '@/stores/data/accounts'

const authorizationStore = useAuthorizationStore()
const accountsStore = useAccountsStore()
const router = useRouter()

const proxy = import.meta.env.VITE_APP_ACCOUNTS_SERVICE

const onLogin = (data) => {
  if (data.code === 0) {
    authorizationStore.token = data.token
    accountsStore.account = data.data
    accountsStore.authorities = data.data.authorities
    router.push('/')
  } else {
    snackbar({
      title: data.message,
      type: 'warning',
    })
  }
}
</script>

<style scoped>
.video-container {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.background-video {
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  z-index: 0;
}

.content-layer {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.right-section {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  padding-right: 10%;
}

.login-form {
  color: #ffffff;
  width: 400px;
  background-color: transparent;
  backdrop-filter: blur(8px);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.qrcode-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 30px;
  padding: 15px;
}

.qrcode-item {
  width: 160px;
  height: 160px;
  margin: 0 auto;
}

.transparent-footer {
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3px);
  padding: 16px 0;
  text-align: center;
  width: 100%;
}
</style>
