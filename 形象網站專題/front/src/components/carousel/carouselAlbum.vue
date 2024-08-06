<template>
  <v-container>
    <h1 class="text-center ma-10 text-white">專輯</h1>
    <v-row class="mt-16">
      <v-col cols="6" md="3" v-for="product in products" :key="product._id">
        <v-card>
          <v-img :src="product.image"></v-img>
          <v-card-title class="card-title">
            {{ product.name }}
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :to="'/shop/products/' + product._id">查看詳情</v-btn
            ><v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref } from "vue";
import { definePage } from "vue-router/auto";
import { useApi } from "@/composables/axios";
import { useSnackbar } from "vuetify-use-dialog";

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
        category: "專輯",
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
.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}
</style>
