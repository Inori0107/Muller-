<template>
  <v-dialog max-width="1000" v-model="isActive" transition="dialog-transition">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" icon>
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </template>
    <template v-slot:default>
      <v-card>
        <v-card-title>
          <h2 class="ms-2 mt-2"><b>木樓之友</b></h2>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6" align-self="center">
              <v-img src="../assets//home/contact us.webp"></v-img>
            </v-col>
            <v-col cols="6">
              <v-tabs v-model="tab" align-tabs="center" fixed-tabs="false">
                <v-tab @click="toggleTab = true">登入</v-tab>
                <v-tab @click="toggleTab = false">註冊</v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab" class="text-center">
                <v-tab-item>
                  <div v-if="toggleTab">
                    <LoginForm @login-success="handleLoginSuccess" />
                  </div>
                  <div v-else>
                    <SignUpForm @signUp-success="SignUp" />
                  </div>
                </v-tab-item>
              </v-tabs-items>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn text="Close" @click="isActive = false">關閉</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import LoginForm from "@/components/form/login.vue";
import SignUpForm from "@/components/form/signUp.vue";

// tab
const isActive = ref(false);
const tab = ref(0);
const toggleTab = ref(true);

const handleLoginSuccess = () => {
  isActive.value = false;
};
const SignUp = () => {
  toggleTab.value = true;
};
</script>
