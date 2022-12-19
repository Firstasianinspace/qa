<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { formatPrice } from "@/helpers";

const props = defineProps({
  total: Number,
  discount: Number,
});
const router = useRouter();

const discountPrice = computed(() => formatPrice(props.discount));
const totalPrice = computed(() => formatPrice(props.total));

const goToCheckout = () => {
  router.push("/checkout");
};
</script>
<template>
  <div class="basket-sidebar">
    <div class="basket-sidebar__inner">
      <h5>Order Summary</h5>
      <div class="property">
        <span>Доставка</span>
        <span>Бесплатно</span>
      </div>
      <div class="property">
        <span>Скидка</span>
        <span>{{ discountPrice }}</span>
      </div>
      <div class="property">
        <span>Итого</span>
        <span>{{ totalPrice }}</span>
      </div>
    </div>
    <q-btn color="black" label="К оплате" @click="goToCheckout"></q-btn>
  </div>
</template>
<style lang="scss" scoped>
.basket-sidebar {
  box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
    0 3px 1px -2px rgb(0 0 0 / 12%);
  border-radius: 4px;
  background: #fff;
  max-height: 200px;
  &__inner {
    padding: 15px 10px;
  }
  & .q-btn {
    margin: 10px;
  }
}
</style>
