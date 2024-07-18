<template>
  <Swiper
    :slides-per-view="slidesPerView"
    :space-between="spaceBetween"
    :loop="loop"
  >
    <SwiperSlide v-for="(image, index) in images" :key="index">
      <v-img :src="image" class="carousel-image"></v-img>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import { defineProps } from "vue";

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  slidesPerView: {
    type: Number,
    default: 1,
  },
  spaceBetween: {
    type: Number,
    default: 10,
  },
  loop: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
.carousel-image {
  width: 100%;
  height: auto;
}
</style>
