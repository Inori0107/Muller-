<template>
  <v-sheet>
    <v-img src="../../assets/album/heroPic.webp"></v-img>
  </v-sheet>
  <v-container class="text-center">
    <h1>購物</h1>
    <v-row></v-row>
    <v-row></v-row>
  </v-container>
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