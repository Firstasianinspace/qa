<script setup>
import { computed, defineAsyncComponent } from "vue";
import { useDrawerState } from "@/composable/use-drawer";
import { SEARCH_DRAWER } from "@/constants";

const searchDrawer = defineAsyncComponent(() =>
  import("@/components/drawers/SearchDrawer.vue")
);

const { collection } = useDrawerState();

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
      return searchDrawer;
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
  <div class="drawer-collection">
    <component
      :is="single.component"
      v-for="single of displayModals"
      :key="single.id"
      v-bind="single.props"
      @resolve="(...args) => handleResolve(single.id, args)"
      @close="() => handleResolve(single.id, null)"
    />
  </div>
  <!-- <q-drawer
    v-model="drawerLeft"
    show-if-above
    :width="200"
    :breakpoint="700"
    elevated
    class="bg-primary text-white"
  >

  </q-drawer> -->
</template>
