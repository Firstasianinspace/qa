import { ref } from "vue";
import { createGlobalState } from "@vueuse/core";

export const useModalState = createGlobalState(() => {
  const collection = ref([]);
  return { collection };
});

export const useModal = (type, props) => {
  const { collection } = useModalState();
  return new Promise((resolve, reject) => {
    const entry = {
      promise: { resolve, reject },
      id: `${type}-${Date.now()}`,
      props,
      type,
    };
    collection.value.push(entry);
  });
};
