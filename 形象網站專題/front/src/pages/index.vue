<template>
  <!-- heroPic -->
  <v-sheet>
    <v-img src="../assets/heroPic.jpg"></v-img>
  </v-sheet>
  <!-- about us -->
  <v-container>
    <v-col cols="12" class="text-center" >
      <h1>about us</h1>
    </v-col>
    <div class="pic-center">
      <v-img src="../assets/about us.jpg" class="w-75"></v-img>
    </div>
  </v-container>
  <!-- our services -->
  <v-container>
    <v-col cols="12" class="text-center" >
      <h1>our services</h1>
    </v-col>
    <v-row justify="center" align="center">
      <v-col cols="4">
        <v-img src="../assets/gotoalbum.jpg"></v-img>
      </v-col>
      <v-col cols="4" >
        <v-img src="../assets/gototicket.jpg"></v-img>
      </v-col>
    </v-row>
  </v-container>
  <!-- learn more -->
  <v-container>
    <v-col cols="12" class="text-center">
      <h1>learn more</h1>
    </v-col>
    <v-row justify="center" align="center">
      <v-col cols="12">
          <Carousel :images="images" :slidesPerView="3" :spaceBetween="20" :loop="true" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Carousel from '@/components/carousel.vue';
import review from '../assets/review.webp';
import video from '../assets/video.webp';
import contact from '../assets/contact.webp';
const images = [
  review, video, contact
];
</script>

<style scoped>
.pic-center {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
}
</style>