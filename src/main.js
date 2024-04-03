import Vue from 'vue';
import App from './App.vue';
import router from './router'; // Assuming you have a router set up
import pokemon from './api/index'; // Import the Pokémon TCG SDK
import configuration from './api/configure'; // Import the configuration

// Configure the Pokémon TCG SDK with your API key
pokemon.configure({ apiKey: configuration.apiKey });

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
