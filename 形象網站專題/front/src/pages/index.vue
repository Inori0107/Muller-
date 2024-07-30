<template>
  <v-main id="bg">
    <!-- heroPic -->
    <v-sheet class="px-8 pt-8">
      <v-container>
        <v-col class="my-6">
          <v-img src="../assets/home/carousel01.jpg"></v-img>
        </v-col>
        <v-col class="my-4">
          <v-img src="../assets/home/medal.webp"></v-img>
        </v-col>
      </v-container>
    </v-sheet>
    <!-- about us -->
    <v-container>
      <v-col cols="12" class="text-center text-white">
        <h1 class="leader_text">About Us</h1>
      </v-col>
    </v-container>
    <v-sheet class="py-16">
      <v-container>
        <div class="pic-center">
          <v-img src="../assets/home/about.jpeg"></v-img>
        </div>
      </v-container>
    </v-sheet>
    <!-- our services -->
    <v-container>
      <v-col cols="12" class="text-center text-white">
        <h1 class="leader_text">Our Services</h1>
      </v-col>
    </v-container>
    <v-sheet class="py-16">
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="4">
            <v-img src="../assets/home/gototicket.jpg"></v-img>
          </v-col>
          <v-col cols="4">
            <v-img src="../assets/home/gototicket.jpg"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <!-- learn more -->
    <v-container>
      <v-col cols="12" class="text-center text-white">
        <h1 class="leader_text">Learn More</h1>
      </v-col>
    </v-container>
    <v-sheet class="py-16">
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12">
            <Carousel
              :images="images"
              :slidesPerView="3"
              :spaceBetween="20"
              :loop="true"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-main>
</template>

<script setup>
import { definePage } from "vue-router/auto";
import Carousel from "@/components/carousel/carouselImage.vue";
import review from "../assets/home/review.webp";
import video from "../assets/home/video.webp";
import contact from "../assets/home/contact.jpg";

definePage({
  meta: {
    title: "木樓合唱團",
    login: false,
    admin: false,
  },
});
const images = [review, video, contact];
</script>

<style scoped>
#bg {
  background: url(../assets/home/home_bg.jpg) no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
.leader_text {
  text-shadow: #c8c8c8 1px 1px 0px, #b4b4b4 0px 2px 0px, #a0a0a0 0px 3px 0px,
    rgba(140, 140, 140, 0.498039) 0px 4px 0px, #787878 0px 0px 0px,
    rgba(0, 0, 0, 0.498039) 0px 5px 10px;
}
</style>
