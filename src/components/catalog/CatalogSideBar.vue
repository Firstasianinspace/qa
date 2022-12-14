<script setup>
import { onMounted, ref, computed } from "vue";
import { useCatalog } from "@/stores/catalog";
import { storeToRefs } from "pinia";

const props = defineProps({
  minPrice: {
    type: Number,
  },
  maxPrice: {
    type: Number,
  },
});

const catalogStore = useCatalog();
const { categories } = storeToRefs(catalogStore);

const emit = defineEmits([
  "update",
  "updateRange",
  "updateMinimum",
  "updateMaximum",
]);

const selected = ref([]);
const priceRange = ref({
  min: props.minPrice,
  max: props.maxPrice,
});

const availableMinimum = computed(() => props.minPrice);
const availableMaximum = computed(() => props.maxPrice);

const updateCheckbox = () => {
  emit("update", selected.value);
};
const setRange = () => {
  emit("updateRange", priceRange.value);
};

const setMinimumPrice = (value) => {
  if (value < availableMinimum.value || value > availableMaximum.value) {
    priceRange.value.min = availableMinimum.value;
    emit("updateMinimum", availableMinimum.value);
  } else {
    emit("updateMinimum", value);
  }
};

const setMaximumPrice = (value) => {
  if (value < availableMinimum.value || value > availableMaximum.value) {
    priceRange.value.max = availableMaximum.value;
    emit("updateMaximum", availableMaximum.value);
  } else {
    emit("updateMaximum", value);
  }
};

onMounted(() => {
  setTimeout(() => {
    priceRange.value.min = props.minPrice;
    priceRange.value.max = props.maxPrice;
  }, 500);
});
</script>
<template>
  <div class="catalog-sidebar">
    <div class="catalog-sidebar__categories">
      <h4 class="catalog-sidebar__catagories-title">Категории</h4>
      <div
        class="single-checkbox"
        v-for="value in categories"
        :key="value.category_id"
      >
        <q-checkbox
          :label="value.title"
          size="md"
          color="dark"
          v-model="selected"
          :val="value.title"
          @update:model-value="updateCheckbox"
        />
      </div>
    </div>
    <div class="price-range">
      <h4 class="catalog-sidebar__price-title">Цена</h4>
      <div class="price-range__inputs">
        <q-input
          outlined
          color="dark"
          type="number"
          v-model.number="priceRange.min"
          :min="minPrice"
          @update:model-value="setMinimumPrice"
        />
        <q-input
          outlined
          color="dark"
          type="number"
          v-model.number="priceRange.max"
          :max="maxPrice"
          @update:model-value="setMaximumPrice"
        />
      </div>
      <q-range
        color="dark"
        v-model="priceRange"
        :min="minPrice"
        :max="maxPrice"
        @change="setRange"
      ></q-range>
    </div>
    <!-- <PriceRange
      :minPrice="minPrice"
      :maxPrice="maxPrice"
      @updateRange:model-value="setRange"
    /> -->
  </div>
</template>
<style lang="scss">
.catalog-sidebar {
  & h4 {
    font-weight: 700;
    font-size: 18px;
    line-height: 140%;
    color: #000000;
  }
}

.price-range {
  &__inputs {
    display: flex;
    flex-direction: row;
    gap: 15px;
    padding: 10px 0;
  }
}
</style>
