<script setup>
import { ref } from "vue";

defineProps({
  title: {
    type: String,
    default: "No title",
  },
  values: {
    type: Array,
    required: true,
  },
});

const selected = ref([]);
</script>
<template>
  <div class="checkbox-group">
    <h4 class="checkbox-group__title">{{ title }}</h4>
    <div
      class="single-checkbox"
      v-for="value in values"
      :key="value.category_id"
    >
      <q-checkbox :label="value.title" size="md" v-model="item.selected" />
    </div>
    <!-- <q-checkbox size="xl" v-model="selected" val="xl" label="Size 'xl'" /> -->
  </div>
</template>
<style lang="scss"></style>
