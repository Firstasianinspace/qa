<script setup>
import { computed } from "vue";
import GridLayout from "@/layouts/components/GridLayout.vue";
import ListLayout from "@/layouts/components/ListLayout.vue";

import { useCatalogLayout, LAYOUTS } from "@/composable/useCatalogLayout";

const layoutComponents = {
  [LAYOUTS.grid]: GridLayout,
  [LAYOUTS.list]: ListLayout,
};

const { layout } = useCatalogLayout();

const currentLayoutComponent = computed(() => layoutComponents[layout.value]);
</script>
<template>
  <component :is="currentLayoutComponent">
    <template
      v-for="slotName in Object.keys($slots)"
      :key="slotName"
      v-slot:[slotName]="slotProps"
    >
      <slot :name="slotName" :layout="layout" v-bind="slotProps" />
    </template>
  </component>
</template>
<style lang="scss"></style>
