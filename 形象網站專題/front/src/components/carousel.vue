<template>
  <Swiper
    :slides-per-view="slidesPerView"
    :space-between="spaceBetween"
    loop="loop"
    class="mySwiper"
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

<!-- <style scoped>
.carousel-image {
  width: 100%;
  height: auto;
  transition: transform 0.3s ease;
}

.swiper-slide-active .carousel-image {
  transform: scale(1.2); /* 調整中間圖片的放大比例 */
}
</style> -->
