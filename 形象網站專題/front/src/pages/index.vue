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
      <h2 class="text-center mb-8">
        「木樓」之名，源自於建國中學古老的木造音樂教室。<br />
        藉著歌唱，在各自的生命經歷裡找到相同的感動，也譜出一段段令人動容的音樂記憶。<br />
        這是木樓的精神根基，也是前進的動力。
      </h2>
      <v-container>
        <v-row>
          <v-col
            v-for="(image, index) in images"
            :key="index"
            :class="[
              'image-col',
              {
                expanded: activeIndex === index,
              },
            ]"
            @mouseover="expandImage(index)"
            @mouseleave="resetImages"
          >
            <router-link to="/introduce">
              <v-img :src="image.src" height="400" cover></v-img>
            </router-link>
          </v-col>
        </v-row>
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
          <v-col cols="5" class="shop">
            <router-link to="/shop/product">
              <v-img src="../assets/home/love.webp"></v-img>
            </router-link>
          </v-col>
          <v-col cols="5" class="shop">
            <router-link to="/shop/ticket">
              <v-img src="../assets/home/gototicket.jpg"></v-img>
            </router-link>
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
        <v-row>
          <v-col><v-img src="../assets/home/review.webp"></v-img></v-col>
          <v-col><v-img src="../assets/home/review.webp"></v-img></v-col>
          <v-col><v-img src="../assets/home/review.webp"></v-img></v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-main>
</template>

<script setup>
import { definePage } from "vue-router/auto";
import { ref } from "vue";
import pianist from "../assets/about/pianist.webp";
import choir from "../assets/home/bg.jpg";
import conductor from "../assets/about/conductor.png";

definePage({
  meta: {
    title: "木樓合唱團",
    login: false,
    admin: false,
  },
});
const images = [{ src: pianist }, { src: choir }, { src: conductor }];

const activeIndex = ref(null);
const expandImage = (index) => {
  activeIndex.value = index;
};
const resetImages = () => {
  activeIndex.value = null;
};
</script>

<style scoped>
#bg {
  background: url(../assets/home/home_bg.jpg) no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

/* about us */
.image-col {
  transition: 0.5s ease;
  cursor: pointer;
  border-radius: 5px;
}
.image-col.expanded {
  flex: 3 0 0;
}

/* our service */
.shop {
  margin: 0 30px;
  padding: 30px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease;
}
.shop:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.leader_text {
  text-shadow: #c8c8c8 1px 1px 0px, #b4b4b4 0px 2px 0px, #a0a0a0 0px 3px 0px,
    rgba(140, 140, 140, 0.498039) 0px 4px 0px, #787878 0px 0px 0px,
    rgba(0, 0, 0, 0.498039) 0px 5px 10px;
  font-weight: normal;
}
</style>
