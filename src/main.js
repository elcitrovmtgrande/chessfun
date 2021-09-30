import Vue from 'vue';
// import VueSocketIO from 'vue-socket.io';
import App from './App.vue';
import router from './router';
import store from './store';
// import config from './config';

// Vue.use(new VueSocketIO({
//   debug: true,
//   // connection: 'http://metinseylan.com:1992',
//   connection: config.socketAddress,
//   vuex: {
//     store,
//     actionPrefix: 'SOCKET_',
//     mutationPrefix: 'SOCKET_',
//   },
//   // options: { path: '/room' }, // Optional options
// }));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
