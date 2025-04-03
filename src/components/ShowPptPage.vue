<template>
  <div class="parent-container">
    <div class="ppt-screen">
      <img :src="currentImageSrc" alt="当前PPT图片">
    </div>
    <div class="button-group">
      <button @click="forwardPage">上一页</button>
      <span class="button-style">{{currentIndex+'/'+totalPage }}</span>
      <button @click="NextPage">下一页</button>
      <button @click="goToInputPage">前往</button>
      <input type="number" v-model="targetPage" min="1" :max="imageUrls.length">
      <span class="button-style">{{'页' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  // 自动导入图片，这里假设图片命名有规律，如slide1.jpg, slide2.jpg等
  // 使用 import.meta.glob 动态导入图片
  const imageModules = import.meta.glob('@/assets/images/*.png', { eager: true });
  const imageUrls = Object.values(imageModules).map((module : any) => module.default);


  const currentImageSrc = ref(imageUrls[0]);//默认第一个元素
  const targetPage = ref(1);
  const totalPage = ref(imageUrls.length);
  let currentIndex = ref(1);
  //   console.log("totalPage"+totalPage);

  const goToPage = (page : number) => {
    currentImageSrc.value = imageUrls[page - 1];
    currentIndex.value = page;
  };

  const FirstPage = () => {

  }
  const forwardPage = () => {
    if (currentIndex.value > 1) {
      currentIndex.value--;
      currentImageSrc.value = imageUrls[currentIndex.value - 1];
    }
  }

  const NextPage = () => {
    if (currentIndex.value < totalPage.value) {

      currentIndex.value++;
      currentImageSrc.value = imageUrls[currentIndex.value - 1];
    }
  }
  const goToInputPage = () => {
    if (targetPage.value >= 1 && targetPage.value <= totalPage.value) {
      currentImageSrc.value = imageUrls[targetPage.value - 1];
      currentIndex.value = targetPage.value;
    }
  };

  const exitPresentation = () => {
    // 这里可以添加退出放映的相关逻辑，比如跳转到其他页面
    console.log('退出放映');
  };
</script>

<style scoped>
  .parent-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 20px 40px;
  }

  .ppt-screen {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ppt-screen img {
    width: 100%;
    height: 100%;
    border: 5px solid rgb(82, 230, 217);
    border-radius: 5px;
    box-shadow: 0 0 10px 2px rgba(52, 204, 231, 0.7);
  }

  .button-group {
    margin-top: 40px;
    text-align: center;
  }

  .button-group button,
  .button-style {
    background-color: rgb(44, 204, 204);
    color: white;
    border: none;
    border-radius: 15px;
    padding: 10px 20px;
    margin: 0 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .button-group button:hover {
    background-color: rgb(44, 41, 230);
  }

  .button-group button.active {
    background-color: rgb(218, 107, 4);
  }

  .button-group input[type="number"] {
    padding: 8px 15px;
    border: 1px solid #999999;
    border-radius: 4px;
    margin: 0 6px;
    font-size: 16px;
    background-color: white;
  }
</style>

<style   scoped>
  /* 移动端横屏样式 */
  @media (max-width: 932px) and (orientation: portrait) {
    .parent-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      margin: 20px 55px;
    }

    .ppt-screen img {
      width: 100%;
      height: 100%;
      border: 2px solid rgb(82, 230, 217);
    }

    .button-group {
      margin-top: 35px;
    }

    .button-group button,
    .button-style {
      border-radius: 10px;
      padding: 5px 10px;
      margin: 0 5px;
      font-size: 14px;
    }

    .button-group input[type="number"] {
      padding: 4px 10px;
      font-size: 14px;
    }
  }


  @media (max-width: 1000px) and (orientation: landscape) {
    .parent-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      margin: 20px 40px;
    }

    .ppt-screen {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 90%;
      margin-right: -10%;
    }

    .ppt-screen img {
      width: 100%;
      height: 100%;
      border: 2px solid rgb(82, 230, 217);
      margin-right: 1%;
    }

    .button-group {
      margin-top: 45px;
    }

    .button-group button,
    .button-style {
      border-radius: 10px;
      padding: 5px 10px;
      margin: 0 5px;
      font-size: 14px;
    }

    .button-group input[type="number"] {
      padding: 4px 10px;
      font-size: 14px;
    }
  }
</style>
