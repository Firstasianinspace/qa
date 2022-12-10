<script setup>
import { ref, onMounted } from "vue";

const searchInput = ref("");

onMounted(() => {
  console.log("headerSearchBox");
});
</script>
<template>
  <div class="header-search__box">
    <div class="header-search__box-header">
      <q-input
        v-model="searchInput"
        label="Search"
        auto-focus
        input-class="header-search__input"
      />
    </div>
  </div>
</template>
<style lang="scss">
.header-search__box {
  position: absolute;
  z-index: 10;
  top: 10px;
  width: 100%;
  background: grey;
  &-header {
    padding: 15px;
  }
}
</style>
