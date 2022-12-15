<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { ionCubeOutline, ionCardOutline } from "@quasar/extras/ionicons-v6";
import { usePayment } from "@/stores/payment";
import CheckoutForm from "@/components/checkout/CheckoutForm.vue";
import CheckoutSidebar from "@/components/checkout/CheckoutSidebar.vue";
import PaymentCard from "@/components/checkout/PaymentCard.vue";
import PaymentCardNew from "@/components/checkout/PaymentCardNew.vue";

const paymentStore = usePayment();
const { fetchCards } = paymentStore;
const { cards, defaultCard } = storeToRefs(paymentStore);

const step = ref(1);

const nextStep = () => {
  step.value = 2;
};

const selectedCard = ref(null);
const newCard = computed(() => selectedCard.value === "Новая карта");
const cardOptions = computed(() => cards.value);

const selected = computed(() =>
  cards.value.find((s) => s.value === selectedCard.value)
);

onMounted(() => {
  fetchCards();
  setTimeout(() => {
    if (defaultCard.value) {
      selectedCard.value = defaultCard.value[0].value;
    }
  }, 300);
});
</script>
<template>
  <div class="container">
    <div class="checkout-page">
      <div class="checkout-stepper">
        <q-stepper v-model="step" vertical color="dark" animated>
          <q-step
            :name="1"
            title="Доставка"
            :icon="ionCubeOutline"
            :done="step > 1"
          >
            <CheckoutForm @handleClick="nextStep" />
          </q-step>
          <q-step
            :name="2"
            title="Оплата"
            :icon="ionCardOutline"
            :done="step > 2"
          >
            <q-select
              outlined
              v-model="selectedCard"
              :options="cardOptions"
              emit-value
            ></q-select>
            <PaymentCardNew v-if="newCard" />
            <PaymentCard v-else :card="selected" />
            <q-stepper-navigation>
              <q-btn color="dark" label="Continue"></q-btn>
              <q-btn
                flat
                @click="step = 1"
                color="dark"
                label="Back"
                class="q-ml-sm"
              ></q-btn>
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </div>
      <CheckoutSidebar />
    </div>
  </div>
</template>

<style lang="scss">
.checkout-page {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 35px;
}
</style>
