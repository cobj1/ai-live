<template>
    <div>
        <v-row>
            <v-col cols="10">
                <div class="left-filters">
                    <div class="filter-group">
                        <label class="filter-label">课程类型：</label>
                        <v-btn-toggle v-model="localSelectedTypes" color="deep-purple-accent-3" rounded="0" group
                            multiple class="custom-btn-group" @update:modelValue="handleTypeChange">
                            <v-btn v-for="(type, index) in types" :key="index" :value="String(type.id)">
                                {{ type.name }}
                            </v-btn>
                        </v-btn-toggle>
                    </div>

                    <div class="filter-group">
                        <label class="filter-label">课程分类：</label>
                        <v-btn-toggle v-model="localSelectedCategory" color="deep-purple-accent-3" rounded="0" group
                            multiple class="custom-btn-group" @update:modelValue="handleCategoryChange">
                            <v-btn v-for="(category, index) in categories" :key="index" :value="String(category.id)">
                                {{ category.name }}
                            </v-btn>
                        </v-btn-toggle>
                    </div>
                </div>
            </v-col>
            <v-col cols="2">
                <div class="d-flex align-center gap-3 w-64 justify-end">
                    <v-col cols="11">
                        <v-text-field v-model="localSearch" label="按课程名搜索" prepend-inner-icon="mdi-magnify"
                            variant="outlined" hide-details single-line @keyup.enter="handleSearch"  class="flex-grow-0" 
                             />
                    </v-col>
                    <v-col cols="1">
                        <v-btn color="primary" @click="clesrSearch" class="align-self-center">
                            清空
                        </v-btn>
                    </v-col>
                </div>
               
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import type { CourseCategory, CourseType } from '@/types/course';
import { ref, computed, onUnmounted } from 'vue'


const inputCourse_code = ref<string>('')
const props = defineProps<{
    types: CourseType[]
    categories: CourseCategory[]
    search: string
    selectedTypes: string[]
    selectedCategory: string[]
}>()

const emit = defineEmits<{
    (e: 'update:types', value: string[]): void
    (e: 'update:category', value: string[]): void
    (e: 'update:search', value: string): void
}>()

const localSelectedTypes = computed({
    get: () => props.selectedTypes ?? [],
    set: (val) => emit('update:types', val)
})

const localSelectedCategory = computed({
    get: () => props.selectedCategory ?? [],
    set: (val) => emit('update:category', val)
})

const localSearch = computed({
    get: () => props.search,
    set: (val) => emit('update:search', val.trim())
})

// 处理类型变化
const handleTypeChange = (newTypes: string[]) => {
    localSelectedTypes.value = newTypes

}

// 处理分类变化
const handleCategoryChange = (newCategories: string[]) => {
    localSelectedCategory.value = newCategories

}

// 手动实现防抖函数
let searchTimeout: ReturnType<typeof setTimeout> | null = null

const debounceSearch = (callback: () => void, delay: number) => {
    if (searchTimeout) {
        clearTimeout(searchTimeout)
    }
    searchTimeout = setTimeout(callback, delay)
}

// 搜索处理
const handleSearch = () => {
    debounceSearch(() => {
        if (localSearch.value.trim()) {
            localSearch.value = localSearch.value.trim()
        }
    }, 500)
}
// 搜索处理
const clesrSearch = () => {
    localSearch.value = ''
}

// 清理定时器
onUnmounted(() => {
    // 清理可能存在的防抖定时器
})
</script>

<style scoped>
.filter-group {
    display: flex;
    align-items: center;
    gap: 8px;
}

.custom-btn-group {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    height: auto;

    /* 按钮间距 */
    padding: 4px 0;
    /* 与标签间距 */
    min-height: 40px;
    /* 保持最小高度 */
    overflow-x: auto;
    /* 横向溢出时滚动 */
}

.custom-btn-group .v-btn {
    height: 30px !important;
}

.filter-label {
    font-weight: 600;
    color: #666;
    min-width: 80px;
}

.left-filters {
    display: flex;
    flex: 1;
    /* 占据剩余空间 */
    gap: 16px;
    /* 左侧两个filter-group间距 */
    flex-wrap: wrap;
    /* 允许换行 */
}

.right-filter {
    position: relative;
    display: flex;
    align-items: center;
}
/* 右侧对齐容器 */
.justify-end {
  margin-left: auto; /* 关键：将容器推到右侧 */
}

/* 操作区域固定宽度 */
.w-64 {
  width: 200px;
}

/* 输入框禁止换行 */
.flex-grow-0 {
  flex-grow: 0 !important;
}
</style>