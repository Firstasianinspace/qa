<script setup lang="ts">
import TheHeader from "@/components/header/TheHeader.vue";
import DrawerCollection from "@/components/DrawerCollection.vue";
</script>

<template>
  <q-layout>
    <TheHeader />
    <RouterView />
    <DrawerCollection />
  </q-layout>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
  &:focus {
    outline: none;
  }
}
</style>
