<script setup>
import { ionPersonOutline } from "@quasar/extras/ionicons-v6";
</script>
<template>
  <div class="header-services__item">
    <span>My Account</span>
    <q-icon :name="ionPersonOutline" size="18px" />
    <q-menu auto-close>
      <q-list style="min-width: 100px">
        <q-item clickable>
          <q-item-section
            ><router-link to="/"> Favorites </router-link></q-item-section
          >
        </q-item>
        <q-item clickable>
          <q-item-section
            ><router-link to="/"> Settings </router-link></q-item-section
          >
        </q-item>
        <q-item clickable>
          <q-item-section
            ><router-link to="/"> Logout </router-link></q-item-section
          >
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>
<style lang="scss"></style>
