import { ref } from "vue";
import { createGlobalState } from "@vueuse/core";

export const useDrawerState = createGlobalState(() => {
  const collection = ref([]);
  return { collection };
});

export const useDrawer = (type, props) => {
  const { collection } = useDrawerState();
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
