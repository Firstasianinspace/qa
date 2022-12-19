<script setup>
import { ref } from "vue";
import { ionSearchOutline, ionCloseOutline } from "@quasar/extras/ionicons-v6";

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
          <q-input
            outlined
            color="dark"
            v-model="search"
            label="Поиск"
            autofocus
          >
            <template v-slot:prepend>
              <q-icon :name="ionSearchOutline"></q-icon>
            </template>
            <template v-if="search" v-slot:append>
              <q-icon
                :name="ionCloseOutline"
                @click.stop.prevent="search = null"
                class="cursor-pointer"
              ></q-icon>
            </template>
          </q-input>
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
