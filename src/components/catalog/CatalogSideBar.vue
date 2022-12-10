<script setup>
import { ref } from "vue";
import { useCatalog } from "@/stores/catalog";
import { storeToRefs } from "pinia";

const catalogStore = useCatalog();
const { categories } = storeToRefs(catalogStore);

const emit = defineEmits(["update"]);

const selected = ref([]);
const updateCheckbox = () => {
  emit("update", selected.value);
};
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
          v-model="selected"
          :val="value.title"
          @update:model-value="updateCheckbox"
        />
      </div>
    </div>
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
</style>
