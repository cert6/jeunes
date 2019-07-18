import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ios from 'socket.io-client'
const apiget =ios('https://cert6.services/')
Vue.prototype.$apiget=apiget

import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';
 
// uuid

const uuidv1 = require('uuid/v1');
Vue.prototype.$uuid=uuidv1();

Vue.use(VueSocketio, io('https://cert9.ltd'));

import TurbolinksAdapter from 'vue-turbolinks';
Vue.use(TurbolinksAdapter)

import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
require('moment/locale/fr')

Vue.use(VueMoment, {
    moment,
})

import VueBus from 'vue-bus';

Vue.use(VueBus);
import VueOffline from 'vue-offline'

Vue.use(VueOffline)
import VueScrollReveal from 'vue-scroll-reveal';

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

var VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);
var rand = require("random-key");
Vue.prototype.$rand=rand

// Using ScrollReveal's default configuration
Vue.use(VueScrollReveal, {
  class: 'v-scroll-reveal', // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
  duration: 800,
  scale: 1,
  distance: '40px',
  mobile: true
});
 
import DisableAutocomplete from 'vue-disable-autocomplete';

//Vue.use(DisableAutocomplete);

import { Hooper, Slide , Pagination as HooperPagination  } from 'hooper';
import 'hooper/dist/hooper.css';
Vue.component('HooperPagination', HooperPagination)
Vue.component('Hooper',Hooper)
Vue.component('Slide',Slide)

import Framework7 from 'framework7/framework7.esm.bundle.js'

import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js'
// Import F7 Styles
import 'framework7/css/framework7.css'

// Import Icons and App Custom Styles
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
/* ... */

Vue.use(SuiVue);

import './plugins/iview.js'
import './plugins/config.js'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import { createProvider } from './vue-apollo'
import './plugins/vuesax.js'

Framework7.use(Framework7Vue)


Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in. Only available in 2.2.0+
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
