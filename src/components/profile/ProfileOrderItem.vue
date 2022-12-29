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
  <div class="profile-order-item">
    <div v-if="displayAdditionalItems" class="profile-order-item__additional">
      <q-icon :name="ionAddOutline" size="36px" color="white" />
    </div>
    <div v-else class="profile-order-item__inner">
      <div class="profile-order-item__inner-image">
        <q-img :src="productImage" :ratio="1" />
      </div>
      <div class="profile-order-item__inner-quantity">
        x{{ product.quantity }}
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.profile-order-item {
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding: 5px 10px;
  &__additional {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.555);
  }
  &__inner {
    position: relative;
    &-quantity {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 24px;
      font-weight: 700;
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.555);
    }
  }
}
</style>
