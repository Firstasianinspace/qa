<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useBasket } from "@/stores/basket";
import {
  ionCartOutline,
  ionHeartOutline,
  ionHeart,
  ionCheckmark,
} from "@quasar/extras/ionicons-v6";
import BasePrice from "@/components/common/BasePrice.vue";
const NOIMAGE_URL = "/img/noimg.png";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const basketStore = useBasket();
const {
  addProductToBasket,
  removeProductFromBasket,
  addProductToFavorites,
  removeProductFromFavorites,
} = basketStore;
const { basketProducts, favoriteProducts } = storeToRefs(basketStore);
const isFavoriteProduct = computed(() =>
  favoriteProducts.value.includes(props.product)
);

const isAddedProduct = computed(() =>
  basketProducts.value.includes(props.product)
);

const toggleFavorite = (product) => {
  if (isFavoriteProduct.value) {
    removeProductFromFavorites(product);
  } else {
    addProductToFavorites(product);
  }
};

const toggleProduct = (product) => {
  if (isAddedProduct.value) {
    removeProductFromBasket(product);
  } else {
    addProductToBasket(product);
  }
};

const name = computed(() => props.product?.title);
const productImage = computed(
  () => props.product?.item_image_url || NOIMAGE_URL
);
const productPrice = computed(() => props.product?.price);
const productDiscountPrice = computed(() => props.product?.discount_price || 0);
const productBrand = computed(() => props.product?.brand);

const dynamicIcon = computed(() =>
  isFavoriteProduct.value ? ionHeart : ionHeartOutline
);

const dynamicButtonIcon = computed(() =>
  isAddedProduct.value ? ionCheckmark : ionCartOutline
);
const dynamicButtonLabel = computed(() =>
  isAddedProduct.value ? "Added to Bag" : "Add to bag"
);
const dynamicButtonClass = computed(() =>
  isAddedProduct.value ? "button-white" : "button-black"
);
</script>
<template>
  <div class="product-grid-card">
    <div class="product-grid-card__favorite">
      <q-icon
        :name="dynamicIcon"
        size="24px"
        @click="toggleFavorite(product)"
      />
    </div>
    <div class="product-grid-card__image">
      <q-img :src="productImage" :alt="name" :ratio="1" />
    </div>
    <div class="product-grid-card__body">
      <h6 class="product-grid-card__body-title">{{ name }}</h6>
      <div class="product-grid-card__body-brand">
        <q-badge v-if="productBrand" outline align="middle" color="black">
          {{ productBrand }}
        </q-badge>
      </div>
      <div class="product-grid-card__body-price">
        <BasePrice
          :price="productPrice"
          :discount-price="productDiscountPrice"
        />
      </div>
    </div>
    <div class="product-grid-card__footer">
      <q-btn
        :class="dynamicButtonClass"
        :icon="dynamicButtonIcon"
        :label="dynamicButtonLabel"
        @click="toggleProduct(product)"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.product-grid-card {
  display: grid;
  grid-template-rows: 205px auto auto;
  position: relative;
  &__favorite {
    position: absolute;
    top: 5%;
    right: 5%;
    cursor: pointer;
    z-index: 10;
  }
  &__image {
  }
  &__body {
    text-align: center;
    &-title {
      font-size: 14px;
      line-height: 120%;
    }
    &-brand {
      margin: 5px 0;
    }
  }
  &__footer {
    margin-top: auto;
    .q-btn {
      width: 100%;
    }
  }
}
.button-black {
  color: #fff;
  background: #000;
}
</style>
