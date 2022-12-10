<script setup>
import { useRouter } from "vue-router";
import { ionCartOutline } from "@quasar/extras/ionicons-v6";

const router = useRouter();

const goToCatalog = () => {
  router.push("/catalog");
};
</script>
<template>
  <div class="basket-empty">
    <q-icon :name="ionCartOutline" size="72px" />
    <h3>Корзина пуста</h3>
    <p>Добавь что нибудь в корзину</p>
    <q-btn color="black" label="В каталог" @click="goToCatalog"></q-btn>
  </div>
</template>
<style lang="scss" scoped>
.basket-empty {
  height: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
