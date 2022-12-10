<script setup>
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useCatalog } from "@/stores/catalog";
import CatalogLayout from "@/layouts/CatalogLayout.vue";
import { useCatalogLayout } from "@/composable/useCatalogLayout";
import CatalogSort from "@/components/catalog/CatalogSort.vue";
import CatalogSideBar from "@/components/catalog/CatalogSideBar.vue";
import ProductGridCard from "@/components/catalog/ProductGridCard.vue";
import ProductListCard from "@/components/catalog/ProductListCard.vue";

const { layout, LAYOUTS } = useCatalogLayout();

const catalogLayoutComponent = {
  [LAYOUTS.grid]: ProductGridCard,
  [LAYOUTS.list]: ProductListCard,
};

const catalogCardComponent = computed(
  () => catalogLayoutComponent[layout.value]
);

const catalogStore = useCatalog();
const { products } = storeToRefs(catalogStore);
const { getProducts, getCategories } = catalogStore;

const selectedCategories = ref("");

const checkBoxes = (value) => {
  selectedCategories.value = value;
};

const filteredProducts = computed(() => {
  if (selectedCategories.value.length) {
    return products.value.filter((s) =>
      selectedCategories.value.includes(s.category)
    );
  }
  return products.value;
});

const filteredProductsCount = computed(() => filteredProducts.value.length);

onMounted(() => {
  getProducts();
  getCategories();
});
</script>
<template>
  <div class="page catalog-page container">
    <div class="catalog-wrapper">
      <CatalogSort :product-count="filteredProductsCount" />
      <CatalogLayout>
        <component
          :is="catalogCardComponent"
          v-for="product in filteredProducts"
          :key="product.item_id"
          :product="product"
        />
      </CatalogLayout>
      <CatalogSideBar @update="checkBoxes" />
    </div>
  </div>
</template>
<style lang="scss">
.catalog-wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 60px 1fr 1fr;
  column-gap: 30px;
  & .catalog-sort {
    grid-column: 1 / 1;
  }
  & .catalog-sidebar {
    grid-column: 2 / 2;
    grid-row: 1 / 4;
  }
  & .grid-layout,
  .list-layout {
    grid-column: 1 / 1;
    grid-row: 2 / 4;
  }
}
</style>
