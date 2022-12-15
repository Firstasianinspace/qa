<script setup>
import { ref } from "vue";

const props = defineProps({
  quantity: Number,
});

const count = ref(props.quantity);

const emit = defineEmits(["update:quantity", "changeQuantity"]);

// const productQuantity = computed({
//   get: () => props.quantity,
//   set: (value) => emit("update:quantity", value),
// });

const updateQuantity = (value) => {
  emit("changeQuantity", value);
};

const incrementQuantity = () => {
  emit("changeQuantity", (count.value += 1));
};

const decrementQuantity = () => {
  emit("changeQuantity", (count.value -= 1));
};
</script>
<template>
  <div class="counter">
    <q-btn
      :ripple="{ center: true }"
      color="dark"
      no-caps
      @click="decrementQuantity()"
      >-</q-btn
    >
    <q-input
      outlined
      color="dark"
      v-model.number="count"
      @update:model-value="updateQuantity"
      type="tel"
      lazy-rules
      class="counter-input"
    />
    <q-btn
      :ripple="{ center: true }"
      color="dark"
      no-caps
      @click="incrementQuantity()"
      >+</q-btn
    >
  </div>
</template>
<style lang="scss">
.counter {
  display: flex;
  flex-direction: row;
  gap: 5px;
  &-input {
    max-height: 36px;
    .q-field__control {
      height: 36px;
      & input {
        text-align: center;
      }
    }
  }
}
</style>
