// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios';
import App from './App'

import router from './router'

import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import CKEditor from '@ckeditor/ckeditor5-vue';


import {ClientTable} from 'vue-tables-2'
import {ServerTable} from 'vue-tables-2'
import VueAxios from 'vue-axios'
import VModal from 'vue-js-modal'



// todo
// cssVars()

Vue.use(BootstrapVue)

Vue.use(VueFormWizard)
Vue.use(CKEditor);

Vue.use(ClientTable);
Vue.use(ServerTable);
Vue.use(VueAxios, axios);
Vue.use(VModal)

/*Vue.config.productionTip = false;

const host = window.location.host;
const parts = host.split('.');
const domainLength = 3; // route1.example.com => domain length = 3

const router = () => {
    let routes;
    if (parts.length === (domainLength - 1) || parts[0] === 'www') {
        routes = index;
    } else if (parts[0] === 'admin') {
        routes = index;
    } else if (parts[0] === 'route2') {
        routes = index;
    } else {
        // If you want to do something else just comment the line below
        routes = index;
    }
    return routes;
};*/
/* eslint-disable no-new */

import store from './store/store';
import globalvariables from './globalvariables';

Vue.prototype.$gbvar = globalvariables;

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})
