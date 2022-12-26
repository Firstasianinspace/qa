<script setup>
import { ref } from "vue";
import { useAdmin } from "@/stores/admin";

const { addProductToDatabase } = useAdmin();

const product = ref({
  brand_id: null,
  category_id: null,
  description: null,
  title: null,
  item_image_url: null,
  price: null,
  discount_price: null,
});

const addProduct = () => {
  console.log(product.value);
  addProductToDatabase(product.value);
};
</script>
<template>
  <div class="admin">
    <h1>This is an admin page</h1>
    <q-form @submit="addProduct" greedy class="checkout-form">
      <q-input
        outlined
        color="dark"
        v-model="product.title"
        label="title *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Обязательное поле']"
      />
      <q-input
        outlined
        color="dark"
        v-model="product.brand_id"
        label="brand_id *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Обязательное поле']"
      />
      <q-input
        outlined
        color="dark"
        v-model="product.category_id"
        label="category_id *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Обязательное поле']"
      />
      <q-input
        outlined
        color="dark"
        v-model="product.description"
        label="description *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Обязательное поле']"
      />
      <q-input
        outlined
        color="dark"
        v-model="product.discount_price"
        label="discount_price *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Обязательное поле']"
      />
      <q-input outlined color="dark" v-model="product.price" label="price " />
      <q-input
        outlined
        color="dark"
        v-model="product.item_image_url"
        label="item_image_url *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Обязательное поле']"
      />
      <q-btn type="submit" color="dark" label="Далее"></q-btn>
    </q-form>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .admin {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
