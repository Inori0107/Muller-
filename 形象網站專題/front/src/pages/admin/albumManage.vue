<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">專輯管理</h1>
      </v-col>
      <v-col cols="12">
        <v-btn color="green" @click="openDialog(null)">新增商品</v-btn>
      </v-col>
      <v-col cols="12">
        <v-data-table
          v-model:items-per-page="tableItemsPerPage"
          v-model:sort-by="tableSortBy"
          v-model:page="tablePage"
          :items="tableItems"
          :headers="tableHeaders"
          :loading="tableLoading"
          :items-length="tableItemsLength"
          :search="tableSearch"
          @update:items-per-page="tableLoadItems(false)"
          @update:sort-by="tableLoadItems(false)"
          @update:page="tableLoadItems(false)"
          hover
        >
          <template #top>
            <v-text-field
              label="搜尋"
              v-model="tableSearch"
              append-icon="mdi-magnify"
              @click-append="tableLoadItems(true)"
              @keydown.enter="tableLoadItems(true)"
            ></v-text-field>
          </template>
          <template #[`item.image`]="{ value }">
            <v-img :src="value" height="150px" contain></v-img>
          </template>
          <template #[`item.sell`]="{ value }">
            <v-icon icon="mdi-check" v-if="value"></v-icon>
          </template>
          <template #[`item.action`]="{ item }">
            <v-btn
              icon="mdi-pencil"
              variant="text"
              color="blue"
              @click="openDialog(item)"
            ></v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog.open" persistent width="500">
      <v-form @submit.prevent="submit" :disabled="isSubmitting">
        <v-card>
          <v-card-title>{{ dialog.id ? "編輯商品" : "新增商品" }}</v-card-title>
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
            <v-select
              label="分類"
              :items="categories"
              v-model="category.value.value"
              :error-messages="category.errorMessage.value"
            ></v-select>
            <v-checkbox
              label="上架"
              v-model="sell.value.value"
              :error-messages="sell.errorMessage.value"
            ></v-checkbox>
            <v-textarea
              label="說明"
              v-model="description.value.value"
              :error-messages="description.errorMessage.value"
            ></v-textarea>
            <v-col
              v-for="(songField, index) in songFields"
              :key="index"
              cols="12"
              class="d-flex align-items-center"
            >
              <v-text-field
                label="歌曲列表（每行一首）"
                v-model="songField.value"
                :error-messages="songField.errorMessage"
              ></v-text-field>
              <v-btn
                icon="mdi-plus"
                variant="text"
                color="green"
                v-if="index === songFields.length - 1 && !songField.added"
                @click="addSong"
              ></v-btn>
              <v-btn
                icon="mdi-delete"
                variant="text"
                color="red"
                v-else
                @click="removeSong(index)"
              ></v-btn>
            </v-col>
            <vue-file-agent
              v-model="fileRecords"
              v-model:raw-model-value="rawFileRecords"
              accept="image/jpeg,image/png"
              deletable
              max-size="1MB"
              help-text="選擇檔案或拖曳到這裡"
              :error-text="{
                type: '檔案格式不支援',
                size: '檔案大小不能超過 1MB',
              }"
              ref="fileAgent"
            ></vue-file-agent>
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
import { definePage } from "vue-router/auto";
import { ref } from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useApi } from "@/composables/axios";
import { useSnackbar } from "vuetify-use-dialog";

definePage({
  meta: {
    title: "木樓合唱團 | 專輯管理",
    login: true,
    admin: true,
  },
});

const { apiAuth } = useApi();
const createSnackbar = useSnackbar();

const fileAgent = ref(null);

const dialog = ref({
  open: false,
  id: "",
});

const openDialog = (item) => {
  if (item) {
    dialog.value.id = item._id;
    name.value.value = item.name;
    price.value.value = item.price;
    description.value.value = item.description;
    songFields.value = item.song
      .map((song) => ({
        value: song,
        errorMessage: "",
        added: true,
      }))
      .filter((field) => field.value !== ""); // 過濾掉沒有文字的歌曲
    songFields.value.push({ value: "", errorMessage: "", added: false });
    category.value.value = item.category;
    sell.value.value = item.sell;
  } else {
    dialog.value.id = "";
    resetForm();
    songFields.value = [{ value: "", errorMessage: "", added: false }];
  }
  dialog.value.open = true;
};

