<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useBasket } from "@/stores/basket";
import BasePrice from "@/components/common/BasePrice.vue";
import BaseCounter from "@/components/common/BaseCounter.vue";
const NOIMAGE_URL = "/img/noimg.png";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
const basketStore = useBasket();
const { removeProductFromBasket, changeQuantity } = basketStore;
const { basketProducts } = storeToRefs(basketStore);
const name = computed(() => props.product?.title);
const productImage = computed(
  () => props.product?.item_image_url || NOIMAGE_URL
);
const productPrice = computed(() => props.product?.price);
const productDiscountPrice = computed(() => props.product?.discount_price || 0);
const productBrand = computed(() => props.product?.brand);
const productQuantity = computed(() => {
  let quantity = null;
  for (const item of basketProducts.value) {
    if (item.item_id === props.product.item_id) {
      quantity = item.quantity;
    }
  }
  return quantity;
});
const updateProductQuantity = (value) => {
  if (value === 0) {
    removeProductFromBasket(props.product);
  }
  changeQuantity(props.product.item_id, value);
};
</script>
<template>
  <div class="basket-product__item">
    <div class="basket-product__item-image">
      <q-img :src="productImage" :alt="name" :ratio="1" />
    </div>
    <div class="basket-product__item-body">
      <h6 class="basket-product__item-body__title">{{ name }}</h6>
      <div v-if="productBrand" class="basket-product__item-body__brand">
        <q-badge outline align="middle" color="black">
          {{ productBrand }}
        </q-badge>
      </div>
      <div class="basket-product__item-body__price">
        <BasePrice
          :price="productPrice"
          :discount-price="productDiscountPrice"
        />
      </div>
      <div class="basket-product__item-body__count">
        <BaseCounter
          :quantity="productQuantity"
          @changeQuantity="updateProductQuantity"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.basket-product__item {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 10px;
  margin: 0 0 15px 0;
  &-body {
    display: grid;
    grid-template-rows: auto auto auto;
    grid-template-columns: 1fr 1fr;
    &__title {
      grid-column: 1 / 3;
    }
    &__brand {
      grid-column: 1 / 3;
      grid-row: 2 / 2;
    }
    &__price {
      grid-column: 1 / 1;
      grid-row: 3 / 3;
      & .base-price {
        flex-direction: column;
        align-items: flex-start;
      }
    }
    &__count {
      grid-column: 2 / 2;
      grid-row: 3 / 3;
    }
  }
}
</style>
