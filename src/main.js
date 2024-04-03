import { createApp } from 'vue'; // Import createApp function from Vue 3
import App from './App.vue';
import router from './router'; // Assuming you have a router set up
import pokemon from './api/index'; // Import the Pokémon TCG SDK
import configuration from './api/configure'; // Import the configuration

// Configure the Pokémon TCG SDK with your API key
pokemon.configure({ apiKey: configuration.apiKey });

// Create the Vue app instance using the createApp function
const app = createApp(App);

// Mount the app to the element with id 'app'
app.use(router).mount('#app');
