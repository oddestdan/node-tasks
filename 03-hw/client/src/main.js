import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/plugins/bootstrap';
import { BootstrapVue } from 'bootstrap-vue';
// import { IconsPlugin } from 'bootstrap-vue'; // optional
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
// Vue.use(IconsPlugin) // optional

const SocketInstance = socketio.connect('http://localhost:8081');
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketInstance,
  }),
  store
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
