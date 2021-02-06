import Vue from 'vue'
import App from './App.vue'
import VueParticles from 'vue-particles'
import vuetify from './plugins/vuetify';
import router from './router'
import VueCookies from 'vue-cookies'
import VueCountdownTimer from 'vuejs-countdown-timer';
Vue.use(VueCountdownTimer);
Vue.use(VueParticles)

import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  VueCookies,
  render: h => h(App)
}).$mount('#app')
