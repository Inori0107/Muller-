<template>
  <v-main>
    <v-sheet class="pt-16">
      <v-container class="mt-8">
        <v-row class="text-center">
          <v-col cols="4" v-for="content in contents" :key="content.name">
            <h2 @click="showContent(content.key)">{{ content.name }}</h2>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-container v-if="activeContent === 'orders'">
      <ProductOrder />
    </v-container>

    <v-container v-else-if="activeContent === 'dream'">
      <v-col cols="12">
        <h1 class="text-center">築夢木樓</h1>
      </v-col>
    </v-container>

    <v-container v-else-if="activeContent === 'tickets'">
      <v-col cols="12">
        <h1 class="text-center">票券清單</h1>
      </v-col>
    </v-container>
  </v-main>
</template>

<script setup>
import { definePage } from "vue-router/auto";
import { ref } from "vue";
import ProductOrder from "@/components/member/productOrder.vue";

definePage({
  meta: {
    title: "木樓合唱團 | 會員",
    login: true,
    admin: false,
  },
});

const activeContent = ref("");
const contents = [
  { name: "商品訂單", key: "orders" },
  { name: "築夢木樓", key: "dream" },
  { name: "票券清單", key: "tickets" },
];

const showContent = (content) => {
  activeContent.value = content;
};
</script>

<style scoped></style>
