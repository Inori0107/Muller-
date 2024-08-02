<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">購物網</h1>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ ticket.name }}</v-card-title>
          <v-card-subtitle>{{ ticket.price }} TWD</v-card-subtitle>
          <v-card-text>
            <p>{{ ticket.description }}</p>
            <p>系列：{{ ticket.s_id.name }}</p>
            <p>地點：{{ ticket.s_id.location }}</p>
            <p>日期：{{ ticket.s_id.date }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useApi } from "@/composables/axios";
import { useSnackbar } from "vuetify-use-dialog";

const { api } = useApi();
const createSnackbar = useSnackbar();
const route = useRoute();

const ticket = ref(null);

const load = async () => {
  try {
    console.log(data);
    const { data } = await api.get(`/ticket`);
    ticket.value = data.result;
  } catch (error) {
    createSnackbar({
      text: error?.response?.data?.message || "發生錯誤",
      snackbarProps: {
        color: "red",
      },
    });
  }
};
load();
</script>
