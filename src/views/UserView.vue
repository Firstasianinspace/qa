<script setup>
import { onMounted } from "vue";
import { useUser } from "@/stores/user";
import { storeToRefs } from "pinia";
import ProfileOrderHistory from "@/components/user/ProfileOrderHistory.vue";

const userStore = useUser();
const { getBuys } = userStore;
const { profileOrders } = storeToRefs(userStore);

onMounted(() => {
  getBuys();
});
</script>
<template>
  <div class="page user-page container">
    <ProfileOrderHistory :orders="profileOrders" />
  </div>
</template>
<style lang="scss"></style>
