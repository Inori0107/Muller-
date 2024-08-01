<template>
  <v-sheet class="pt-16">
    <v-container>
      <v-row class="product-container">
        <v-col cols="12" class="text-center">
          <h1 class="product-title">{{ product.name }}</h1>
        </v-col>
        <v-col cols="12" class="text-center">
          <v-img
            :src="product.image"
            class="product-image"
            height="400"
          ></v-img>
        </v-col>
        <v-col cols="12" class="text-center">
          <p class="product-price">${{ product.price }}</p>
          <p class="product-description">{{ product.description }}</p>
        </v-col>
        <v-col cols="12" v-if="product.song.length > 0">
          <v-card class="product-songs">
            <v-card-title>歌曲列表</v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  cols="12"
                  v-for="(song, index) in product.song"
                  :key="index"
                >
                  <v-card class="song-card">
                    <v-card-text>{{ song }}</v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" class="text-center">
          <v-form
            class="order-form"
            :disabled="isSubmitting"
            @submit.prevent="submit"
          >
            <v-text-field
              type="number"
              v-model.number="quantity.value"
              :error-messages="quantity.errorMessage"
              label="數量"
              class="order-quantity"
            ></v-text-field>
            <v-btn
              type="submit"
              prepend-icon="mdi-cart"
              :loading="isSubmitting"
              class="order-button"
            >
              加入購物車
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
      <v-overlay
        class="align-center justify-center text-center"
        :model-value="!product.sell"
        persistent
      >
        <h1 class="text-red">已下架</h1>
        <v-btn to="/" class="return-button">回首頁</v-btn>
      </v-overlay>
    </v-container>
  </v-sheet>
</template>

<script setup>
import { ref } from "vue";
import { definePage } from "vue-router/auto";
import { useRoute, useRouter } from "vue-router";
import { useApi } from "@/composables/axios";
import { useSnackbar } from "vuetify-use-dialog";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useUserStore } from "@/stores/user";

definePage({
  meta: {
    title: "購物網 | 商品",
    login: false,
    admin: false,
  },
});

const { api } = useApi();
const route = useRoute();
const router = useRouter();
const createSnackbar = useSnackbar();
const user = useUserStore();

const product = ref({
  _id: "",
  name: "",
  price: 0,
  description: "",
  image: "",
  sell: true,
  category: "",
  song: [],
});

const load = async () => {
  try {
    const { data } = await api.get("/product/" + route.params.id);
    Object.assign(product.value, data.result);
    document.title = "購物網 | " + product.value.name;
  } catch (error) {
    createSnackbar({
      text: error?.response?.data?.message || "發生錯誤",
      snackbarProps: { color: "red" },
    });
  }
};
load();

const addToCart = async (product, quantity) => {
  if (!user.isLogin) {
    router.push("/login");
    return;
  }
  try {
    const result = await user.addCart_P(product, quantity);
    createSnackbar({
      text: result.text,
      snackbarProps: { color: result.color },
    });
  } catch (error) {
    createSnackbar({ text: "加入購物車失敗", snackbarProps: { color: "red" } });
  }
};

const schema = yup.object({
  quantity: yup
    .number()
    .typeError("數量必填")
    .required("數量必填")
    .min(1, "最少為 1"),
});

const { isSubmitting, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: { quantity: 1 },
});
const quantity = useField("quantity");

const submit = handleSubmit(async (values) => {
  addToCart(product.value._id, values.quantity);
});
</script>

<style scoped>
.product-container {
  max-width: 800px;
  margin: auto;
  padding: 2rem 0;
}
.product-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
.product-image {
  border-radius: 10px;
  margin-bottom: 1.5rem;
}
.product-price {
  font-size: 1.8rem;
  color: #ff5722;
  margin-bottom: 0.5rem;
}
.product-description {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}
.product-songs {
  margin-bottom: 1.5rem;
}
.song-card {
  margin-bottom: 0.5rem;
}
.order-form {
  max-width: 400px;
  margin: auto;
}
.order-quantity {
  margin-bottom: 1rem;
}
.order-button {
  background-color: #1976d2;
  color: white;
}
.return-button {
  background-color: #ff5722;
  color: white;
}
</style>
