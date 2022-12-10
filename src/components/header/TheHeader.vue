<script setup>
import { computed } from "vue";
import HeaderServices from "@/components/header/components/HeaderServices.vue";

const HEADER_LOGO_URL = "/img/hydra.svg";

const storeLogo = computed(() => HEADER_LOGO_URL);
</script>
<template>
  <header class="header">
    <div class="header-inner">
      <div class="header-info">
        <router-link to="/">EN</router-link>
        <!-- <router-link to="/">Lookbook</router-link>
        <router-link to="/">Editorial</router-link> -->
      </div>
      <router-link class="header-logo" to="/catalog">
        <img :src="storeLogo" :alt="'storeName'" />
      </router-link>
      <HeaderServices />
    </div>
  </header>
</template>
<style lang="scss" scoped>
.header {
  max-width: 1024px;
  margin: 0 auto;
  padding: 15px 0;
  position: relative;

  &-inner {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  &-info {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    & a {
      color: #000;
      margin: 0 30px 0 0;
      text-decoration: none;
    }
  }

  &-logo {
    justify-self: center;
    height: 80px;

    & img {
      width: 80px;
      height: 80px;
    }
  }

  &-search {
    flex-basis: 50%;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