const closeDialog = () => {
  dialog.value.open = false;
  resetForm();
  fileAgent.value.deleteFileRecord();
};

const categories = ["專輯", "樂譜"];
const schema = yup.object({
  name: yup.string().required("商品名稱必填"),
  price: yup
    .number()
    .typeError("商品價格格式錯誤")
    .required("商品價格必填")
    .min(0, "商品價格不能小於 0"),
  description: yup.string().required("商品說明必填"),
  song: yup.string(),
  category: yup
    .string()
    .required("商品分類必填")
    .test("isCategory", "商品分類錯誤", (value) => {
      return categories.includes(value);
    }),
  sell: yup.boolean(),
});
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: "",
    price: 0,
    description: "",
    song: "",
    sell: true,
  },
});
const name = useField("name");
const price = useField("price");
const description = useField("description");
const song = useField("song");
const category = useField("category");
const sell = useField("sell");

const fileRecords = ref([]);
const rawFileRecords = ref([]);

const songFields = ref([{ value: "", errorMessage: "", added: false }]);

const addSong = () => {
  const lastField = songFields.value[songFields.value.length - 1];
  if (!lastField.value) {
    lastField.errorMessage = "此字段必填";
    return;
  }
  lastField.added = true;
  songFields.value.push({ value: "", errorMessage: "", added: false });
};

const removeSong = (index) => {
  songFields.value.splice(index, 1);
  if (songFields.value.length === 0) {
    songFields.value.push({ value: "", errorMessage: "", added: false });
  }
};

const submit = handleSubmit(async (values) => {
  if (fileRecords.value[0]?.error) return;
  if (dialog.value.id.length === 0 && fileRecords.value.length < 1) return;

  const filteredSongs = songFields.value.filter((field) => field.value !== "");
  try {
    const fd = new FormData();
    fd.append("name", values.name);
    fd.append("price", values.price);
    fd.append("description", values.description);
    songFields.value.forEach((field) => {
      fd.append(`song[]`, field.value);
    });
    fd.append("category", values.category);
    fd.append("sell", values.sell);

    if (fileRecords.value.length > 0) {
      fd.append("image", fileRecords.value[0].file);
    }

    if (dialog.value.id === "") {
      await apiAuth.post("/product", fd);
    } else {
      await apiAuth.patch("/product/" + dialog.value.id, fd);
    }

    createSnackbar({
      text: dialog.value.id === "" ? "新增成功" : "編輯成功",
      snackbarProps: {
        color: "green",
      },
    });
    closeDialog();
    tableLoadItems(true);
  } catch (error) {
    console.log(error);
    createSnackbar({
      text: error?.response?.data?.message || "發生錯誤",
      snackbarProps: {
        color: "red",
      },
    });
  }
});

const tableItemsPerPage = ref(10);
const tableSortBy = ref([{ key: "createdAt", order: "desc" }]);
const tablePage = ref(1);
const tableItems = ref([]);
const tableHeaders = [
  { title: "圖片", align: "center", sortable: false, key: "image" },
  { title: "名稱", align: "center", sortable: true, key: "name" },
  { title: "價格", align: "center", sortable: true, key: "price" },
  { title: "上架", align: "center", sortable: true, key: "sell" },
  { title: "操作", align: "center", sortable: false, key: "action" },
];
const tableLoading = ref(true);
const tableItemsLength = ref(0);
const tableSearch = ref("");
const tableLoadItems = async (reset) => {
  if (reset) tablePage.value = 1;
  tableLoading.value = true;
  try {
    const { data } = await apiAuth.get("/product/all", {
      params: {
        page: tablePage.value,
        itemsPerPage: tableItemsPerPage.value,
        sortBy: tableSortBy.value[0]?.key || "createdAt",
        sortOrder: tableSortBy.value[0]?.order || "desc",
        category: "專輯",
        search: tableSearch.value,
      },
    });
    tableItems.value.splice(0, tableItems.value.length, ...data.result.data);
    tableItemsLength.value = data.result.total;
  } catch (error) {
    console.log(error);
    createSnackbar({
      text: error?.response?.data?.message || "發生錯誤",
      snackbarProps: {
        color: "red",
      },
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
