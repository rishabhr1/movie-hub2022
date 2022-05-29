import Vue from 'vue'
import { VueSpinners } from '@saeris/vue-spinners'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueSkeletonLoader from 'skeleton-loader-vue';
import "primeflex/primeflex.min.css";
import "primeicons/primeicons.css";
import {store} from "../src/store/index.js"

// Register the component globally
Vue.component('vue-skeleton-loader', VueSkeletonLoader);

Vue.use(Buefy)
Vue.use(VueSpinners)

Vue.config.productionTip = false

new Vue({
  router,
  store:store,
  render: h => h(App)
}).$mount('#app')
