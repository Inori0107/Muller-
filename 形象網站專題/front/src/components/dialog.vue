<template>
  <v-dialog max-width="1000" v-model="isActive">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="surface-variant"
        text="learn more"
        variant="flat"
      ></v-btn>
    </template>
    <template v-slot:default>
      <v-card :title="title">
        <v-card-text>
          <slot name="content"></slot>
        </v-card-text>
        <v-card-actions>
          <!-- <v-spacer></v-spacer> -->
          <v-btn text="Close" @click="isActive = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "Dialog",
  },
});

const isActive = ref(false);
</script>
