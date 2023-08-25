<template>
  <Job></Job>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Job from './job/index.vue'

onMounted(() => {
  console.log('App mounted')
})
</script>
