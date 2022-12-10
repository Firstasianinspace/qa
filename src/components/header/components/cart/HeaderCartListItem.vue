<!-- <template>
  <div class="header-cart__list-item">
    <div class="header-cart__list-item-image">
      <custom-image :src="productImage" class="product-card__image" alt="img" />
    </div>
    <div class="header-cart__list-item-title">
      {{ productName }}
    </div>
    <div class="header-cart__list-item-price">
      {{ productPrice | formatPrice }}
      <span class="product-card__footer-price-symbol">руб.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderCartListItem",
  props: {
    product: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  computed: {
    productName: (vm) => vm.product?.item || vm.defaultName,
    productImage: (vm) => vm.product?.image,
    productPrice: (vm) => vm.product?.price,
  },
};
</script>

<style lang="scss" scoped>
.header-cart {
  &__list {
    &-item {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      padding: 10px;
      border-bottom: 1px solid #222;
      &-image {
        grid-column: 1 / 1;
        grid-row: 1 / 3;
      }

      &-title {
        grid-column: 2 / 2;
        grid-row: 1 / 1;
      }

      &-price {
        grid-column: 2 / 2;
        grid-row: 2 / 2;
      }
    }
  }
}
</style> -->
