<script setup>
import { ref } from "vue";
import CheckoutForm from "@/components/checkout/CheckoutForm.vue";
import CheckoutSidebar from "@/components/checkout/CheckoutSidebar.vue";
import { ionCubeOutline } from "@quasar/extras/ionicons-v6";
import { ionCardOutline } from "@quasar/extras/ionicons-v6";

const step = ref(1);

const nextStep = () => {
  step.value = 2;
};
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
            caption="Optional"
            :icon="ionCardOutline"
            :done="step > 2"
          >
            An ad group contains one or more ads which target a shared set of
            keywords.

            <q-stepper-navigation>
              <q-btn @click="step = 4" color="dark" label="Continue"></q-btn>
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
