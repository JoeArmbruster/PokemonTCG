import Vue from 'vue';
import App from './App.vue';
import router from './router'; // Assuming you have a router set up
import pokemon from './api/index'; // Import the Pokémon TCG SDK

Vue.config.productionTip = false;

// Configure the Pokémon TCG SDK with your API key
pokemon.configure({ apiKey: '4fc6d47d-764a-48cd-b51f-58ccb6638ca1' });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
