<template>
  <Swiper
    :modules="modules"
    :images="images"
    :slides-per-view="5"
    :space-between="40"
    :loop="true"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :centeredSlides="true"
    :slideToClickedSlide="true"
    :breakpoints="{
      600: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      960: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1264: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1904: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
    }"
    class="overflow-visible"
  >
    <SwiperSlide v-for="(image, index) in images" :key="index">
      <v-img :src="image" class="carousel-image"></v-img>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import { Autoplay } from "swiper/modules";
const modules = [Autoplay];

import review01 from "../../assets/review/review01.jpg";
import review02 from "../../assets/review/review02.jpg";
import review03 from "../../assets/review/review03.webp";
import review04 from "../../assets/review/review04.jpg";
import review05 from "../../assets/review/review05.webp";
import review06 from "../../assets/review/review06.webp";
import review07 from "../../assets/review/review07.webp";
import review08 from "../../assets/review/review08.webp";
import review09 from "../../assets/review/review09.webp";
import review10 from "../../assets/review/review10.webp";
import review11 from "../../assets/review/review11.webp";

const images = [
  review01,
  review02,
  review03,
  review04,
  review05,
  review06,
  review07,
  review08,
  review09,
  review10,
  review11,
];
</script>
