import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    fax:"#ffffff",
    jeune:"#11998e",
    other:'#8cc657'
  },
  iconfont: 'md'
})





import { CssGrid, CssGridItem, ViewportListener } from 'vue-css-grid'
 
// Your main grid component, it declares the layout
Vue.component('css-grid', CssGrid)
 
// A grid item to use inside the grid component
Vue.component('css-grid-item', CssGridItem)
 
// Optional component to listen to viewport width and height changes
Vue.component('viewport-listener', ViewportListener)



import Vue2TouchEvents from 'vue2-touch-events'
 
Vue.use(Vue2TouchEvents, {
  touchClass: '',
  tapTolerance: 10,
  swipeTolerance: 80,
  longTapTimeInterval: 400
})


import Va from 'vue-atlas'
import 'vue-atlas/dist/vue-atlas.css'

/**
 * Some components are pre-wired for i18n.
 * 'en', 'es' and 'fr' are available at the moment.
 */
Vue.use(Va, 'en')