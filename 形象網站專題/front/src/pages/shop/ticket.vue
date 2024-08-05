<template>
  <v-main id="bg">
    <v-sheet class="pt-16">
      <v-container class="mt-8">
        <v-img src="../../assets/home/ticket_bg.webp"></v-img>
      </v-container>
    </v-sheet>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-center">場次列表</h1>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="4" v-for="session in sessions" :key="session._id">
              <v-card @click="openTicketManagement(session._id)">
                <v-card-title>{{ session.name }}</v-card-title>
                <v-card-subtitle>{{ session.location }}</v-card-subtitle>
                <v-card-subtitle>{{
                  formatDate(session.date)
                }}</v-card-subtitle>
                <v-card-text>{{ session.description }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div style="width: 300px">
            <SeatMap />
          </div>
        </v-col>
        <v-col>
          <TicketManage v-if="selectedSessionId" :sessionId="selectedSessionId"
        /></v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref } from "vue";
import { useApi } from "@/composables/axios";
import { useSnackbar } from "vuetify-use-dialog";
import TicketManage from "@/components/ticket/tickets.vue";
import SeatMap from "@/components/ticket/seatmap.vue"; // 導入新元件

const { api } = useApi();
const createSnackbar = useSnackbar();

const selectedSessionId = ref(null);
const sessions = ref([]);

const formatDate = (dateString) => {
  return new Date(dateString).toISOString().split("T")[0];
};

const loadSessions = async () => {
  try {
    const { data } = await api.get("/session");
    sessions.value = data.result.data;
  } catch (error) {
    createSnackbar({
      text: error?.response?.data?.message || "發生錯誤",
      snackbarProps: {
        color: "red",
      },
    });
  }
};

const openTicketManagement = (sessionId) => {
  selectedSessionId.value = sessionId;
};

loadSessions();
</script>

<style scoped>
#bg {
  background: url(../../assets/album/ourServices.png) no-repeat center;
  background-size: cover;
  background-attachment: fixed;
}
</style>
