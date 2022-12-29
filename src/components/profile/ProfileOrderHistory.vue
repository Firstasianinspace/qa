<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { convertISODateToString, addMockObjectToArray } from "@/helpers";
import ProfileOrderItem from "@/components/profile/ProfileOrderItem.vue";

const props = defineProps({
  orders: {
    type: Array,
  },
});

const router = useRouter();

const orderItems = computed(() =>
  props.orders
    .map((s) => ({
      ...s,
      date: convertISODateToString(s.buy_date),
      products: addMockObjectToArray(s.item_id),
    }))
    .reverse()
);

const goToOrderDetails = (id) => {
  router.push({
    name: "profile-order-details",
    path: `/order/`,
    params: {
      id,
    },
  });
};
</script>
<template>
  <div class="profile-order-history">
    <div
      class="profile-order-history__item"
      v-for="item in orderItems"
      :key="item.id"
      @click="goToOrderDetails(item.id)"
    >
      <div class="profile-order-history__item-header">
        <div class="profile-order-histore__item-header-id">
          <span>Номер заказа </span><span>{{ item.id }}</span>
        </div>
        <p>{{ item.date }}</p>
      </div>
      <ProfileOrderItem
        v-for="product in item.products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
<style lang="scss">
.profile-order-history {
  &__item {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: repeat(4, 1fr);
    row-gap: 10px;
    &-header {
      grid-column: 1 / 6;
      display: flex;
      justify-content: space-between;
      padding: 5px 10px;
      background: lightgrey;
      & p {
        margin: 0;
      }
    }
  }
}
</style>
