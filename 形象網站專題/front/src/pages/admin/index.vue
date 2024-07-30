<template>
  <v-container class="h-100">
    <v-row class="h-100">
      <v-col cols="12">
        <h1 class="text-center">請選擇管理項目</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { definePage } from "vue-router/auto";

definePage({
  meta: {
    title: "木樓合唱團 | 管理",
    login: true,
    admin: true,
  },
});
</script>

<!-- 抓取管理員 layout -->
<route lang="yaml">
meta:
  layout: admin
</route>
