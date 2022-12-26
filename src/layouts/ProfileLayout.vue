<script setup>
import { onMounted } from "vue";
import ProfileLayoutNav from "@/components/profile/ProfileLayoutNav.vue";
import { useUser } from "@/stores/user";

const userStore = useUser();
const { getBuys } = userStore;

onMounted(() => {
  getBuys();
});
</script>

<template>
  <div class="page-profile-layout container">
    <div class="page-profile-layout__sidebar">
      <ProfileLayoutNav />
    </div>
    <div class="page-profile-layout__content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">
.page-profile-layout {
  display: grid;
  grid-template-columns: 23% 75%;
  gap: 2%;
  &__sidebar {
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
      0 3px 1px -2px rgb(0 0 0 / 12%);
    border-radius: 4px;
    background: #fff;
  }
  &__content {
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
      0 3px 1px -2px rgb(0 0 0 / 12%);
    border-radius: 4px;
    background: #fff;
  }
}
</style>
