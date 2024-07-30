<template>
  <v-container class="h-100">
    <v-row class="h-100">
      <v-col cols="12">
        <h1 class="text-center">請選擇訂單項目</h1>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { definePage } from "vue-router/auto";

definePage({
  meta: {
    title: "木樓合唱團 | 訂單管理",
    login: true,
    admin: true,
  },
});
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
