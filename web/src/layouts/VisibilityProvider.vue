<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useNuiEvent } from "../composables/useNuiEvent";
import { isEnvBrowser } from "../utils/misc";
import { fetchNui } from "../utils/fetchNui";
import { useStore } from "../stores";

const store = useStore();

useNuiEvent("setVisible", store.setVisible);

const keyHandler = (event: KeyboardEvent) => {
  if (["Backspace", "Escape"].includes(event.code)) {
    if (!isEnvBrowser()) {
      fetchNui("hideFrame");
    } else {
      store.setVisible(false);
    }
  }
};

onMounted(() => {
  window.addEventListener("keydown", keyHandler);
});

onUnmounted(() => {
  window.removeEventListener("keydown", keyHandler);
});
</script>

<template>
  <div :style="{ visibility: store.visible ? 'visible' : 'hidden', height: '100%' }">
    <slot></slot>
  </div>
</template>
