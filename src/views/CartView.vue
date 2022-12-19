<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useBasket } from "@/stores/basket";
import BasketEmpty from "@/components/basket/BasketEmpty.vue";
import BasketSidebar from "@/components/basket/BasketSidebar.vue";
import BasketProductItem from "@/components/basket/BasketProductItem.vue";

const basketStore = useBasket();
const { clearBasket } = basketStore;
const { basketProducts, basketTotal, discountTotal, basketProductCount } =
  storeToRefs(basketStore);
const basketEmpty = computed(() => basketProductCount.value === 0);
</script>

<template>
  <main class="container">
    <BasketEmpty v-if="basketEmpty" />
    <div v-else class="basket-page">
      <div class="basket-page__header">
        <h6>Корзина</h6>
        <q-btn color="black" label="Очистить" @click="clearBasket()"></q-btn>
      </div>
      <div class="basket-page__items">
        <BasketProductItem
          v-for="product in basketProducts"
          :key="product.item_id"
          :product="product"
        />
      </div>
      <BasketSidebar :total="basketTotal" :discount="discountTotal" />
    </div>
  </main>
</template>
<style lang="scss" scoped>
.basket-page {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 35px;
  &__header {
    grid-column: 1 / 1;
    grid-row: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__items {
    grid-column: 1 / 1;
    grid-row: 2 / 2;
  }
  & .basket-sidebar {
    grid-row: 1 / 3;
  }
}
</style>
