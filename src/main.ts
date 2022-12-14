import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import PersistedState from "pinia-plugin-persistedstate";

import { Quasar, Notify, Cookies } from "quasar";
import quasarIconSet from "quasar/icon-set/svg-ionicons-v6";

import "@quasar/extras/roboto-font/roboto-font.css";

// Import Quasar css
import "quasar/src/css/index.sass";
import "@/assets/scss/main.scss";

const app = createApp(App);
const pinia = createPinia().use(PersistedState);

app.use(router);
app.use(pinia);
app.use(Quasar, {
  plugins: {
    Notify,
    Cookies,
  }, // import Quasar plugins and add here
  iconSet: quasarIconSet,
});
app.mount("#app");
