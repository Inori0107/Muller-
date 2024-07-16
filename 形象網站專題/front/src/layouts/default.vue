<template>
  <v-app>
    <v-app-bar id="app-bar">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-subheader>Menu</v-subheader>
        <v-list-group v-for="category in menu" :key="category.name" :value="true">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ category.name }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="item in category.items" :key="item.text" :to="item.to">
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
      <v-img src="../assets/logo01.webp"></v-img>
      <v-btn prepend-icon="mdi-account-arrow-left">登入</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
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
          <v-col class="address" lg="3" cols="12">
            <p>服務專線</p>
            <h2>+886-2-2365-8943</h2>
            <p><i>Fax /</i> +886-2-2341-2340</p>
            <p><i>Add /</i> 106001臺北市大安區杭州南路二段7-1號B1F</p>
            <p><i>Email /</i> muller@muller.org.tw</p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
const menu = [
  {
    name: 'introduce',
    items: [
      { text: '認識木樓', to: '/introduce' },
      { text: '指揮介紹', to: '/introduce' },
      { text: '鋼琴合作', to: '/introduce' }
    ]
  },
  {
    name: 'information',
    items: [
      { text: '演出回顧', to: '/information' },
      { text: '影音出版', to: '/information' },
      { text: '合作聯繫', to: '/information' }
    ]
  },
  {
    name: 'shop',
    items: [
      { text: '會員登入', to: '/shop' },
      { text: '出版專輯', to: '/shop' },
      { text: '訂票查詢', to: '/shop' }
    ]
  }
]
</script>

<style lang="scss">
@import '../styles/settings.scss';
#app-bar{
  background:lighten($second-color, 5%)
}
#footer{
  background: lighten($third-color, 5%);
}
.links{
  a{
    color: black;
    text-decoration: none;
    &:hover{
      color:$first-color;
    }
  }
}

.address{
  text-align: center;
  @include lg{
    text-align: right;
  }
}
</style>