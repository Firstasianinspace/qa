<script setup>
import ProfileOrderHistory from "@/components/profile/ProfileOrderHistory.vue";

import { useUser } from "@/stores/user";
import { storeToRefs } from "pinia";

const userStore = useUser();
const { profileOrders } = storeToRefs(userStore);
</script>
<template>
  <div class="profile-orders">
    <ProfileOrderHistory :orders="profileOrders" />
  </div>
</template>

<style></style>
