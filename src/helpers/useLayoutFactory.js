import { ref } from "vue";

export const useLayoutFactory = (LAYOUTS, defaultLayout) => {
  const layout = ref(defaultLayout);
  const setLayout = (layoutType) => {
    layout.value = layoutType;
  };
  const useLayout = () => {
    return { layout, setLayout, LAYOUTS };
  };
  return { useLayout };
};
