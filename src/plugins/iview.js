import Vue from 'vue'
import iView from 'iview'
import locale from 'iview/dist/locale/fr-FR'
import Vant from 'vant';
import 'vant/lib/index.css';

import '../iview-variables.less'

Vue.use(iView, { locale })


Vue.use(Vant);
import VueFriendlyIframe from 'vue-friendly-iframe';

Vue.component('vue-friendly-iframe', VueFriendlyIframe);

import { Plugins} from '@capacitor/core';

const {Share,LocalNotifications,Browser,App  } =Plugins


Vue.prototype.$share =Share
Vue.prototype.$browser=Browser
Vue.prototype.$push =LocalNotifications
Vue.prototype.$App=App



import facebookLogin from 'facebook-login-vuejs';
Vue.component('facebookLogin',facebookLogin)