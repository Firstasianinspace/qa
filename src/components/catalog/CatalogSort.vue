<script setup>
import { ref, computed } from "vue";
// import { useCatalog } from "@/stores/catalog";
import { pluralProducts } from "@/helpers";
import { useCatalogLayout } from "@/composable/useCatalogLayout";
import { ionGridOutline, ionListOutline } from "@quasar/extras/ionicons-v6";

const props = defineProps({
  productCount: {
    type: Number,
    default: 0,
  },
});

const { layout, setLayout, LAYOUTS } = useCatalogLayout();

const toggleLayout = () => {
  if (LAYOUTS.grid === layout.value) {
    setLayout(LAYOUTS.list);
  } else if (LAYOUTS.list === layout.value) {
    setLayout(LAYOUTS.grid);
  }
};
const dynamicIcon = computed(() =>
  LAYOUTS.grid === layout.value ? ionListOutline : ionGridOutline
);

const productCount = computed(
  () => `Найдено ${pluralProducts(props.productCount)}`
);
</script>
<template>
  <div class="catalog-sort">
    <div class="catalog-sort__product-count">
      {{ productCount }}
    </div>
    <button class="catalog-sort_toggle-layout" @click="toggleLayout">
      <q-icon :name="dynamicIcon" size="24px" />
    </button>
  </div>
</template>
<style lang="scss">
.catalog-sort {
  display: flex;
  justify-content: space-between;

  &_toggle-layout {
    align-self: flex-start;
    border: none;
    background: none;
    cursor: pointer;
  }
}
</style>
