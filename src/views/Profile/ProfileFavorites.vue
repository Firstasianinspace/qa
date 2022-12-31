<script setup>
import { computed } from "vue";
import { useBasket } from "@/stores/basket";
import { storeToRefs } from "pinia";
import ProductGridCard from "@/components/catalog/ProductGridCard.vue";

const basketStore = useBasket();
const { favoriteProducts } = storeToRefs(basketStore);
</script>
<template>
  <div class="profile-order-favorites">
    <ProductGridCard
      v-for="product in favoriteProducts"
      :key="product.item_id"
      :product="product"
    />
  </div>
</template>

<style lang="scss">
.profile-order-favorites {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
</style>
