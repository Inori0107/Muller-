<template>
  <!-- Navigation Drawer -->
  <v-navigation-drawer v-model="drawer" temporary location="top">
    <v-container>
      <v-row>
        <v-col v-for="section in menu" :key="section.name" cols="4">
          <!-- <v-subheader>{{ section.name }}</v-subheader> -->
          <v-list>
            <v-list-item
              v-for="item in section.items"
              :key="item.text"
              :to="item.to"
              link
            >
              <v-list-item-content>
                <v-list-item-title class="text-center">{{
                  item.text
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
  <!-- Header -->
  <v-app-bar id="app-bar">
    <v-btn icon @click="drawer = !drawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-img src="../assets/LOGO/logo01.webp" @click="$router.push('/')"></v-img>
    <v-spacer></v-spacer>
    <v-btn>首頁</v-btn>
    <v-btn>關於我們</v-btn>
    <v-btn>服務</v-btn>
    <v-btn>聯繫我們</v-btn>
  </v-app-bar>
  <!-- Main Content -->
    <router-view />
  <v-footer id="footer">
    <v-container>
      <v-row class="text-center">
        <v-col lg="2" cols="12">
          <h2>木樓合唱團</h2>
          <p>Müller Chamber Choir</p>
          <p>為台灣男聲合唱加油</p>
          <p></p>
        </v-col>
        <v-col v-for="category in menu" :key="category.name" lg="2">
          <h2>{{ category.name }}</h2>
          <div v-for="item in category.items" :key="item.text" class="links">
            <router-link :to="item.to">{{ item.text }}</router-link>
          </div>
        </v-col>
        <v-col class="address text-lg-right" lg="3" cols="12">
          <p>服務專線</p>
          <h2>+886-2-2365-8943</h2>
          <p><i>Fax /</i> +886-2-2341-2340</p>
          <p><i>Add /</i> 106001臺北市大安區杭州南路二段7-1號B1F</p>
          <p><i>Email /</i> muller@muller.org.tw</p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
const menu = [
  {
    name: "introduce",
    items: [
      { text: "認識木樓", to: "/introduce" },
      { text: "指揮介紹", to: "/introduce" },
      { text: "鋼琴合作", to: "/introduce" },
    ],
  },
  {
    name: "information",
    items: [
      { text: "演出回顧", to: "/information" },
      { text: "影音出版", to: "/information" },
      { text: "合作聯繫", to: "/information" },
    ],
  },
  {
    name: "shop",
    items: [
      { text: "會員登入", to: "/member" },
      { text: "出版專輯", to: "/shop/product" },
      { text: "訂票查詢", to: "/shop/ticket" },
    ],
  },
];
const drawer = ref(false);
</script>

<style lang="scss">
@import "../styles/settings.scss";
#app-bar {
  background: lighten($second-color, 5%);
}
#footer {
  background: lighten($third-color, 5%);
}
.links {
  a {
    color: black;
    text-decoration: none;
    &:hover {
      color: $first-color;
    }
  }
}
</style>
