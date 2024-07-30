<template>
  <v-container>
    <v-row>
      <v-col cols="4">專輯</v-col>
      <v-col cols="8"
        ><swiper :slides-per-view="2" :spaceBetween="30" :loop="true">
          <swiper-slide v-for="product in products" :key="product._id">
            <v-col cols="12">
              <v-card class="elevation-3 rounded-lg mb-4">
                <v-img :src="product.image" class="rounded-t-lg"></v-img>
                <v-card-title>
                  <router-link :to="'/shop/products/' + product._id">
                    {{ product.name }}
                  </router-link>
                </v-card-title>
                <!-- <v-card-text>{{ product.description }}</v-card-text> -->
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    prepend-icon="mdi-cart"
                    @click="addCart"
                    :loading="loading"
                    class="text-none"
                  >
                    加入購物車
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </swiper-slide>
        </swiper></v-col
      >
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { definePage } from "vue-router/auto";
import { useApi } from "@/composables/axios";
import { useSnackbar } from "vuetify-use-dialog";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";

definePage({
  meta: {
    title: "購物網",
    login: false,
    admin: false,
  },
});

const { api } = useApi();
const createSnackbar = useSnackbar();
const user = useUserStore();
const router = useRouter();

const page = ref(1);
const pages = ref(1);
const ITEMS_PER_PAGE = 20;

const products = ref([]);
const loading = ref(false);

const loadProducts = async () => {
  try {
    const { data } = await api.get("/product", {
      params: {
        itemsPerPage: ITEMS_PER_PAGE,
        page: page.value,
        category: "專輯",
      },
    });
    console.log("Fetched data:", data); // 在這裡添加 console.log 來檢查抓取的資料
    pages.value = Math.ceil(data.result.total / ITEMS_PER_PAGE);
    products.value.splice(0, products.value.length, ...data.result.data);
    console.log("total:", products.value);
  } catch (error) {
    console.log(error);
    createSnackbar({
      text: error?.response?.data?.message || "發生錯誤",
      snackbarProps: {
        color: "red",
      },
    });
  }
};

const addCart = async (product) => {
  if (!user.isLogin) {
    router.push("/login");
    return;
  }
  loading.value = true;
  const result = await user.addCart_P(product, 1);
  createSnackbar({
    text: result.text,
    snackbarProps: {
      color: result.color,
    },
  });
  loading.value = false;
};

loadProducts();
console.log(products);
</script>

<style scoped></style>
