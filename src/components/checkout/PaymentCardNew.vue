<script setup>
import { ref, computed } from "vue";

const newCard = ref({
  number: null,
  cvv: null,
  expiration_date: null,
  name: null,
  user_id: null,
});

const date = ref(null);

// MEGA костыль
const isDateValid = (value) => {
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2);
  const cardMonth = Number(value.slice(0, 2));
  const cardYear = Number(value.slice(-2));
  return (cardMonth < 13 && cardYear > parseInt(year)) || "Неверно";
  // const today = new Date();
  // const year = today.getFullYear();
  // const month = today.getMonth();
  // const cardMonth = value.slice(0, 2);
  // const cardYear = value.slice(-2);
  // return
};
</script>

<template>
  <form class="payment-card__new">
    <div class="payment-card payment-card__front">
      <q-input
        color="dark"
        v-model="newCard.number"
        label="Номер карты"
        mask="#### #### #### ####"
        fill-mask="#"
        class="payment-card__input-number"
      />
      <div class="payment-card__date">
        <div class="payment-card__date-label">Действует до</div>
        <q-input
          color="dark"
          v-model="date"
          label="ММ / ГГ"
          mask="## / ##"
          :rules="[(val) => !!val || 'Укажите дату', isDateValid]"
          class="payment-card__input-date"
        />
      </div>
    </div>
    <div class="payment-card payment-card__back">
      <div class="payment-card__back-cvv_label">Код безопасности</div>
      <q-input
        color="dark"
        v-model="newCard.cvv"
        label="CVV / CVC"
        type="tel"
        maxlength="3"
        lazy-rules
        :rules="[(val) => (val && val.length < 3) || 'Неверно']"
        class="payment-card__back-cvv"
      />
    </div>
  </form>
</template>
<style lang="scss">
.payment-card {
  &__new {
    height: 250px;
    position: relative;
  }
  &__front {
    position: absolute;
    z-index: 1;
    background: #fdfdfd;
  }
  &__back {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: column;
    position: absolute;
    right: 80px;
    bottom: -10px;
    z-index: 0;
    &-cvv {
      max-width: 80px;
    }
    &::after {
      content: "";
      width: 100%;
      height: 40px;
      background: #727272;
      position: absolute;
      top: 30px;
      right: 0;
    }
  }
  &__date {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 15px;
    padding: 15px 0 0 0;
    &-label {
      font-size: 16px;
      padding: 5px 0 0 0;
    }
  }
  &__input {
    &-date {
      max-width: 100px;
    }
  }
}
</style>
