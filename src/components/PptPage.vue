<template>
    <div class="ppt-page">
      <div class="slide-content">
        <!-- 这里放置PPT页面内容，类似图片中的内容区域 -->
        <slot></slot>
      </div>
      <div class="button-container">
        <button @click="prevPage">上一页</button>
        <button @click="nextPage">下一页</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // 当前页面索引，从1开始
  const currentPage = ref(1);
  // 总页数，这里假设为10页，可根据实际情况调整
  const totalPages = 10; 
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages) {
      currentPage.value++;
    }
  };
  </script>
  
  <style scoped>
  .ppt-page {
    text-align: center;
    padding: 20px;
  }
  .slide-content {
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
  }
  .button-container {
    display: flex;
    justify-content: center;
  }
  .button-container button {
    margin: 0 10px;
    padding: 8px 16px;
  }
  </style>