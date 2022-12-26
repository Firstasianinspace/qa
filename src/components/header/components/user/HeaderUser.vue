<script setup>
import { ionPersonOutline } from "@quasar/extras/ionicons-v6";
import { useRouter } from "vue-router";

const router = useRouter();

const goToUser = () => {
  router.push("/user");
};
</script>
<template>
  <div class="header-services__item">
    <span>My Account</span>
    <q-icon :name="ionPersonOutline" size="18px" />
    <q-menu auto-close>
      <q-list style="min-width: 100px">
        <q-item clickable>
          <q-item-section
            ><router-link to="/favorites">
              Избранное
            </router-link></q-item-section
          >
        </q-item>
        <q-item clickable>
          <q-item-section
            ><router-link to="/orders">
              История заказов
            </router-link></q-item-section
          >
        </q-item>
        <q-item clickable>
          <q-item-section
            ><router-link to="/personal">
              Настройки
            </router-link></q-item-section
          >
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>
<style lang="scss" scoped>
.header-services__item {
  cursor: pointer;
}
</style>
