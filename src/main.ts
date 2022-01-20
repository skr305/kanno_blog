import { createApp } from 'vue'
import App from './App.vue'
import { UIRegister } from './plugins/ui'
import router from './router'
const instance = createApp(App)

UIRegister(instance)

instance.use(router).mount('#app')
