<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ionCubeOutline, ionCardOutline } from "@quasar/extras/ionicons-v6";
import { usePayment } from "@/stores/payment";
import { useUser } from "@/stores/user";
import { useBasket } from "@/stores/basket";
import CheckoutForm from "@/components/checkout/CheckoutForm.vue";
import CheckoutSidebar from "@/components/checkout/CheckoutSidebar.vue";
import PaymentCard from "@/components/checkout/PaymentCard.vue";
import PaymentCardNew from "@/components/checkout/PaymentCardNew.vue";
import { useQuasar } from "quasar";
import { ionCheckmarkDoneOutline } from "@quasar/extras/ionicons-v6";

const $q = useQuasar();
const router = useRouter();

const paymentStore = usePayment();
const { fetchCards, purchaseItems, addCreditCard, setDefaultCard } =
  paymentStore;
const { cards, defaultCard } = storeToRefs(paymentStore);

const userStore = useUser();
const { profile } = storeToRefs(userStore);

const basketStore = useBasket();
const { basketProductIds } = storeToRefs(basketStore);

const step = ref(1);

const nextStep = () => {
  step.value = 2;
};

const goBack = () => {
  step.value = 1;
};
const paymentLoading = ref(false);
const selectedCard = ref(null);
const newCard = computed(() => selectedCard.value === "Новая карта");
const cardOptions = computed(() => cards.value);

const selected = computed(() =>
  cards.value.find((s) => s.value === selectedCard.value)
);

const submitPayment = async () => {
  try {
    paymentLoading.value = true;
    await purchaseItems(basketProductIds.value, profile.value.userID);
    paymentLoading.value = false;
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: ionCheckmarkDoneOutline,
      message: "Успешно",
    });
    router.push("/orders");
  } catch (e) {
    console.log(e);
  }
};

const submitNewCard = async (value) => {
  try {
    paymentLoading.value = true;
    // костыль сначала добавляем карту
    await addCreditCard(value);
    // потом тянем все карты
    await fetchCards(profile.value.userID);
    // потом запрос чтоб сделать последнюю добавленную карту дефолтной
    await setDefaultCard({
      card_id: cardOptions.value.at(-2).id,
      user_id: profile.value.userID,
    });
    // покупки идут по умолчанию с дефолтной карты
    await purchaseItems(basketProductIds.value, profile.value.userID);
    paymentLoading.value = false;
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: ionCheckmarkDoneOutline,
      message: "Успешно",
    });
    router.push("/orders");
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  fetchCards(profile.value.userID);
  setTimeout(() => {
    if (defaultCard.value) {
      selectedCard.value = defaultCard.value[0].value;
    }
  }, 1000);
});
</script>
<template>
  <div class="container">
    <div class="checkout-page">
      <div class="checkout-stepper">
        <q-stepper v-model="step" keep-alive vertical color="dark" animated>
          <q-step
            :name="2"
            title="Доставка"
            :icon="ionCubeOutline"
            :done="step > 1"
          >
            <CheckoutForm @handleClick="nextStep" />
          </q-step>
          <q-step
            :name="1"
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
            <PaymentCardNew
              v-if="newCard"
              @submitNewCard="submitNewCard"
              @goBack="goBack"
            />
            <PaymentCard
              v-else
              :card="selected"
              @submitExistedCard="submitPayment()"
              @goBack="goBack"
            />
          </q-step>
        </q-stepper>
        <q-inner-loading :showing="paymentLoading">
          <q-spinner-gears size="50px" color="dark" />
        </q-inner-loading>
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
.checkout-stepper {
  position: relative;
}
.q-inner-loading {
  z-index: 1000000;
}
</style>
