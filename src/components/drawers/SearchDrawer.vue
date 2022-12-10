<script setup>
import { ref } from "vue";
const drawer = ref(true);

const emit = defineEmits("close");
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
      :width="550"
      :breakpoint="500"
      overlay
      bordered
      class="bg-grey-3"
    >
      Hi
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
</style>
