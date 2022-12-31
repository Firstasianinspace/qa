<script setup>
import { computed } from "vue";
import { useUser } from "@/stores/user";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import ProfileOrderItem from "@/components/profile/ProfileOrderItem.vue";

const useStore = useUser();
const { profileOrders } = storeToRefs(useStore);
const route = useRoute();

defineProps({
  order: {
    type: Object,
  },
});

const order = computed(() => {
  return profileOrders.value.find((s) => s.id === route.params.id);
});

const orderID = computed(() => order.value.id || 0);
const orderDate = computed(() => order.value?.date);
const orderCardID = computed(() => order.value?.card_id);
const orderProducts = computed(() => order.value.products);
</script>
<template>
  <div class="profile-order-details">
    <div class="profile-order-details__title">
      Номер заказа <span>{{ orderID }}</span>
    </div>
    <div class="profile-order-details__card">
      ID банковской карты - <span>{{ orderCardID }}</span>
    </div>
    <div class="profile-order-details__date">{{ orderDate }}</div>
    <div class="profile-order-details__products">
      <div class="profile-order-details__products-header">Товары</div>
      <ProfileOrderItem
        v-for="product in orderProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<style lang="scss">
.profile-order-details {
  &__products {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: repeat(4, 1fr);
    row-gap: 10px;
    &-header {
      grid-column: 1 / 5;
    }
  }
}
</style>
