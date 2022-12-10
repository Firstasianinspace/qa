<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useBasket } from "@/stores/basket";
import BasketEmpty from "@/components/basket/BasketEmpty.vue";
import BasketSidebar from "@/components/basket/BasketSidebar.vue";
import BasketProductItem from "@/components/basket/BasketProductItem.vue";

const basketStore = useBasket();
const { basketProductCount } = basketStore;
const { basketProducts, basketTotal, discountTotal } = storeToRefs(basketStore);
const basketEmpty = computed(() => basketProductCount === 0);
</script>

<template>
  <main class="container">
    <BasketEmpty v-if="basketEmpty" />
    <div v-else class="basket-page">
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
  gap: 35px;
}
</style>
