<template>
  <Job></Job>
  <el-button>hello</el-button>
  <p>
    <!--使用 router-link 组件进行导航 -->
    <!--通过传递 `to` 来指定链接 -->
    <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
    <RouterLink to="/">Go to Home</RouterLink>
    <router-link to="/about">Go to About</router-link>
  </p>
  <router-view></router-view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Job from './views/job/index.vue'

onMounted(() => {
  console.log('App mounted')
})
</script>
