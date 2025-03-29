import { onMounted, onUnmounted, ref, watch } from "vue";
import { noop } from "../utils/misc";

interface NuiMessageData<T = unknown> {
  action: string;
  data: T;
}

export const useNuiEvent = <T = any>(action: string, handler: (data: T) => void) => {
  const savedHandler = ref(handler || noop);

  watch(
    () => handler,
    (newHandler) => {
      savedHandler.value = newHandler;
    }
  );

  const eventListener = (event: MessageEvent<NuiMessageData<T>>) => {
    const { action: eventAction, data } = event.data;

    if (savedHandler.value && eventAction === action) {
      savedHandler.value(data);
    }
  };

  onMounted(() => {
    window.addEventListener("message", eventListener);
  });

  onUnmounted(() => {
    window.removeEventListener("message", eventListener);
  });
};
