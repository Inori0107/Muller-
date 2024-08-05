<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">售票資訊</h1>
      </v-col>
      <v-col cols="12" v-if="tickets.length">
        <v-row v-for="ticket in tickets" :key="ticket._id" class="mb-4">
          <v-col cols="12">
            <v-card>
              <v-card-title>{{ ticket.name }}</v-card-title>
              <v-card-subtitle>{{ ticket.price }} TWD</v-card-subtitle>
              <v-card-text>
                <p>{{ ticket.seat_info }}</p>
                <p>系列：{{ ticket.s_id.name }}</p>
                <p>地點：{{ ticket.s_id.location }}</p>
                <p>
                  日期：{{ new Date(ticket.s_id.date).toLocaleDateString() }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" v-else>
        <v-alert type="info">正在加載門票數據...</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useApi } from "@/composables/axios";
import { useSnackbar } from "vuetify-use-dialog";

const { api } = useApi();
const createSnackbar = useSnackbar();

const tickets = ref([]);
const props = defineProps({
  sessionId: {
    type: String,
    required: true,
  },
});

const fetchTicketsBySessionId = async (sessionId) => {
  try {
    const { data } = await api.get("/ticket", {
      params: { s_id: props.sessionId },
    });
    tickets.value = data.result;
  } catch (error) {
    createSnackbar({
      text: error?.response?.data?.message || "發生錯誤",
      snackbarProps: { color: "red" },
    });
  }
};
watch(
  () => props.sessionId,
  () => {
    fetchTicketsBySessionId();
  },
  { immediate: true }
);
</script>
