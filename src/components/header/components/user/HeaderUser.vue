<script setup>
import { ionPersonOutline } from "@quasar/extras/ionicons-v6";
</script>
<template>
  <div @click="changeRoute" class="header-services__item">
    <span>My Account</span>
    <q-icon :name="ionPersonOutline" size="18px" />
  </div>
</template>
<style lang="scss"></style>
