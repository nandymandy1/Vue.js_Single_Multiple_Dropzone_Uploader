/* eslint-disable */
import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

// Component Imports
import App from './App.vue';
import AppNavbar from './components/Navbar.vue';

// Bring in Main Style Scss
import './assets/scss/main.scss';

// Specify vue plugins
Vue.use(IconsPlugin);
Vue.use(BootstrapVue);

Vue.component('AppNavbar', AppNavbar)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
