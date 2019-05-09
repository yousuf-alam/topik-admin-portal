// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios';
import App from './App'

import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import CKEditor from '@ckeditor/ckeditor5-vue';


import {ClientTable} from 'vue-tables-2'
import {ServerTable} from 'vue-tables-2'
import VueAxios from 'vue-axios'
import VModal from 'vue-js-modal'


Vue.use(BootstrapVue)
Vue.use(VueFormWizard)
Vue.use(CKEditor);
Vue.use(ClientTable);
Vue.use(ServerTable);
Vue.use(VueAxios, axios);
Vue.use(VModal)

import router from './router'
import store from './store/store';
import globalvariables from './globalvariables';
Vue.prototype.$gbvar = globalvariables;


import Echo from 'laravel-echo';
const bearerToken = store.getters['auth/bearerToken'] ;

window.Pusher = require('pusher-js');
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: globalvariables.PUSHER_CREDENTIALS.APP_KEY,
    cluster: 'ap2',
    encrypted: true,
    authEndpoint: `${process.env.VUE_APP_ADMIN_URL}/api/broadcasting/auth`,
    auth: {headers: {Authorization: "Bearer " + bearerToken}}
})

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})
