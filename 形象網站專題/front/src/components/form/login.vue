<template>
  <v-form :disabled="isSubmitting" @submit.prevent="submit">
    <v-text-field
      label="帳號"
      minlength="4"
      maxlength="20"
      v-model="account.value.value"
      :error-messages="account.errorMessage.value"
    ></v-text-field>
    <v-text-field
      label="密碼"
      minlength="4"
      maxlength="20"
      type="password"
      v-model="password.value.value"
      :error-messages="password.errorMessage.value"
    ></v-text-field>
    <div class="text-center">
      <v-btn type="submit" color="primary" :loading="isSubmitting">登入</v-btn>
    </div>
  </v-form>
</template>

<script setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";
import validator from "validator";
import { useUserStore } from "@/stores/user";
import { useSnackbar } from "vuetify-use-dialog";

const router = useRouter();
const user = useUserStore();
const createSnackbar = useSnackbar();

const schema = yup.object({
  account: yup
    .string()
    .required("使用者帳號必填")
    .min(4, "使用者帳號長度不符")
    .max(20, "使用者帳號長度不符")
    .test(
      // .test(自訂驗證名稱, 錯誤訊息, 驗證 function)
      "isAlphanumeric",
      "使用者帳號格式錯誤",
      (value) => {
        return validator.isAlphanumeric(value);
      }
    ),
  password: yup
    .string()
    .required("使用者密碼必填")
    .min(4, "使用者密碼長度不符")
    .max(20, "使用者密碼長度不符"),
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});
const account = useField("account");
const password = useField("password");

const emit = defineEmits(["login-success"]);

const submit = handleSubmit(async (values) => {
  const result = await user.login(values);
  if (result === "登入成功") {
    createSnackbar({
      text: result,
      snackbarProps: {
        color: "green",
      },
    });
    if (user.isAdmin) {
      router.push("/admin");
    }
    // if (result.role === "admin") {
    //   router.push("/admin");
    // } else {
    //   router.push("/member");
    // }
    emit("login-success");
  } else {
    createSnackbar({
      text: result,
      snackbarProps: {
        color: "red",
      },
    });
  }
});
</script>
