<template>
  <!-- Navigation Drawer -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="top"
    class="nav h-100"
  >
    <v-row justify="center" no-gutters>
      <v-col class="ps-7 pt-5 position-absolute">
        <v-btn variant icon @click="drawer = false" style="font-size: 24px">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-col>
      <v-col v-for="section in menu" :key="section.name" cols="3" class="pt-16">
        <v-list class="mt-16 pt-16">
          <v-list-item
            v-for="item in section.items"
            :key="item.text"
            :to="item.to"
            link
            class="list"
          >
            <v-list-item-content>
              <v-list-item-title class="text-center" style="font-size: 1.5rem"
                ><b>{{ item.text }}</b></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-navigation-drawer>
  <!-- Header -->
  <v-app-bar id="app-bar" flat height="100%">
    <v-btn icon @click="drawer = !drawer" style="font-size: 24px">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <div id="logo">
      <v-img
        src="../assets/LOGO/logo01.webp"
        @click="$router.push('/')"
      ></v-img>
    </div>
    <v-spacer></v-spacer>
    <div>
      <MemberDialog ref="MemberDialogRef" />
      <v-btn
        v-for="(button, index) in buttons"
        :key="index"
        icon
        @click="handleClick(button.route)"
        v-show="button.showCondition"
      >
        <v-icon>{{ button.icon }}</v-icon>
        <component :is="button.component" v-if="button.component"></component>
      </v-btn>
    </div>
  </v-app-bar>
  <!-- Main content -->
  <router-view />
  <!-- Footer -->
  <v-footer id="footer">
    <v-container>
      <v-row class="text-center">
        <v-col lg="3" cols="12">
          <h2>木樓合唱團</h2>
          <p>Müller Chamber Choir</p>
          <p>為台灣男聲合唱加油</p>
          <div class="mt-2">
            <v-btn icon><v-icon size="x-large">mdi-facebook</v-icon></v-btn>
            <v-btn icon><v-icon size="x-large">mdi-instagram</v-icon></v-btn>
            <v-btn icon><v-icon size="x-large">mdi-youtube</v-icon></v-btn>
          </div>
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
          <p><i>Add /</i> 106001臺北市大安區杭州南路</p>
          <p><i>Email /</i> muller@muller.org.tw</p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useSnackbar } from "vuetify-use-dialog";
import MemberDialog from "@/components/dialog/dialogMember.vue";

// 抽屜狀態
const drawer = ref(false);

// 使用者商店
const user = useUserStore();
const router = useRouter();
const route = useRoute();
const createSnackbar = useSnackbar();
const MemberDialogRef = ref(null);

// 按鈕資料
const buttons = computed(() => [
  { icon: "mdi-account-cog", route: "/admin", showCondition: user.isAdmin },
  { icon: "mdi-cart", route: "/shop/cart", showCondition: user.isLogin },
  { icon: "mdi-clipboard", route: "/member", showCondition: user.isLogin },
  {
    icon: "mdi-account-arrow-right",
    route: "/logout",
    showCondition: user.isLogin,
  },
]);

// 導航選單
const menu = [
  {
    name: "關於我們",
    items: [
      { text: "認識木樓", to: "/introduce" },
      { text: "指揮介紹", to: "/introduce" },
      { text: "鋼琴合作", to: "/introduce" },
    ],
  },
  {
    name: "了解更多",
    items: [
      { text: "演出回顧", to: "/information" },
      { text: "影音出版", to: "/information" },
      { text: "合作聯繫", to: "/information" },
    ],
  },
  {
    name: "服務專區",
    items: [
      { text: "出版專輯", to: "/shop/product" },
      { text: "訂票查詢", to: "/shop/ticket", requiresAuth: true },
      { text: "會員專區", to: "/member", requiresAuth: true },
    ],
  },
];

// 功能按鈕點擊處理
const handleClick = (route) => {
  if (route === "/logout") {
    logout();
  } else {
    router.push(route);
  }
};

// 登出處理
const logout = async () => {
  await user.logout();
  createSnackbar({
    text: "登出成功",
    snackbarProps: { color: "green" },
  });
};

watch(
  () => route.query.login,
  (login) => {
    if (login) {
      MemberDialogRef.value.isActive = true;
      router.replace({ query: {} });
    }
  }
);
</script>

<style lang="scss">
@import "../styles/settings.scss";
.nav {
  background: url("../assets/home/nav_bg.png") no-repeat center top,
    radial-gradient(circle, rgba(245, 245, 245, 0.9), rgba(245, 245, 245, 0.7));
  backdrop-filter: blur(15px);
  background-size: cover;
}

.list {
  min-width: 100px;
  height: 100px;
  background: rgba(255, 255, 255); /* 與上傳圖片顏色相近 */
  margin: 100px 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加柔邊陰影效果 */
  opacity: 0.8;
  &:hover {
    background: rgba(230, 230, 230); /* 懸停時背景顏色變化 */
  }
}

#app-bar {
  background: rgba(236, 236, 236, 0.5);
  backdrop-filter: blur(10px);
  padding: 0 24px;
}
#logo {
  height: 100%;
  width: 200px;
  cursor: pointer;
  padding: 8px 0;
}
#footer {
  background: lighten($third-color, 5%);
  padding: 24px 0;
}
.links {
  a {
    font-size: 1.2rem;
    color: black;
    text-decoration: none;
    &:hover {
      color: #f0f0f0;
      transition: color 0.3s ease;
      text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 增加陰影效果 */
    }
  }
}
</style>
