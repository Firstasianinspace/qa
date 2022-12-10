<script setup>
import HeaderUser from "@/components/header/components/user/HeaderUser.vue";
import HeaderSearch from "@/components/header/components/search/HeaderSearch.vue";
import HeaderCart from "@/components/header/components/cart/HeaderCart.vue";

const emit = defineEmits(["toggle"]);

const handleClick = () => {
  emit("toggle");
};
</script>
<template>
  <div class="header-services">
    <HeaderSearch @click="handleClick" />
    <HeaderCart />
    <HeaderUser />
  </div>
</template>
<style lang="scss">
.header {
  &-services {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;

    &__item {
      display: flex;
      align-items: center;
      margin: 0 0 0 30px;
      color: #000;
      text-decoration: none;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
  }
}
</style>
