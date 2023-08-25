<script setup>
defineProps({
  title: String,
  message: String
})
</script>

<template>
  <el-card shadow="never">
    <template v-if="title" #header>
      <div class="flex items-center">
        <span class="text-16px font-700">{{ title }}</span>
        <el-tooltip v-if="message" effect="dark" placement="right">
          <template #content>
            <div class="max-w-200px">{{ message }}</div>
          </template>
          <el-icon class="is-loading" :size="14"><QuestionFilled /></el-icon>
        </el-tooltip>
        <div class="flex pl-20px flex-grow">
          <slot name="header"></slot>
        </div>
      </div>
    </template>
    <div>
      <slot></slot>
    </div>
  </el-card>
</template>
