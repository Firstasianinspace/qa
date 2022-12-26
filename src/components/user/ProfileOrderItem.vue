<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useCatalog } from "@/stores/catalog";
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
</script>
<template>
  <div class="profile-order-item">
    <div class="profile-order-item__image">
      <q-img :src="productImage" :ratio="1" />
    </div>
    {{ productItem.title }}
    <h6>{{ product.quantity }}</h6>
  </div>
</template>
<style lang="scss">
.profile-order-item {
  max-height: 200px;
  &__image {
    max-width: 100px;
  }
}
</style>
