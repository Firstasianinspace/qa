<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useBasket } from "@/stores/basket";
import {
  ionCartOutline,
  ionHeartOutline,
  ionHeart,
} from "@quasar/extras/ionicons-v6";
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
const {
  addProductToBasket,
  removeProductFromBasket,
  addProductToFavorites,
  removeProductFromFavorites,
  changeQuantity,
} = basketStore;
const { basketProducts, basketProductIds, favoriteProducts } =
  storeToRefs(basketStore);
const isFavoriteProduct = computed(() =>
  favoriteProducts.value.includes(props.product)
);

const isAddedProduct = computed(() =>
  basketProductIds.value.includes(props.product.item_id)
);

const toggleFavorite = (product) => {
  if (isFavoriteProduct.value) {
    removeProductFromFavorites(product);
  } else {
    addProductToFavorites(product);
  }
};

const addProduct = (product) => {
  addProductToBasket(product);
};

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

const displayCounter = computed(() => isAddedProduct.value);

const updateProductQuantity = (value) => {
  if (value === 0) {
    removeProductFromBasket(props.product);
  }
  changeQuantity(props.product.item_id, value);
};

const dynamicIcon = computed(() =>
  isFavoriteProduct.value ? ionHeart : ionHeartOutline
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
      <BaseCounter
        v-if="displayCounter"
        :quantity="productQuantity"
        @changeQuantity="updateProductQuantity"
      />
      <q-btn
        v-else
        class="button-black"
        :icon="ionCartOutline"
        label="Add to bag"
        @click="addProduct(product)"
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
