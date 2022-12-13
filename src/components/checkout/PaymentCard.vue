<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  card: {
    type: Object,
  },
});

const cvv = ref(null);

const cardNumber = computed(() => props.card?.label);
const isValidCvv = (val) => {
  return val === props.card.cvv || "Неверно";
};
</script>
<template>
  <div class="payment-card">
    <!-- <h6 class="payment-card__title">{{ cardName }}</h6> -->
    <p class="payment-card__number">
      {{ cardNumber }}
    </p>
    <q-input
      outlined
      color="dark"
      v-model="cvv"
      label="CVV / CVC"
      lazy-rules
      :rules="[(val) => !!val || 'Неверно', isValidCvv]"
      class="payment-card__cvv"
    />
    <p>Код безопасности</p>
  </div>
</template>
<style lang="scss">
.payment-card {
  width: 320px;
  height: 198px;
  margin-top: 30px;
  margin-right: auto;
  padding: 24px;
  background: #f3f4f6;
  border: 1px solid #b8b8b8;
  border-radius: 8px;
  &__number {
    color: #585858;
    font-size: 18px;
  }
  &__cvv {
    max-width: 104px;
  }
}
</style>
