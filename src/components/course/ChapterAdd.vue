<template>
  <v-dialog v-model="dialog" activator="parent" max-width="800px" scrollable>
    <v-card>
      <v-card-text v-if="chapters.length > 0">
        <v-list>
          <template v-for="item in chapters" :key="item.id">
            <v-list-group v-if="item.sections" :value="item.id">
              <template v-slot:activator="{ props }">
                <v-hover v-slot="{ isHovering, props: hoverProps }">
                  <v-list-item style="display: flex;" v-bind="{ ...props, ...hoverProps }">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    <v-btn v-if="isHovering" color="green" style="position: absolute; right: 15px;" size="small"
                      variant="flat" @click.stop="handleButtonClick(item)">
                      AI生成ppt
                    </v-btn>
                  </v-list-item>
                </v-hover>
              </template>

              <v-hover v-for="child in item.sections" :key="child.id" v-slot="{ isHovering, props: hoverProps }">
                <v-list-item style="display: flex;" :value="child.id" v-bind="hoverProps">
                  <v-list-item-title>{{ child.title }}</v-list-item-title>
                  <template v-slot:append>
                    <v-fade-transition>
                      <v-btn v-if="isHovering" color="green" style="position: absolute; right: 15px;" size="small"
                        variant="flat" @click.stop="handleButtonClick(child)">
                        AI生成ppt
                      </v-btn>
                    </v-fade-transition>
                  </template>
                </v-list-item>
              </v-hover>
            </v-list-group>

            <v-hover v-else v-slot="{ isHovering, props: hoverProps }">
              <v-list-item style="display: flex;" :value="item.id" v-bind="hoverProps">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <template v-slot:append>
                  <v-fade-transition>
                    <v-btn v-if="isHovering" color="green" style="position: absolute; right: 15px;" size="small"
                      variant="flat" @click.stop="handleButtonClick(item)">
                      AI生成ppt
                    </v-btn>
                  </v-fade-transition>
                </template>
              </v-list-item>
            </v-hover>
          </template>
        </v-list>
      </v-card-text>
      <v-card-text style="align-items: center;" v-else>
        <v-btn color="green" variant="flat" @click.stop="">
          章的管理
        </v-btn>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" @click="saveChapter">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import {
    ChapterApi
  } from '@/api/chapter';

  const props = defineProps<{
    courseId ?: number | string
  }>()

  const dialog = ref(false)
  const loading = ref(false)
  const loadingEdit = ref(false)
  const serverItems = ref<Chapter[]>([])
  interface Section {
    id : number
    title : string
  }

  interface Chapter {
    id : number
    title : string
    sections : Section[]
  }

  const chapters = ref()

  const chatperDefualt = ref<Chapter[]>([
    {
      id: 1,
      title: '第一章',
      sections: [
        { id: 4, title: '课程讲解' },
        { id: 5, title: '课程目标' },
      ],
    },
    {
      id: 2,
      title: '第二章',
      sections: [
        { id: 6, title: '课程讲解' },
        { id: 7, title: '课程目标' },
      ],
    },
    {
      id: 3,
      title: '第三章',
      sections: [
        { id: 8, title: '课程讲解' },
        { id: 9, title: '课程目标' },
      ],
    },
  ])

  const handleButtonClick = (item : any) => {
    console.log('按钮被点击')
  }

  const saveChapter = () => {
    // 实现保存逻辑
    dialog.value = false
    console.log('保存按钮被点击');
  }


  const loadItems = async () => {
    loading.value = true
    try {
      const res = await ChapterApi.list(props.courseId)
      console.log('API响应:', res)
      // 4. 处理响应数据
      chapters.value = res

    } catch (error) {
      console.error('加载失败:', error)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    loadItems()
  })
</script>

<style scoped>
  .v-list-item {
    margin-bottom: 10px;
  }

  :deep(.v-list-item__content) {
    display: flex;
  }
</style>
