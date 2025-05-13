<template>
    <v-app>
      <v-navigation-drawer v-model="drawer" app width="250" :mini-variant="miniVariant"
        @update:mini-variant="miniVariant = $event">
        <!-- 左侧导航栏内容，保持不变 -->
        <v-row style="margin-top: 10px; margin-left: 15px;" align="center" class="spacer" no-gutters>
          <v-col>
            <v-avatar size="36px">
              <v-img alt="Avatar" src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"></v-img>
            </v-avatar>
            <strong style="margin-left: 10px;" v-html="message.name"></strong>
          </v-col>
         
        </v-row>
  
        <v-list style="margin-left: 10px;" :lines="false" density="compact" nav>
  
          <!-- 其他菜单项 -->
          <template v-for="(item, i) in items" :key="i">
            <!-- 父元素作为激活元素 -->
            <div>
              <v-list-item :value="item" color="primary" @click="toggleSubMenu(item)">
                <template v-slot:prepend>
                  <v-icon :icon="item.icon"></v-icon>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </template>
              </v-list-item>
              <!-- 子菜单 -->
              <v-menu activator="parent" v-if="item.children && item.children.length > 0">
                <v-list class="sub-menu">
                  <v-list-item v-for="(child, idx) in item.children" :key="idx" :value="child"
                    @click="selectPage(child.route)">
                    <template v-slot:prepend>
                      <v-icon :icon="child.icon"></v-icon>
                      <v-list-item-title>{{ child.text }}</v-list-item-title>
                    </template>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </template>
        </v-list>
        <div class="d-flex flex-column mb-6">
          <v-list>
            <v-list-item>
              <!-- <v-icon>
             {{ "mdi-history" }}
           </v-icon> -->
              <v-list-item-title class="text-h10">历史会话</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
  
            <!-- 实时更新的会话按钮列表 -->
            <div class="history-buttons">
              <v-btn v-for="(history, index) in chatHistory" :key=index variant="text" block class="history-btn"
                :class="{ 'active-chat': currentSessionId === history.id }" @click="loadChatHistory(history)">
                <v-icon left>mdi-message-text</v-icon>
                <span class="text-truncate">{{ history.title }}</span>
                <v-spacer></v-spacer>
                <v-btn icon="mdi-delete" variant="text" size="small" @click.stop="deleteHistory(history.id)"></v-btn>
              </v-btn>
            </div>
          </v-list>
        </div>
      </v-navigation-drawer>
  
      <v-app-bar scroll-behavior="elevate" app style="overflow-x: auto;">
  
        <v-divider class="h-50" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-tooltip text="返回" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-share-outline" v-bind="props" @click="GoBack"></v-btn>
          </template>
        </v-tooltip>
  
      </v-app-bar>
      <v-main>
  
        <router-view v-slot="{Component}">
  
    <component :is="Component" />
  
  
        </router-view>
      </v-main>
    </v-app>
  
  
  </template>
  
  <script lang="ts" setup>
  import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

  
  const drawer = ref(true);
  const miniVariant = ref(false);
  const router = useRouter();
  const items = ref([
    {
      text: '新对话',
      icon: 'mdi-plus',
      route: '/Home'
    },
   
   
    {
      text: '后台管理',
      icon: 'mdi-account-multiple',
      children: [
        {
          text: '训练声音',
          icon: 'mdi-plus',
          route: '/RVCTraining'
        },
        {
          text: '我的声音',
          icon: 'mdi-plus',
          route: '/AudioManagement'
        },
  
        {
          text: '我的形象',
          icon: 'mdi-plus',
          route: '/PersonalManagement'
        },
  
        {
          text: '我的场景',
          icon: 'mdi-plus',
          route: '/SceneManagement'
        },
        {
          text: '知识库',
          icon: 'mdi-plus',
          route: '/KnowledgeBaseManagement'
        }
  
      ]
    },
 
  ]);
  
  function toggleSubMenu(item: any) {
    chatHistoryStore.setCurrentSessionId('');
    if (item.children && item.children.length > 0) {
      // 这里可以添加逻辑来控制子菜单的显示与隐藏
    } else {
      selectPage(item.route);
    }
  }
  
  const message = ref({
    avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
    name: '对话'
  });
  
  function selectPage(name: string) {
    if (name) {
     
      router.push({name: name});
    }
  }
  function GoBack() {
    router.back();
  }
  
  // 从 Pinia 存储中获取 chatHistory
  const chatHistory = computed(() => chatHistoryStore.chatHistory);
  // 当前会话 id
  const currentSessionId = computed(() => chatHistoryStore.currentSessionId);
  
  
  const chatHistoryStore = useChatHistoryStore();
  
  // 过滤掉原来的历史记录菜单项
  const filteredItems = computed(() => {
    return items.value.filter(item => item.text !== '历史记录');
  });
  
  
  
  
  // 加载特定历史记录
  const loadChatHistory = (history: any) => {
    chatHistoryStore.setCurrentSessionId(history.id);
    console.log("选择当前id" + chatHistoryStore.currentSessionId)
    // 跳转到回答页面并传递 sessionId
    router.push({
      name: 'QuestionAnswerAI',
      query: { sessionId: history.id }
    })
  
  };
  
  // 监听localStorage变化
  const setupStorageListener = () => {
    const handler = (event: StorageEvent) => {
      if (event.key === 'chatHistory') {
        chatHistoryStore.loadChatHistory();
        console.log('检测到历史记录变化，自动刷新');
      }
    };
    window.addEventListener('storage', handler);
  
    // 返回清理函数
    return () => window.removeEventListener('storage', handler);
  };
  
  
  
  // 删除历史记录
  const deleteHistory = (id: string) => {
    // console.log("删除"+id)
    // console.log("删除dangqian"+chatHistoryStore.currentSessionId)
  
  
    if (chatHistoryStore.currentSessionId === id) {
  
      router.push({name :'/Home'});
    }
    chatHistoryStore.deleteSession(id);
  };
  
  
  
  
  // 初始化
  onMounted(() => {
    chatHistoryStore.loadChatHistory();
    const cleanup = setupStorageListener();
  
    // 组件卸载时清理
    onUnmounted(cleanup);
  });
  </script>
  
  <style scoped>
  .history-buttons {
    max-height: calc(100vh - 200px);
    overflow-y: auto;
    padding: 8px 0;
    /* text-align: left!important;  */
    /* 加上!important提高优先级 */
  
  }
  
  .history-btn {
    color: inherit;
    /* 继承文本颜色 */
    background-color: transparent;
    /* 初始背景透明 */
    border: none;
    /* 去除边框 */
    cursor: pointer;
    /* 鼠标悬停显示指针 */
    transition: background-color 0.3s ease;
    /* 添加背景色过渡效果 */
  
  }
  
  :deep(.v-btn__content) {
    display: contents;
  }
  
  .active-chat {
    background-color: #e8f0fe;
    /* 选中时的背景色，可根据需求调整 */
    color: #000;
    /* 选中时的文本颜色，可根据需求调整 */
  }
  
  .sub-menu-container {
    position: relative;
  }
  
  .sub-menu {
    padding-left: 20px;
    position: relative;
    display: block;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }
  
  .sub-menu v-list-item {
    padding-left: 0px;
    margin: 1px 0;
  }
  </style>