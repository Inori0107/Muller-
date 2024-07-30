<template>
  <v-main>
    <v-sheet class="pt-16">
      <v-container class="mt-8">
        <v-img src="../../assets/album/heroPic.webp"></v-img>
      </v-container>
    </v-sheet>
    <v-container>
      <h1>訂票</h1>
    </v-container>
  </v-main>
</template>

<script setup>
import { definePage } from "vue-router/auto";
definePage({
  meta: {
    title: "木樓合唱團 | 訂票查詢",
    login: false,
    // admin: false
  },
});
</script>
