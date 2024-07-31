<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" class="d-flex align-center justify-center">
        <h2 class="album-title">專輯</h2>
      </v-col>
      <v-col cols="12" md="8">
        <swiper
          :modules="modules"
          :slides-per-view="2"
          :spaceBetween="30"
          :loop="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
        >
          <swiper-slide v-for="product in products" :key="product._id">
            <v-col cols="12">
              <v-card class="rounded-xl album-card">
                <v-img
                  :src="product.image"
                  class="overflow-hidden"
                  height="100%"
                ></v-img>
                <v-card-title class="card-title">
                  <router-link :to="'/shop/products/' + product._id">
                    {{ product.name }}
                  </router-link>
                </v-card-title>
                <!-- <v-card-text>{{ product.description }}</v-card-text> -->
              </v-card>
            </v-col>
          </swiper-slide>
        </swiper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { definePage } from "vue-router/auto";
import { useApi } from "@/composables/axios";
import { useSnackbar } from "vuetify-use-dialog";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
// import { Autoplay } from "swiper/modules";
// const modules = [Autoplay];

definePage({
  meta: {
    title: "購物網",
    login: false,
    admin: false,
  },
});

const { api } = useApi();
const createSnackbar = useSnackbar();

const page = ref(1);
const pages = ref(1);
const ITEMS_PER_PAGE = 20;

const products = ref([]);

const loadProducts = async () => {
  try {
    const { data } = await api.get("/product", {
      params: {
        itemsPerPage: ITEMS_PER_PAGE,
        page: page.value,
        category: "樂譜",
      },
    });
    console.log("Fetched data:", data); // 檢查抓取的資料
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
loadProducts();
</script>

<style scoped>
.album-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 10px;
}

.album-card {
  transition: transform 0.2s ease-in-out;
  border-bottom: 1px solid #f5f5f5;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  padding: 0.5rem;
  border-top: 2px solid #f5f5f5;
}

.card-title a {
  color: inherit;
  text-decoration: none;
}

.card-title a:hover {
  text-decoration: underline;
}
</style>
