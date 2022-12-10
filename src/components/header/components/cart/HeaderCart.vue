<script setup>
import { ionCartOutline } from "@quasar/extras/ionicons-v6";
</script>
<template>
  <router-link to="/cart" class="header-services__item">
    <span>Cart</span>
    <q-icon :name="ionCartOutline" size="18px" />
  </router-link>
</template>
<style lang="scss"></style>
