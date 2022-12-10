<script setup>
import { computed } from "vue";
import { useModalState } from "@/composable/use-modal";
import { SEARCH_DRAWER } from "@/constants";

const MProductModal = () => ({
  component: import("@/components/modals/MProductModal"),
});

const { collection } = useModalState();

const closeDialog = (id) =>
  (collection.value = collection.value.filter((s) => s.id !== id));

const handleResolve = (id, payload) => {
  const modal = collection.value.find((s) => s.id === id);
  if (!modal) return;
  const { promise } = modal;
  if (payload === null) {
    promise.resolve(null);
  } else {
    promise.resolve(...payload);
  }
  setTimeout(closeDialog, 100, id);
};

const getComponentByType = (type) => {
  switch (type) {
    case SEARCH_DRAWER:
      return MProductModal;
    default:
      return null;
  }
};

const displayModals = computed(() => {
  const modals = collection.value.map((s) => {
    const { id, props, type } = s;
    const component = getComponentByType(type);
    return { id, props, component };
  });
  return modals.filter((s) => s.component !== null);
});
</script>
<template>
  <section class="modal-collection">
    <component
      :is="single.component"
      v-for="single of displayModals"
      :key="single.id"
      v-bind="single.props"
      @resolve="(...args) => handleResolve(single.id, args)"
      @close="() => handleResolve(single.id, null)"
    />
  </section>
</template>
