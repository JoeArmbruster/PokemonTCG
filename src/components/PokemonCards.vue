<template>
  <div>
    <input type="text" v-model="searchQuery" @input="searchCards" placeholder="Search for Pokémon">
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-for="card in cards" :key="card.id">
        <img :src="card.images.small" alt="Pokemon Card">
        <p>Name: {{ card.name }}</p>
        <!-- <p>Type: {{ card.types.join(', ') }}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import pokemon from 'pokemontcgsdk';

export default {
  data() {
    return {
      searchQuery: '',
      cards: [],
      isLoading: false,
    };
  },
  methods: {
    async searchCards() {
      this.isLoading = true;
      try {
        const response = await pokemon.card.where({ q: `name:${this.searchQuery}*` });
        this.cards = response.data;
      } catch (error) {
        console.error('Error searching cards:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>


<style scoped>
.pokemon-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pokemon-card {
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
}

.pokemon-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.pokemon-info {
  margin-top: 10px;
}
</style>

