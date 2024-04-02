<template>
  <div>
    <input type="text" v-model="searchQuery" @input="searchCards" placeholder="Search for Pokémon">
    <div v-if="isLoading">Loading...</div>
    <div v-else class="card-container">
      <div v-for="card in cards" :key="card.id" class="card">
        <p>Name: {{ card.name }}</p>
        <router-link :to="{ name: 'CardDetails', params: { id: card.id } }">
          <img :src="card.images.small" alt="Pokemon Card">
        </router-link>
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
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.card {
  text-align: center;
}

.card img {
  width: 200px;
  height: auto;
}
</style>

