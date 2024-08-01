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
          v-model="tableSearch"
          append-icon="mdi-magnify"
          @click:append="tableLoadItems(true)"
          @keydown.enter="tableLoadItems(true)"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-expansion-panels>
          <v-expansion-panel
            v-for="item in tableItems"
            :key="item._id"
            class="mb-2"
          >
            <v-expansion-panel-header>
              {{ item.name }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="12">
                  <strong>位置:</strong> {{ item.location }}
                </v-col>
                <v-col cols="12">
                  <strong>日期:</strong> {{ formatDate(item.date) }}
                </v-col>
                <v-col cols="12">
                  <strong>描述:</strong> {{ item.description }}
                </v-col>
                <v-col cols="12" class="text-right">
                  <v-btn
                    icon="mdi-pencil"
                    variant="text"
                    color="blue"
                    @click="openDialog(item)"
                  ></v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog.open" persistent width="500">
    <v-form @submit.prevent="submit" :disabled="isSubmitting">
      <v-card>
        <v-card-title>{{ dialog.id ? "編輯場次" : "新增場次" }}</v-card-title>
        <v-card-text>
          <v-text-field
            label="名稱"
            v-model="name.value.value"
            :error-messages="name.errorMessage.value"
          ></v-text-field>
          <v-text-field
            label="位置"
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
        </v-card-text>
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
</template>

<script setup>
import { definePage } from "vue-router/auto";
import { ref } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useApi } from "@/composables/axios";
import { useSnackbar } from "vuetify-use-dialog";

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
    tableLoadItems(true);
  } catch (error) {
    createSnackbar({
      text: error?.response?.data?.message || "發生錯誤",
      snackbarProps: { color: "red" },
    });
  }
});

const tableItems = ref([]);
const tableSearch = ref("");
const tableLoading = ref(true);
const tableLoadItems = async (reset) => {
  tableLoading.value = true;
  try {
    const { data } = await apiAuth.get("/session", {
      params: {
        search: tableSearch.value,
      },
    });
    tableItems.value = data.result.data;
  } catch (error) {
    createSnackbar({
      text: error?.response?.data?.message || "發生錯誤",
      snackbarProps: { color: "red" },
    });
  }
  tableLoading.value = false;
};

tableLoadItems();
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
