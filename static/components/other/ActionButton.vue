<script setup>
import { Search, RefreshRight, ArrowDown, ArrowUp } from 'ElementPlusIconsVue'

const emit = defineEmits(['search', 'reset', 'expand'])

defineProps({
  showSearch: Boolean,
  showReset: Boolean,
  showExpand: Boolean,
  visible: Boolean,
  searchLoading: Boolean,
  resetLoading: Boolean
})

const onSearch = () => {
  emit('search')
}

const onReset = () => {
  emit('reset')
}

const onExpand = () => {
  emit('expand')
}
</script>

<template>
  <el-button
    v-if="showSearch"
    type="primary"
    :loading="searchLoading"
    :icon="Search"
    @click="onSearch"
  >
    查询
  </el-button>
  <el-button v-if="showReset" :loading="resetLoading" :icon="RefreshRight" @click="onReset">
    重置
  </el-button>
  <el-button v-if="showExpand" :icon="visible ? ArrowDown : ArrowUp" text @click="onExpand">
    {{ visible ? '收起' : '展开' }}
  </el-button>
</template>
