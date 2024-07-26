<template>
  <v-container>
    <h1>訂票</h1>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
definePage({
  meta: {
    title: '木樓合唱團 | 訂票查詢',
    login: false,
    admin: false
  }
})
</script>