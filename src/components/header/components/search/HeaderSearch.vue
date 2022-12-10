<script setup>
import { useDrawer } from "@/composable/use-drawer";
import { ionSearchOutline } from "@quasar/extras/ionicons-v6";
import { SEARCH_DRAWER } from "@/constants";

const openSearchDrawer = () => {
  useDrawer(SEARCH_DRAWER);
};
</script>
<template>
  <div class="header-services__item" @click="openSearchDrawer">
    <span>Search</span>
    <q-icon :name="ionSearchOutline" size="18px" />
  </div>
</template>
<style lang="scss" scoped>
.header-services__item {
  & .form-field {
    padding: 0;

    & input {
      padding: 0;
    }
  }
}
</style>
