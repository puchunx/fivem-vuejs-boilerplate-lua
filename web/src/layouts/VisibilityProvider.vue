<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref } from "vue";
import { useNuiEvent } from "../composables/useNuiEvent";
import { isEnvBrowser } from "../utils/misc";
import { fetchNui } from "../utils/fetchNui";

const visible = ref(false);
const setVisible = (val: boolean) => (visible.value = val);

useNuiEvent("setVisible", setVisible);

const keyHandler = (event: KeyboardEvent) => {
  if (["Backspace", "Escape"].includes(event.code)) {
    if (!isEnvBrowser()) {
      fetchNui("hideFrame");
    } else {
      visible.value = !visible.value;
    }
  }
};

onMounted(() => {
  window.addEventListener("keydown", keyHandler);
});

onUnmounted(() => {
  window.removeEventListener("keydown", keyHandler);
});

provide("setVisible", setVisible);
</script>

<template>
  <div :style="{ visibility: visible ? 'visible' : 'hidden', height: '100%' }">
    <slot></slot>
  </div>
</template>
