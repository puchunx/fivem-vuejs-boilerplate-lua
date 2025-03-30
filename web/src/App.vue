<script setup lang="ts">
import { ref } from "vue";
import { fetchNui } from "./utils/fetchNui";
import VisibilityProvider from "./layouts/VisibilityProvider.vue";
import { debugData } from "./utils/debugData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useStore } from "./stores";

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

const store = useStore();

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
    <div class="h-full">
      <Dialog :open="store.visible" v-on:update:open="store.setVisible">
        <DialogContent class="w-[500px]">
          <DialogHeader>
            <DialogTitle>This is the NUI Popup!</DialogTitle>
            <DialogDescription>Exit with the escape key</DialogDescription>
          </DialogHeader>

          <Button v-on:click="handleGetClientData">Get Client Data</Button>

          <template v-if="clientData">
            <h5>Returned Data:</h5>
            <pre class="bg-zinc-800 text-zinc-200 py-3 leading-6">
            <code>{{ JSON.stringify(clientData) }}</code>
          </pre>
          </template>
        </DialogContent>
      </Dialog>
    </div>
  </VisibilityProvider>
</template>
