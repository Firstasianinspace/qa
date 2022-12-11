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
const { getProducts, getCategories, getBrands } = catalogStore;

const selectedCategories = ref("");
const minPriceRange = ref(null);
const maxPriceRange = ref(null);

const checkBoxes = (value) => {
  selectedCategories.value = value;
};

const filteredProducts = computed(() => {
  if (selectedCategories.value.length) {
    return products.value.filter((s) => {
      return selectedCategories.value.includes(s.category);
    });
  }
  return products.value;
});

const filteredProductsRange = computed(() => {
  if (maxPriceRange.value === 0) return products.value;
  return filteredProducts.value.filter(
    (s) =>
      s.currentPrice >= minPriceRange.value &&
      s.currentPrice <= maxPriceRange.value
  );
});

const filteredProductsRangeCount = computed(
  () => filteredProductsRange.value.length
);

const productPrices = computed(() => {
  return filteredProducts.value.map((s) => s.currentPrice);
});

const minPrice = computed(() =>
  productPrices.value.length ? Math.min(...productPrices.value) : 0
);
const maxPrice = computed(() =>
  productPrices.value.length ? Math.max(...productPrices.value) : 0
);

const setRangeSlider = (value) => {
  minPriceRange.value = value.min;
  maxPriceRange.value = value.max;
};

const setMinimum = (value) => {
  minPriceRange.value = value.min;
};

const setMaximum = (value) => {
  maxPriceRange.value = value.min;
};

onMounted(() => {
  getProducts();
  getCategories();
  getBrands();
  setTimeout(() => {
    minPriceRange.value = minPrice.value;
    maxPriceRange.value = maxPrice.value;
  }, 500);
});
</script>
<template>
  <div class="page catalog-page container">
    <div class="catalog-wrapper">
      <CatalogSort :product-count="filteredProductsRangeCount" />
      <CatalogLayout>
        <component
          :is="catalogCardComponent"
          v-for="product in filteredProductsRange"
          :key="product.item_id"
          :product="product"
        />
      </CatalogLayout>
      <CatalogSideBar
        @update="checkBoxes"
        @updateRange="setRangeSlider"
        @updateMinimum="setMinimum"
        @updateMaximum="setMaximum"
        :min-price="minPrice"
        :max-price="maxPrice"
      />
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
