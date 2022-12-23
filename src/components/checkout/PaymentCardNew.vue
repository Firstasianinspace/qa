<script setup>
import { ref, computed } from "vue";
import { useUser } from "@/stores/user";
import { storeToRefs } from "pinia";

const userStore = useUser();
const { profile } = storeToRefs(userStore);

const emit = defineEmits(["submitNewCard", "goBack"]);

const date = ref(null);
// MEGA костыль x3
const dateFormatted = computed(() => {
  if (date.value?.length >= 7) {
    return convertDateToIso(date.value);
  }
  return null;
});

const newCard = ref({
  number: null,
  cvv: null,
  expiration_date: dateFormatted.value,
  name: null,
  user_id: profile.value.userID,
});

// MEGA костыль
const isDateValid = (value) => {
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2);
  const cardMonth = Number(value.slice(0, 2));
  const cardYear = Number(value.slice(-2));
  return (cardMonth < 13 && cardYear > parseInt(year)) || "Неверно";
};
// MEGA костыль x2
const convertDateToIso = (value) => {
  const getFullDate = `20${value.slice(-2)}-${value.slice(0, 2)}-01`;
  const date = new Date(getFullDate);
  const iso = date.toISOString();
  newCard.value.expiration_date = iso;
  return iso;
};

const onSubmit = () => {
  emit("submitNewCard", newCard.value);
};

const goStepBack = () => {
  emit("goBack");
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="payment-card__new">
    <div class="payment-card payment-card__front">
      <q-input
        color="dark"
        v-model="newCard.number"
        label="Номер карты"
        mask="#### #### #### ####"
        fill-mask="#"
        class="payment-card__input-number"
        :rules="[(val) => !!val || 'Обязательное поле']"
      />
      <div class="payment-card__name-date">
        <q-input
          color="dark"
          v-model="newCard.name"
          label="Имя фамилия"
          :rules="[(val) => !!val || 'Обязательное поле']"
          class="payment-card__input-name"
        />
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
        :rules="[(val) => (val && val.length === 3) || 'Неверно']"
        class="payment-card__back-cvv"
      />
    </div>
    <q-btn label="Купить" type="submit" color="dark" />
    <q-btn @click="goStepBack" label="Назад" color="dark" />
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
  &__name-date {
    display: flex;
    gap: 15px;
  }
  &__date {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 15px;
    padding: 15px 0 0 0;
  }
  &__input {
    &-date {
      max-width: 100px;
    }
  }
}
</style>
