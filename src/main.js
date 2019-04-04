// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'


import ElementUI from 'element-ui'
import { Table, TableColumn, Button, Pagination } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import '../node_modules/timeline-vuejs/dist/timeline-vuejs.css'
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import CKEditor from '@ckeditor/ckeditor5-vue';


// todo
// cssVars()

Vue.use(BootstrapVue)
Vue.use(ElementUI)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(VueFormWizard)
Vue.use( CKEditor );

locale.use(lang)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
