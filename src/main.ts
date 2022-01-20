import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import App from "./App.vue";
import { UIRegister } from "./plugins/ui";
import router from "./router";
const instance = createApp(App);
const head = createHead();
UIRegister(instance);

instance.use(head).use(router).mount("#app");
