import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import App from './App.vue'
import router from './router'
import i18n from './locales'
import './theme'
import { useThemeStore } from './stores/theme'
import { permission } from './directives/permission'
import './styles/reset.css'
import './styles/global.css'

const app = createApp(App)
const pinia = createPinia()
const themeStore = useThemeStore(pinia)
themeStore.restore()

app.use(pinia)
app.use(i18n)
app.use(ElementPlus)
app.use(router)
app.directive('permission', permission)

app.mount('#app')
