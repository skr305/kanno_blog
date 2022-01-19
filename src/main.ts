import { createApp } from "vue";
import App from "./App.vue";
import { UIRegister } from "./plugins/ui";
const instance = createApp(App);

UIRegister(instance);

instance.mount("#app");
