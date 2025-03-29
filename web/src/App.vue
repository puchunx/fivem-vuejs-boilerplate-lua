<script setup lang="ts">
import { ref } from "vue";
import { fetchNui } from "./utils/fetchNui";
import VisibilityProvider from "./layouts/VisibilityProvider.vue";
import { debugData } from "./utils/debugData";

interface ReturnData {
  x: number;
  y: number;
  z: number;
}

debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

const clientData = ref<ReturnData | null>(null);

const handleGetClientData = () => {
  fetchNui("getClientData")
    .then((retData) => {
      console.log("Got return data from client scripts:");
      console.dir(retData);
      clientData.value = retData;
    })
    .catch((e) => {
      console.error("Setting mock data due to error", e);
      clientData.value = { x: 500, y: 300, z: 200 };
    });
};
</script>

<template>
  <VisibilityProvider>
    <div class="nui-wrapper">
      <div class="popup-thing">
        <div>
          <h1>This is the NUI Popup!</h1>
          <p>Exit with the escape key</p>
          <button v-on:click="handleGetClientData">Get Client Data</button>

          <template v-if="clientData">
            <h5>Returned Data:</h5>
            <pre>
            <code>{{ JSON.stringify(clientData) }}</code>
          </pre>
          </template>
        </div>
      </div>
    </div>
  </VisibilityProvider>
</template>
