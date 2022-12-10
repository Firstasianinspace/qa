<!-- <template>
  <div class="header-cart__list">
    <div class="header-cart__list-header">
      Моя корзина, {{ pluralProducts }}
    </div>
    <div class="header-cart__list-body">
      <HeaderCartListItem
        v-for="(product, index) in products"
        :key="index"
        :product="product"
      />
    </div>
    <div class="header-cart__list-footer">
      <div class="header-cart__list-footer_total">
        Всего
        <div class="header-cart__list-footer_total-amount">
          {{ basketTotal | formatPrice }}
          <span class="header-cart__list-footer_total-amount-symbol">руб.</span>
        </div>
      </div>
      <div class="header-cart__list-footer_btns">
        <custom-button
          :label="'Просмотреть корзину'"
          class="header-cart__list-footer_btns-single"
          @click="handleClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { pluralProducts } from "@/helpers";

export default {
  name: "HeaderCartList",
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    quantity: {
      type: Number,
      default: null,
    },
    basketTotal: {
      type: Number,
      default: null,
    },
  },
  computed: {
    pluralProducts: (vm) =>
      vm.quantity > 0 ? pluralProducts(vm.quantity) : "пустая",
  },
  methods: {
    handleClick() {
      this.$router.push("/checkoutPage");
    },
  },
};
</script>

<style lang="scss" scoped>
.header-cart__list {
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 300px;
  min-height: 250px;
  z-index: 100;
  background: #fff;
  border: 1px solid #767676;

  &:before {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    top: -10px;
    right: 13px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #767676;
  }
  &-header {
    padding: 10px;
    background: #767676;
  }

  &-body {
    overflow-y: scroll;
    max-height: 400px;
  }

  &-footer {
    width: 100%;
    padding: 10px;
    background: #bdbdbd;
    &_total {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    &_btns {
      padding: 10px 0;
      &-single {
        width: 100%;
      }
    }
  }
}
</style> -->
