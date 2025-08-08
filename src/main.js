import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/store'
import Vuesax from 'vuesax3'
import 'vuesax3/dist/vuesax.css'
import VueLazyload from 'vue3-lazyload'
import 'vue-advanced-cropper/dist/style.css'
import replaceAllInserter from 'string.prototype.replaceall'

replaceAllInserter.shim()

const loadimage = require('./assets/loading.gif')
const errorimage = require('./assets/err.gif')

const app = createApp(App)

// Global filters migrated to config.globalProperties
app.config.globalProperties.$filters = {
  truncate(text, length, suffix) {
    if (typeof text !== 'string') return text
    return text.length > length ? text.substring(0, length) + suffix : text
  },
  sanitize(text) {
    if (!text) return text
    return text
      .replaceAll('nbsp', ' ')
      .replaceAll('& ;', '')
      .replaceAll('<br>', '\n')
      .replaceAll('script', '')
      .replaceAll('alert', '')
      .replaceAll('&amp;', '&')
  },
  dateToString(dateInput) {
    const now = new Date()
    const postDate = new Date(dateInput)
    let diffMs = Math.floor(now.getTime() - postDate.getTime())
    const days = Math.floor(diffMs / 1000 / 60 / 60 / 24)
    if (days > 0) return days + (days > 1 ? ' days ago' : ' day ago')
    const hours = Math.floor(diffMs / 1000 / 60 / 60)
    if (hours > 0) return hours + (hours > 1 ? ' hours ago' : ' hour ago')
    const mins = Math.floor(diffMs / 1000 / 60)
    if (mins > 0) return mins + (mins > 1 ? ' minutes ago' : ' minute ago')
    return ' Just now'
  }
}

app.use(store)
app.use(router)
app.use(Vuesax, {
  colors: {
    primary: '#1e2023',
    success: 'rgb(23, 201, 100)',
    danger: 'rgba(255,45,45,0.55)',
    warning: 'rgb(255, 130, 0)',
    dark: 'rgb(30,32,35)'
  }
})
app.use(VueLazyload, {
  preLoad: 2,
  error: errorimage,
  loading: loadimage,
  attempt: 2
})

app.mount('#app')
