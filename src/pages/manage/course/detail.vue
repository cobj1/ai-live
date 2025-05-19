<template>
  <div class="course-detail">
    <!-- 头部导航 -->
    <header class="header">
      <div class="course-title">老年照护课程</div>
      <button class="close-btn" @click="handleClose">×</button>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 左侧大图区域 -->
        <!-- src="@/assets/images/course-banner.jpg"  -->
      <section class="banner-area">
        <img 
         
          alt="美智老年人照护职业技能仿真教学实训系统" 
          class="banner-image"
        >
        <div class="action-buttons">
          <button class="start-btn" @click="startLearning">开始学习</button>
          <div class="rating-stars">
            <StarIcon v-for="i in 5" :key="i" :filled="i <= rating" />
          </div>
          <span class="rating-count">{{ ratingCount }}</span>
        </div>
      </section>

      <!-- 右侧课程信息 -->
      <aside class="course-info">
        <div class="school-info">
          <SchoolIcon class="school-icon" />
          <div>
            <h3>院校: 陕西工业职业技术学院</h3>
            <div class="course-leader">课程负责人: 裴超辉</div>
          </div>
        </div>

        <div class="course-desc">
          <CourseDocIcon class="doc-icon" />
          <div class="desc-text">
            老年人照护职业技能等级标准（试行）教材配套资源。教材按照《国家职业教育改革实施方案》要求，依据最新版《中华人民共和国老年人权益保障法》以及《养老机构服务质量基本规范》等国家标准、行业标准和规范性文件进行编写，涵盖了老年人照护基础知识、老年人照护基本技能、老年人照护实操训练等内容。
          </div>
        </div>
      </aside>
    </main>

    <!-- 底部统计 -->
    <footer class="footer-stats">
      <div class="stats-item">
        <EyeIcon class="stat-icon" />
        <span>{{ viewCount }}</span>
      </div>
      <div class="stats-item">
        <HeartIcon class="stat-icon" />
        <span>{{ likeCount }}</span>
      </div>
      <div class="stats-item">
        <ShareIcon class="stat-icon" />
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';


// 模拟数据
const rating = ref(4.5);
const ratingCount = ref('99');
const viewCount = ref('20678');
const likeCount = ref('36');

// 关闭按钮事件处理
const handleClose = () => {
  console.log('关闭课程详情');
  router.back();

};

// 开始学习按钮事件处理
const startLearning = () => {
  console.log('开始学习课程');
  // 这里可以添加导航到学习页面的逻辑
};
</script>

<style scoped lang="scss">
.course-detail {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;

    .course-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #999;
    }
  }

  .main-content {
    display: flex;
    gap: 24px;

    .banner-area {
      flex: 3;
      position: relative;

      .banner-image {
        width: 100%;
        height: 360px;
        object-fit: cover;
        border-radius: 4px;
      }

      .action-buttons {
        position: absolute;
        bottom: 20px;
        left: 20px;
        display: flex;
        align-items: center;
        gap: 12px;

        .start-btn {
          padding: 8px 16px;
          background-color: #e94e4e;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;

          &:hover {
            background-color: #d43535;
          }
        }

        .rating-stars {
          color: #ffc107;
        }

        .rating-count {
          color: #666;
          margin-left: 4px;
        }
      }
    }

    .course-info {
      flex: 1;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .school-info {
        display: flex;
        align-items: flex-start;
        margin-bottom: 20px;

        .school-icon {
          margin-right: 10px;
          width: 24px;
          height: 24px;
        }

        > div {
          flex: 1;
        }

        h3 {
          font-size: 14px;
          margin: 0 0 8px;
          font-weight: 500;
        }

        .course-leader {
          font-size: 14px;
          color: #666;
        }
      }

      .course-desc {
        display: flex;
        flex: 1;

        .doc-icon {
          margin-right: 10px;
          width: 24px;
          height: 24px;
          flex-shrink: 0;
        }

        .desc-text {
          font-size: 14px;
          line-height: 1.6;
          color: #444;
        }
      }
    }
  }

  .footer-stats {
    display: flex;
    justify-content: space-around;
    padding: 16px 0;
    border-top: 1px solid #f0f0f0;

    .stats-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 14px;
      color: #666;

      .stat-icon {
        width: 20px;
        height: 20px;
        margin-bottom: 4px;
      }
    }
  }
}
</style>