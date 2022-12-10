<script setup>
import { computed } from "vue";
import { formatPrice } from "@/helpers";

const props = defineProps({
  price: {
    type: [Number, String],
    default: 0,
  },
  discountPrice: {
    type: [Number, String],
    default: 0,
  },
});

const priceCurrent = computed(() => formatPrice(props.price));
const priceDiscount = computed(() => formatPrice(props.discountPrice));
const classes = computed(() => (priceDiscount.value ? "has-discount" : null));
</script>
<template>
  <div :class="classes" class="base-price">
    <div v-if="priceDiscount" class="base-price__discount">
      {{ priceDiscount }} <span>₽</span>
    </div>
    <div class="base-price__old">{{ priceCurrent }} <span>₽</span></div>
  </div>
</template>
<style lang="scss">
.base-price {
  display: flex;
  align-items: center;
  justify-content: center;
}
.has-discount {
  & .base-price__old {
    opacity: 0.5;
  }
}
</style>
