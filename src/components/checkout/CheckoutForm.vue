<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { ionCheckmarkDoneOutline } from "@quasar/extras/ionicons-v6";

const $q = useQuasar();

const firstName = ref(null);
const lastName = ref(null);
const address = ref("");
const city = ref("");
const region = ref("");
const zipCode = ref("");
const phone = ref(null);
const email = ref("");

const stringOptions = [
  "Республика Бурятия",
  "Башкортостан",
  "Марий Эл",
  "Краснодарский",
  "Красноярский",
];
const options = ref(stringOptions);
const filterFn = (val, update) => {
  if (val === "") {
    update(() => {
      options.value = stringOptions;

      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    options.value = stringOptions.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};

const onReset = () => {
  firstName.value = null;
  lastName.value = null;
  address.value = "";
  city.value = "";
  region.value = "";
  zipCode.value = "";
  phone.value = null;
  email.value = "";
};

const isValidPhone = (val) => {
  const phonePattern =
    /(\+7|8)(\s?)([-(]?)((\d{3})([-)]?)(\s?)(\d{3})([\s-]?)(\d{2})([\s-]?)(\d{2})|(\d{4})([-)]?)(\s?)(\d{2})([\s-]?)(\d{2})([\s-]?)(\d{2}))/g;
  return phonePattern.test(val) || "Некорректный номер телефона";
};

const isValidEmail = (val) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) || "Некорректный email";
};

const emit = defineEmits(["handleClick"]);

const onSubmit = () => {
  $q.notify({
    color: "green-4",
    textColor: "white",
    icon: ionCheckmarkDoneOutline,
    message: "Успешно",
  });
  emit("handleClick");
};
</script>

<template>
  <q-form @submit="onSubmit" @reset="onReset" greedy class="checkout-form">
    <q-input
      outlined
      color="dark"
      v-model="firstName"
      label="Имя *"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Обязательное поле']"
      class="checkout-form__input checkout-form__input-name"
    />
    <q-input
      outlined
      color="dark"
      v-model="lastName"
      label="Фамилия *"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Обязательное поле']"
      class="checkout-form__input checkout-form__input-surname"
    />
    <q-input
      outlined
      color="dark"
      v-model="address"
      label="Адрес *"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Обязательное поле']"
      class="checkout-form__input checkout-form__input-address"
    />
    <q-input
      outlined
      color="dark"
      v-model="city"
      label="Город *"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Обязательное поле']"
      class="checkout-form__input checkout-form__input-city"
    />
    <q-select
      outlined
      color="dark"
      v-model="region"
      use-input
      input-debounce="0"
      label="Регион"
      :options="options"
      @filter="filterFn"
      class="checkout-form__input checkout-form__input-region"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
    </q-select>
    <q-input
      outlined
      color="dark"
      v-model="zipCode"
      label="Индекс "
      class="checkout-form__input checkout-form__input-zip"
    />
    <q-input
      outlined
      type="tel"
      color="dark"
      v-model="phone"
      mask="+7(###)###-##-##"
      label="Телефон *"
      lazy-rules
      :rules="[(val) => !!val || 'Укажите номер', isValidPhone]"
      class="checkout-form__input checkout-form__input-phone"
    />
    <q-input
      outlined
      color="dark"
      v-model="email"
      label="Email *"
      lazy-rules
      :rules="[(val) => !!val || 'Укажите Email', isValidEmail]"
      class="checkout-form__input checkout-form__input-email"
    />
    <q-btn type="submit" color="dark" label="Далее"></q-btn>
  </q-form>
</template>
<style lang="scss">
.checkout-form {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  &__input {
    &-name {
      grid-column: 1 / 4;
    }
    &-surname {
      grid-column: 4 / 7;
    }
    &-address {
      grid-column: 1 / 7;
    }
    &-city {
      grid-column: 1 / 3;
    }
    &-region {
      grid-column: 3 / 5;
    }
    &-zip {
      grid-column: 5 / 7;
    }
    &-phone {
      grid-column: 1 / 4;
    }
    &-email {
      grid-column: 4 / 7;
    }
  }
}
.vue-dadata__input {
  border: 1px solid #000;
  border-radius: 4px;
  padding: 0 12px;
  height: 56px;
  &:focus {
    box-shadow: none !important;
    border-color: #000;
  }
}
</style>
