<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">場次管理</h1>
      </v-col>
      <v-col cols="12">
        <v-btn color="green" @click="openDialog(null)">新增場次</v-btn>
      </v-col>
      <v-col cols="12">
        <v-text-field
          label="搜尋"
          v-model="search"
          append-icon="mdi-magnify"
          @click:append="loadItems(true)"
          @keydown.enter="loadItems(true)"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="text-center mb-2">
      <v-col cols="3">
        <strong>系列名稱</strong>
      </v-col>
      <v-col cols="2">
        <strong>地點</strong>
      </v-col>
      <v-col cols="2">
        <strong>時間</strong>
      </v-col>
      <v-col cols="3">
        <strong>描述</strong>
      </v-col>
      <v-col cols="1">
        <strong>編輯</strong>
      </v-col>
    </v-row>
    <v-divider class="mx-6"></v-divider>
    <v-row>
      <v-col cols="12">
        <v-list>
          <v-list-group
            v-for="(item, index) in items"
            :key="item._id"
            :value="item.expanded"
            @click="toggleItem(index)"
          >
            <template v-slot:activator>
              <v-list-item class="text-center">
                <v-row align="center">
                  <v-col cols="3">
                    <v-list-item-content>
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item-content>
                  </v-col>
                  <v-col cols="2">
                    <v-list-item-content>
                      <v-list-item-subtitle>{{
                        item.location
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-col>
                  <v-col cols="2">
                    <v-list-item-content>
                      <v-list-item-subtitle>{{
                        formatDate(item.date)
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-col>
                  <v-col cols="3">
                    <v-list-item-content>
                      <v-list-item-subtitle>{{
                        item.description
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-col>
                  <v-col cols="1">
                    <v-list-item-action>
                      <v-btn
                        icon
                        variant="text"
                        color="blue"
                        @click.stop="editItem(item, index)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-col>
                </v-row>
              </v-list-item>
              <v-list-item v-if="item.expanded">
                <v-list-item-content>
                  <TicketManagement :sessionId="item._id" />
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-group>
        </v-list>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog.open" persistent width="500">
      <v-form @submit.prevent="submit" :disabled="isSubmitting">
        <v-card>
          <v-card-title>{{ dialog.id ? "編輯場次" : "新增場次" }}</v-card-title>
          <v-text-field
            label="名稱"
            v-model="name.value.value"
            :error-messages="name.errorMessage.value"
          ></v-text-field>
          <v-text-field
            label="地點"
            v-model="location.value.value"
            :error-messages="location.errorMessage.value"
          ></v-text-field>
          <v-text-field
            label="日期"
            type="date"
            v-model="date.value.value"
            :error-messages="date.errorMessage.value"
          ></v-text-field>
          <v-textarea
            label="描述"
            v-model="description.value.value"
            :error-messages="description.errorMessage.value"
          ></v-textarea>
          <v-card-actions>
            <v-btn color="red" :loading="isSubmitting" @click="closeDialog"
              >取消</v-btn
            >
            <v-btn color="green" type="submit" :loading="isSubmitting"
              >送出</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { definePage } from "vue-router/auto";
import { ref } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useApi } from "@/composables/axios";
import { useSnackbar } from "vuetify-use-dialog";
import TicketManagement from "@/components/ticket/ticketManage.vue"; // 引入 TicketManagement 組件

definePage({
  meta: {
    title: "木樓合唱團 | 票務管理",
    login: true,
    admin: true,
  },
});

const { apiAuth } = useApi();
const createSnackbar = useSnackbar();

const dialog = ref({ open: false, id: "" });

const openDialog = (item) => {
  if (item) {
    dialog.value.id = item._id;
    name.value.value = item.name;
    location.value.value = item.location;
    date.value.value = formatDate(item.date);
    description.value.value = item.description;
  } else {
    dialog.value.id = "";
    resetForm();
  }
  dialog.value.open = true;
};

const closeDialog = () => {
  dialog.value.open = false;
  resetForm();
};

const schema = yup.object({
  name: yup.string().required("場次名稱必填"),
  location: yup.string().required("場次位置必填"),
  date: yup.date().required("場次日期必填"),
  description: yup.string().required("場次描述必填"),
});

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: "",
    location: "",
    date: "",
    description: "",
  },
});

const name = useField("name");
const location = useField("location");
const date = useField("date");
const description = useField("description");

const formatDate = (dateString) => {
  return new Date(dateString).toISOString().split("T")[0];
};

const submit = handleSubmit(async (values) => {
  try {
    const payload = {
      name: values.name,
      location: values.location,
      date: values.date,
      description: values.description,
    };

    if (dialog.value.id === "") {
      await apiAuth.post("/session", payload);
    } else {
      await apiAuth.patch(`/session/${dialog.value.id}`, payload);
    }

    createSnackbar({
      text: dialog.value.id === "" ? "新增成功" : "編輯成功",
      snackbarProps: { color: "green" },
    });
    closeDialog();
    loadItems(true);
  } catch (error) {
    createSnackbar({
      text: error?.response?.data?.message || "發生錯誤",
      snackbarProps: { color: "red" },
    });
  }
});

const items = ref([]);
const search = ref("");
const loading = ref(true);
const loadItems = async (reset) => {
  loading.value = true;
  try {
    const { data } = await apiAuth.get("/session", {
      params: {
        search: search.value,
      },
    });
    items.value = data.result.data;
  } catch (error) {
    createSnackbar({
      text: error?.response?.data?.message || "發生錯誤",
      snackbarProps: { color: "red" },
    });
  }
  loading.value = false;
};

const toggleItem = (index) => {
  items.value[index].expanded = !items.value[index].expanded;
};

const addItem = () => {
  openDialog(null);
};

const editItem = (item) => {
  openDialog(item);
};

loadItems();
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
