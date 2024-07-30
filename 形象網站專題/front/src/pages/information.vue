<template>
  <v-main id="bg">
    <v-sheet class="pt-16">
      <v-container class="mt-8">
        <v-img src="../assets/review/reviewHome.webp"></v-img>
      </v-container>
    </v-sheet>
    <!-- Review -->
    <v-container class="text-center mb-4 pb-4">
      <h1 class="pb-4">演出回顧</h1>
      <div class="pa-8">
        <Carousel
          :images="images"
          :slidesPerView="5"
          :spaceBetween="40"
          :loop="true"
          centeredSlides="true"
          slideToClickedSlide="true"
          :breakpoints="breakpoints"
          class="mySwiper overflow-visible"
        />
      </div>
      <div class="mt-5 pt-5">
        <DialogComponent title="關於我們">
          <!-- Timeline -->
          <template #content></template>
        </DialogComponent>
      </div>
    </v-container>
    <!-- Youtube -->
    <v-container>
      <v-row>
        <v-col lg="6" cols="12" class="text-center text-lg-left"
          ><h1>木樓合唱團 YouTube頻道</h1></v-col
        >
        <v-col lg="6" cols="12" class="text-center text-lg-right"
          ><iframe
            style="height: 55px; width: 200px"
            target="_blank"
            frameborder="0"
            src="https://static.parastorage.com/services/editor-elements-library/dist/thunderbolt/media/iframe.deb83caf.html?channel=MullerOfficial&amp;layout=full&amp;theme=default"
          ></iframe
        ></v-col>
      </v-row>
      <v-row class="text-center pt-3 pb-5"
        >　木樓合唱團官方YouTube頻道，承載了創立至今不同時期的豐富音樂風貌：在國際賽事上得獎的動人時刻、充滿土地情懷的委託創作作品及近年音樂會精選曲目，依照宗教、國際大賽、當代、委託創作、民謠等分門別類，歡迎您盡情地參觀木樓音樂「聲」林！
        <v-divider class="mt-5" />
      </v-row>
      <v-row
        v-for="(video, index) in videos"
        :key="index"
        class="d-flex align-center"
      >
        <template v-if="index % 2 === 0">
          <v-col cols="6">
            <p class="pt-3 pb-5">{{ video.title }}</p>
            <iframe
              width="100%"
              height="315"
              :src="video.src"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </v-col>
          <v-col cols="6">
            <p v-html="video.info" class="text-center"></p>
          </v-col>
        </template>
        <template v-else>
          <v-col cols="6">
            <p v-html="video.info" class="text-center"></p>
          </v-col>
          <v-col cols="6">
            <p class="pt-3 pb-5 text-right">{{ video.title }}</p>
            <iframe
              width="100%"
              height="315"
              :src="video.src"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </v-col>
        </template>
        <v-divider class="mt-5 mb-5" />
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { definePage } from "vue-router/auto";
import { defineProps } from "vue";

definePage({
  meta: {
    title: "木樓合唱團 | 了解更多",
    login: false,
    admin: false,
  },
});

const props = defineProps({
  breakpoints: {
    type: Object,
    default: () => ({
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
    }),
  },
});

import Carousel from "@/components/carousel/carouselImage.vue";
// import review01 from "../assets/review/review01.jpg";
// import review02 from "../assets/review/review02.jpg";
import review03 from "../assets/review/review03.webp";
// import review04 from "../assets/review/review04.jpg";
import review05 from "../assets/review/review05.webp";
import review06 from "../assets/review/review06.webp";
import review07 from "../assets/review/review07.webp";
import review08 from "../assets/review/review08.webp";
import review09 from "../assets/review/review09.webp";
import review10 from "../assets/review/review10.webp";
import review11 from "../assets/review/review11.webp";
import DialogComponent from "@/components/dialog/dialog.vue";

const images = [
  // review01,
  // review02,
  review03,
  // review04,
  review05,
  review06,
  review07,
  review08,
  review09,
  review10,
  review11,
];

const videos = [
  {
    title: "〈如果明天就是下一生〉",
    src: "https://www.youtube.com/embed/t3HXDgy9itY?si=xy3h4u9P447KevWF",
    info: `木樓合唱團 2019 年度公演 <br />
          《樂綺當代‧璀璨二十》<br />
          <br />
          國家音樂廳 2019.6.9 <br />
          指　　揮: 彭孟賢<br />
          鋼　　琴: 王乃加<br />
          錄音工程: 王昭惠<br />`,
  },
  {
    title: "Fear Not, Dear Friend〈別害怕，親愛的朋友〉",
    src: "https://www.youtube.com/embed/e1QGblhrRNM?si=BTL3G1V4Z0f-taEw",
    info: `木樓合唱團 2019 年度公演 <br />
          《慶典－璀璨二十。木色》<br />
          <br />
          國家音樂廳 2019.12.14 <br />
          指　　揮: 彭孟賢<br />
          錄音工程: 王昭惠<br />`,
  },
  {
    title: "《慶典 - 璀璨二十。木色》幕後花絮",
    src: "https://www.youtube.com/embed/XSk4hVITaO0?si=1Lps3h2013M8bhZo",
    info: `木樓合唱團 <br />
          《慶典─璀璨二十。木色》幕後花絮<br />
          <br />
          國家音樂廳 2019.12.14 <br />
          指　　揮: 彭孟賢<br />
          鋼　　琴: 王乃加<br />
          <br />
          編　　輯: 鍾哲衡<br />
          攝　　影: 鍾哲衡、林明朗、陳漢<br />
          錄音工程: 王昭惠<br />
          拍攝團隊: 楊豐嘉、黃子玲、郭文賓、林志杰、王旭忠、朱文正<br />
          <br />
          ＊影片背景音樂選自木樓合唱團2019年度《樂綺當代．璀璨二十》音樂會現場錄音＊
          Les Marins de Kermor〈來自葛爾摩的水手〉<br />`,
  },
  {
    title: "〈綠光〉",
    src: "https://www.youtube.com/embed/wXy125yhYsM?si=x09Tw1-e-lNeaJKt",
    info: `木樓合唱團 2019 年度公演 <br />
          《樂綺當代‧璀璨二十》<br />
          <br />
          國家音樂廳 2019.6.9 <br />
          指　　揮: 彭孟賢<br />
          錄音工程: 王昭惠<br />`,
  },
];
</script>

<style scoped>
#bg {
  /* background: url(../assets/home/bg.jpg) no-repeat; */
  background-size: cover;
  background-attachment: fixed;
}
:deep(.carousel-image) {
  width: 100%;
  height: auto;
  transition: transform 0.3s ease;
}

:deep(.swiper-slide-active .carousel-image) {
  transform: scale(1.2); /* 調整中間圖片的放大比例 */
}
</style>
