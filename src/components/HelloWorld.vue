<script setup lang="ts">
import { useUser } from "@/stores/user";
import { useCatalog } from "@/stores/catalog";

const { authLogin } = useUser();

const { getProducts } = useCatalog();

const login = async () => {
  const formData = {
    username: "petr",
    password: "root",
  };
  await authLogin(formData);
};

defineProps<{
  msg: string;
}>();
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a target="_blank" href="https://vitejs.dev/">Vite</a> +
      <a target="_blank" href="https://vuejs.org/">Vue 3</a>. What's next?
    </h3>
    <button @click="login">Auth</button>
    <button @click="getProducts">Fetch</button>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
