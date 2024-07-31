<template>
  <v-main>
    <v-sheet class="pt-16">
      <v-container class="mt-8">
        <h1 class="text-center">購物車</h1>
      </v-container>
      <CartProduct />
      <!-- <CartTicket /> -->
    </v-sheet>
  </v-main>
</template>

<script setup>
import { definePage } from "vue-router/auto";
import CartProduct from "@/components/cart/cartProduct.vue";
// import CartTicket from "@/components/cart/cartTicket.vue";

definePage({
  meta: {
    title: "木樓合唱團 | 購物車",
    login: true,
    admin: false,
  },
});
</script>
