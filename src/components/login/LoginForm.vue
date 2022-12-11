<script setup>
import { ref } from "vue";
import { useUser } from "@/stores/user";
import { useRouter } from "vue-router";
import { ionWarningOutline } from "@quasar/extras/ionicons-v6";
import { useQuasar } from "quasar";

const { authLogin } = useUser();
const router = useRouter();

const $q = useQuasar();
const username = ref(null);
const password = ref(null);

const onSubmit = async () => {
  try {
    await authLogin({
      username: username.value,
      password: password.value,
    });
    setTimeout(() => {
      router.push("/catalog");
    }, 1000);
  } catch (e) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: ionWarningOutline,
      iconColor: "white",
      message: e.response?.data?.message || "Неизвестная ошибка",
    });
  }
};

const onReset = () => {
  username.value = null;
  password.value = null;
};
</script>

<template>
  <q-form @submit="onSubmit" @reset="onReset" class="username-form">
    <q-input
      outlined
      color="dark"
      v-model="username"
      label="Your username *"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    />

    <q-input
      outlined
      color="dark"
      type="password"
      v-model="password"
      label="Your password *"
      lazy-rules
      :rules="(val) => (val !== null && val !== '') || 'Please type something'"
    />
    <div>
      <q-btn label="Login" type="submit" color="primary"></q-btn>
      <q-btn
        label="Reset"
        type="reset"
        color="primary"
        flat
        class="q-ml-sm"
      ></q-btn>
    </div>
  </q-form>
</template>
<style lang="scss">
.username-form {
  padding: 15px 25px;
  background: #fff;
  width: 340px;
  &__button {
  }
}

.submit-btn {
  margin: 15px 0 0 0;
  width: 100%;
  padding: 8.5px;
  background: #000;
  border: none;
  color: #fff;
  text-transform: uppercase;
  transition: all 0.3s ease-in;

  &__disabled {
    pointer-events: none;
    background: none;
    border: 1px solid #000;
    color: #000;
  }
}
</style>
