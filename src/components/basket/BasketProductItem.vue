<script setup>
import { computed } from "vue";
import BasePrice from "@/components/common/BasePrice.vue";
const NOIMAGE_URL = "/img/noimg.png";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const name = computed(() => props.product?.title);
const productImage = computed(
  () => props.product?.item_image_url || NOIMAGE_URL
);
const productPrice = computed(() => props.product?.price);
const productDiscountPrice = computed(() => props.product?.discount_price || 0);
const productBrand = computed(() => props.product?.brand);
</script>
<template>
  <div class="basket-product__item">
    <div class="basket-product__item-image">
      <q-img :src="productImage" :alt="name" :ratio="1" />
    </div>
    <div class="basket-product__item-body">
      <h6 class="basket-product__item-body__title">{{ name }}</h6>
      <div class="basket-product__item-body__brand">
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
    </div>
  </div>
</template>
<style lang="scss" scoped>
.basket-product__item {
  display: grid;
  grid-template-columns: 1fr 3fr;
}
</style>
