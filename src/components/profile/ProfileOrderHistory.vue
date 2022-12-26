<script setup>
import { computed } from "vue";
import { convertISODateToString, countDuplicates } from "@/helpers";
import ProfileOrderItem from "@/components/profile/ProfileOrderItem.vue";
const props = defineProps({
  orders: {
    type: Array,
  },
});

const orderItems = computed(() =>
  props.orders.map((s) => ({
    ...s,
    date: convertISODateToString(s.buy_date),
    products: countDuplicates(s.item_id),
  }))
);
</script>
<template>
  <div class="profile-order-history">
    <div
      class="profile-order-history__item"
      v-for="item in orderItems"
      :key="item.id"
    >
      <div class="profile-order-history__item-header">
        <p>{{ item.id }}</p>
        <p>{{ item.date }}</p>
      </div>
      <ProfileOrderItem
        v-for="(product, index) in item.products"
        :key="index"
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
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
