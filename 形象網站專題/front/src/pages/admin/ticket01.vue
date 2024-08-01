<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">票券管理</h1>
      </v-col>
      <v-col cols="12">
        <v-btn color="green" @click="openDialog(null)">新增票券</v-btn>
      </v-col>
      <v-col cols="12">
        <v-row v-for="item in tableItems" :key="item._id" class="mb-4">
          <v-col cols="12">
            <v-card>
              <v-row no-gutters>
                <v-col cols="12" md="3">
                  <v-img :src="item.image" height="150px" contain></v-img>
                </v-col>
                <v-col cols="12" md="9">
                  <v-card-title>{{ item.name }}</v-card-title>
                  <v-card-subtitle>{{ item.price }} 元</v-card-subtitle>
                  <v-card-subtitle
                    >位置資訊: {{ item.seat_info }}</v-card-subtitle
                  >
                  <v-card-actions>
                    <v-btn
                      icon="mdi-pencil"
                      variant="text"
                      color="blue"
                      @click="openDialog(item)"
                    ></v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog.open" persistent width="500">
    <v-form @submit.prevent="submit" :disabled="isSubmitting">
      <v-card>
        <v-card-title>{{ dialog.id ? "編輯票券" : "新增票券" }}</v-card-title>
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
          <v-text-field
            label="位置資訊"
            v-model="seatInfo.value.value"
            :error-messages="seatInfo.errorMessage.value"
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
</template>

<script setup>
import { ref } from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useApi } from "@/composables/axios";
import { useSnackbar } from "vuetify-use-dialog";

const { apiAuth } = useApi();
const createSnackbar = useSnackbar();

const dialog = ref({
  open: false,
  id: "",
});

const openDialog = (item) => {
  if (item) {
    dialog.value.id = item._id;
    name.value.value = item.name;
    price.value.value = item.price;
    seatInfo.value.value = item.seat_info;
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
  name: yup.string().required("票券名稱必填"),
  price: yup
    .number()
    .typeError("票券價格格式錯誤")
    .required("票券價格必填")
    .min(0, "票券價格不能小於 0"),
  seat_info: yup.string().required("票券位置必填"),
});
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: "",
    price: 0,
    seat_info: "",
  },
});
const name = useField("name");
const price = useField("price");
const seatInfo = useField("seat_info");

const submit = handleSubmit(async (values) => {
  try {
    const payload = {
      name: values.name,
      price: values.price,
      seat_info: values.seat_info,
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
    tableLoadItems(true);
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
    const { data } = await apiAuth.get("/ticket/all");
    tableItems.value = data.result.data;
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
tableLoadItems();
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
