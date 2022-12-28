<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useCatalog } from "@/stores/catalog";
import { ionAddOutline } from "@quasar/extras/ionicons-v6";
const NOIMAGE_URL = "/img/noimg.png";

const catalogStore = useCatalog();
const { products } = storeToRefs(catalogStore);

const props = defineProps({
  product: {
    type: Object,
  },
});

const productItem = computed(() => {
  return products.value.find((s) => s.item_id === props.product.id);
});
const productImage = computed(
  () => productItem.value?.item_image_url || NOIMAGE_URL
);

const displayAdditionalItems = computed(() => props.product.mock);
</script>
<template>
  <div class="profile-order-item__wrapper">
    <div v-if="displayAdditionalItems" class="profile-order-item__additional">
      <q-icon :name="ionAddOutline" size="36px" />
    </div>
    <div v-else class="profile-order-item">
      <div class="profile-order-item__image">
        <q-img :src="productImage" :ratio="1" />
      </div>
      <div class="profile-order-item__title">
        {{ productTitleTruncate }}
      </div>
      <div class="product-order-item__quantity">x{{ product.quantity }}</div>
    </div>
  </div>
</template>
<style lang="scss">
.profile-order-item {
}
</style>
