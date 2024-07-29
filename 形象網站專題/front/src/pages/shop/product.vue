<template>
  <v-main>
    <v-container>
      <v-img src="../../assets/album/heroPic.webp"></v-img>
    </v-container>
    <v-container class="text-center">
      <h1>購物</h1>
      <v-row></v-row>
      <v-row></v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
definePage({
  meta: {
    title: '木樓合唱團 | 出版品',
    login: false,
    admin: false
  }
})
</script>