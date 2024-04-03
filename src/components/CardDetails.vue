<template>
  <div>
    <h1>{{ card.name }}</h1>
    <img :src="card.images.large" alt="Card Image">
  </div>
</template>

<script>
import pokemon from '../api/index'; // Import the Pokémon TCG SDK

export default {
  props: {
    cardId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      card: null,
      isLoading: true,
    };
  },
  async created() {
    try {
      const response = await pokemon.card.find(this.cardId);
      this.card = response.data;
    } catch (error) {
      console.error('Error fetching card details:', error);
    } finally {
      this.isLoading = false;
    }
  },
};
</script>


<style scoped>
/* Add any necessary styling here */
</style>
