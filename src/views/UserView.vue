<script setup>
import { ref, onMounted } from "vue";
import { useUser } from "@/stores/user";
import { storeToRefs } from "pinia";
import {
  ionFileTrayStackedOutline,
  ionHeart,
} from "@quasar/extras/ionicons-v6";
import ProfileOrderHistory from "@/components/user/ProfileOrderHistory.vue";

const userStore = useUser();
const { getBuys } = userStore;
const { profileOrders } = storeToRefs(userStore);

const tab = ref("orders");

onMounted(() => {
  getBuys();
});
</script>
<template>
  <div class="page user-page container">
    <div class="user-page__sidebar">
      <q-tabs
        v-model="tab"
        vertical
        class="text-teal"
        inline-label
        align="left"
        active-color="#000"
      >
        <q-tab
          name="orders"
          :icon="ionFileTrayStackedOutline"
          label="История заказов"
        ></q-tab>
        <q-tab name="alarms" :icon="ionHeart" label="Избранное"></q-tab>
        <q-tab name="movies" icon="movie" label="Movies"></q-tab>
      </q-tabs>
    </div>
    <div class="user-page__content">
      <q-tab-panels
        v-model="tab"
        animated
        swipeable
        vertical
        transition-prev="jump-up"
        transition-next="jump-up"
      >
        <q-tab-panel name="orders">
          <ProfileOrderHistory :orders="profileOrders" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>
<style lang="scss">
.user-page {
  display: flex;
  gap: 15px;
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
