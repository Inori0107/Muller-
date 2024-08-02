<template>
  <v-app-bar app id="app-bar" flat>
    <v-btn icon v-if="!drawer" @click="drawer = !drawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <div style="height: 100%; width: 200px" @click="$router.push('/')">
      <v-img src="../assets/LOGO/logo01.webp"></v-img>
    </div>
    <v-spacer></v-spacer>
    <h2 class="pe-8">管理員後台</h2>
  </v-app-bar>

  <v-navigation-drawer app class="mt-2" v-model="drawer">
    <v-list dense>
      <v-list-item
        v-for="(item, index) in menuItems"
        :key="index"
        :link="true"
        :to="item.link"
        class="text-center pa-8"
      >
        <v-list-item-content>
          <v-icon :size="item.size">{{ item.icon }}</v-icon>
          <h3>{{ item.title }}</h3>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { ref } from "vue";

const drawer = ref(true);

const menuItems = ref([
  {
    title: "活動管理",
    icon: "mdi-calendar-clock",
    link: "/admin",
    size: "32px",
  },
  {
    title: "票務管理",
    icon: "mdi-ticket",
    link: "/admin/sessionManage",
    size: "32px",
  },
  {
    title: "專輯管理",
    icon: "mdi-shopping",
    link: "/admin/albumManage",
    size: "32px",
  },
  {
    title: "樂譜管理",
    icon: "mdi-shopping",
    link: "/admin/sheetManage",
    size: "32px",
  },
  {
    title: "訂單管理",
    icon: "mdi-cart",
    link: "/admin/orderManage",
    size: "32px",
  },
]);
</script>

<style scoped lang="scss">
@import "../styles/settings.scss";
#app-bar {
  background: lighten($second-color, 3%);
  backdrop-filter: blur(10px);
  padding: 8px 32px;
}
</style>
