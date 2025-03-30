import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    visible: true,
  }),

  actions: {
    setVisible(val: boolean) {
      this.visible = val;
    },
  },
});
