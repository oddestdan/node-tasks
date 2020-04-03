import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/plugins/bootstrap';
import { BootstrapVue } from 'bootstrap-vue';

// Optionally install the BootstrapVue icon components plugin
// import { IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
// Vue.use(IconsPlugin)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
