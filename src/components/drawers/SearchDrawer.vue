<script setup>
import { ref } from "vue";

const emit = defineEmits("close");

const drawer = ref(true);

const search = ref("");

const clickOutside = () => {
  emit("close");
};
</script>
<template>
  <div class="drawer-wrapper">
    <div class="drawer-wrapper__overlay" @click="clickOutside" />
    <q-drawer
      v-model="drawer"
      side="right"
      :width="650"
      :breakpoint="500"
      overlay
      bordered
      class="bg-grey-3"
    >
      <div class="search">
        <div class="search__header">
          <h5>Поиск</h5>
        </div>
        <div class="search__body">
          <q-input outlined color="dark" v-model="search" label="Поиск" />
        </div>
      </div>
    </q-drawer>
  </div>
</template>
<style lang="scss">
.drawer-wrapper {
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    opacity: 0.5;
  }
}
.search {
  padding: 35px;
}
</style>
