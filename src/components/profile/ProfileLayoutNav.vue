<script setup>
import {
  ionFileTrayStackedOutline,
  ionHeart,
  ionSettingsOutline,
} from "@quasar/extras/ionicons-v6";
</script>
<template>
  <div class="profile-layout-nav">
    <q-tabs vertical class="text-dark-grey" inline-label active-color="dark">
      <q-route-tab
        :icon="ionHeart"
        to="/favorites"
        label="Избранное"
        exact
        class="profile-layout-nav__item"
      />
      <q-route-tab
        :icon="ionFileTrayStackedOutline"
        to="/orders"
        label="История заказов"
        exact
        class="profile-layout-nav__item"
      />
      <q-route-tab
        :icon="ionSettingsOutline"
        to="/personal"
        label="Настройки"
        exact
        class="profile-layout-nav__item"
      />
    </q-tabs>
  </div>
</template>

<style lang="scss">
.profile-layout-nav__item {
  justify-content: start !important;
}
</style>
