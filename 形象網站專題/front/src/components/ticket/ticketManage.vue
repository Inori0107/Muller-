<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn color="green" @click.stop="openDialog(null)">新增門票</v-btn>
      </v-col>
      <v-row>
        <v-col
          v-for="item in tableItems"
          :key="item._id"
          class="mb-4"
          no-gutters
        >
          <v-card>
            <v-row class="pa-4">
              <v-card-title>{{ item.name }}</v-card-title>
              <v-card-title>{{ item.price }}</v-card-title>
              <v-card-actions>
                <v-btn
                  icon="mdi-pencil"
                  variant="text"
                  color="blue"
                  @click.stop="openDialog(item)"
                ></v-btn>
              </v-card-actions>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
    <v-dialog v-model="dialog.open" persistent width="500">
      <v-form @submit.prevent="submit" :disabled="isSubmitting">
        <v-card>
          <v-card-title>{{ dialog.id ? "編輯門票" : "新增門票" }}</v-card-title>
          <v-card-text>
            <v-text-field
              label="名稱"
              v-model="name.value.value"
              :error-messages="name.errorMessage.value"
            ></v-text-field>
            <v-text-field
              label="價格"
              type="number"
              min="0"
              v-model="price.value.value"
              :error-messages="price.errorMessage.value"
            ></v-text-field>
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
  </v-container>
</template>

<script setup>
import { ref, watch } from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useApi } from "@/composables/axios";
import { useSnackbar } from "vuetify-use-dialog";

const { apiAuth } = useApi();
const createSnackbar = useSnackbar();

const props = defineProps({
  sessionId: {
    type: String,
    required: true,
  },
});

const dialog = ref({
  open: false,
  id: "",
});

const openDialog = (item) => {
  if (item) {
    dialog.value.id = item._id;
    name.value.value = item.name;
    price.value.value = item.price;
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
  name: yup.string().required("票券名稱必填"),
  price: yup
    .number()
    .typeError("票券價格格式錯誤")
    .required("票券價格必填")
    .min(0, "票券價格不能小於 0"),
});
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: "",
    price: 0,
  },
});
const name = useField("name");
const price = useField("price");

const submit = handleSubmit(async (values) => {
  try {
    const payload = {
      name: values.name,
      price: values.price,
      s_id: props.sessionId, // 將場次ID加入門票數據
    };

    if (dialog.value.id === "") {
      await apiAuth.post("/ticket", payload);
    } else {
      await apiAuth.patch(`/ticket/${dialog.value.id}`, payload);
    }

    createSnackbar({
      text: dialog.value.id === "" ? "新增成功" : "編輯成功",
      snackbarProps: { color: "green" },
    });
    closeDialog();
    tableLoadItems();
  } catch (error) {
    createSnackbar({
      text: error?.response?.data?.message || "發生錯誤",
      snackbarProps: { color: "red" },
    });
  }
});

const tableItems = ref([]);
const tableLoadItems = async () => {
  try {
    const { data } = await apiAuth.get("/ticket/all", {
      params: {
        s_id: props.sessionId,
      },
    });
    tableItems.value = data.result.data;
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
    tableLoadItems();
  },
  { immediate: true }
);
</script>
