<template>
  <v-main id="bg">
    <v-sheet class="py-16">
      <v-container class="mt-16">
        <v-img src="../../assets/album/heroPic.webp"></v-img>
      </v-container>
    </v-sheet>
    <CarouselAlbum />
    <CarouselSheet />
  </v-main>
</template>

<script setup>
import { definePage } from "vue-router/auto";
import CarouselAlbum from "@/components/carousel/carouselAlbum.vue";
import CarouselSheet from "@/components/carousel/carouselSheet.vue";

definePage({
  meta: {
    title: "木樓合唱團 | 出版品",
    login: false,
    admin: false,
  },
});
</script>

<style scoped>
#bg {
  background: url(../../assets/album/bg_shop.webp);
  background-size: cover;
  background-attachment: fixed;
}
</style>
