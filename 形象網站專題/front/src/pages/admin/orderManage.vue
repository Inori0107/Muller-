<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">訂單管理</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-data-table :items="items" :headers="headers">
          <template #item.cart_P="{ item }">
            <ul>
              <li v-for="product in item.cart_P" :key="product._id">
                {{ product.p_id.name }} * {{ product.quantity }}
              </li>
            </ul>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { definePage } from "vue-router/auto";
import { ref, onMounted } from "vue";
import { useApi } from "@/composables/axios";
import { useSnackbar } from "vuetify-use-dialog";

definePage({
  meta: {
    title: "木樓合唱團 | 訂單管理",
    login: true,
    admin: true,
  },
});

const { apiAuth } = useApi();
const createSnackbar = useSnackbar();

const items = ref([]);
const headers = [
  { title: "編號", key: "_id" },
  { title: "帳號", key: "user.account" },
  {
    title: "日期",
    key: "createdAt",
    value: (item) => new Date(item.createdAt).toLocaleString(),
  },
  { title: "商品", key: "cart_P", sortable: false },
  {
    title: "金額",
    key: "price",
    value: (item) => {
      return item.cart_P.reduce((total, current) => {
        return total + current.quantity * current.p_id.price;
      }, 0);
    },
  },
];

const loadItems = async () => {
  try {
    const { data } = await apiAuth.get("/order/product/all");
    items.value = data.result;
    console.log(items.value);
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

onMounted(loadItems);
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
