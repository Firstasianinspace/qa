<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  minPrice: {
    type: Number,
  },
  maxPrice: {
    type: Number,
  },
});

const emit = defineEmits(["update:updateRange"]);

const min = computed(() => props.minPrice);
const max = computed(() => props.maxPrice);

const standard = ref({
  min: props.minPrice,
  max: props.maxPrice,
});

const hidePriceBlock = computed(
  () => props.minPrice === 0 || props.maxPrice === 0
);

const setMinimumPrice = (value) => {
  emit("update:updateMinimum", value);
};

const setMaximumPrice = (value) => {
  emit("update:updateMaximum", value);
};

const changeRange = (value) => {
  console.log(value);
  emit("update:updateRange", value);
};
</script>
<template>
  <div v-if="!hidePriceBlock" class="q-pa-md">
    <h4 class="catalog-sidebar__price-title">Цена</h4>
    <q-badge color="secondary"> Model: {{ min }} to {{ max }} </q-badge>

    <q-range
      v-model="standard"
      :min="min"
      :max="max"
      @change="changeRange(value)"
    ></q-range>
  </div>
</template>
<style lang="scss"></style>
