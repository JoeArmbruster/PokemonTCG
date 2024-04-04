<template>
  <div>
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        @keyup.enter="handleSearch"
        placeholder="Search for Pokémon cards"
        class="search-input"
      />
      <div class="select-container">
        <select v-model="sortBy" @change="handleSort" class="sort-select">
          <option value="name">Name</option>
          <option value="releaseDate">Release Date</option>
        </select>
        <select v-model="sortOrder" @change="handleSort" class="sort-select">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="card-container">
        <div v-for="card in sortedCards" :key="card.id" class="card">
          <router-link :to="{ name: 'CardDetails', params: { id: card.id } }">
            <img
              :src="card.images.small"
              alt="Pokemon Card"
              class="card-image"
            />
          </router-link>
          <!-- <p class="card-name">Name: {{ card.name }}</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import pokemon from "../api/index";

export default {
  data() {
    return {
      searchQuery: "",
      cards: [],
      isLoading: false,
      sortBy: "name",
      sortOrder: "asc",
    };
  },
  methods: {
    async handleSearch() {
      this.isLoading = true;
      try {
        const response = await pokemon.card.where({
          q: `name:${this.searchQuery}*`,
        });
        this.cards = response.data;
      } catch (error) {
        console.error("Error searching cards:", error);
      } finally {
        this.isLoading = false;
      }
    },
    handleSort() {
      if (this.sortBy === "name") {
        this.cards = _.orderBy(this.cards, "name", this.sortOrder);
      } else if (this.sortBy === "releaseDate") {
        this.cards = _.orderBy(
          this.cards,
          (card) => new Date(card.set.releaseDate),
          this.sortOrder
        );
      }
    },
  },
  computed: {
    sortedCards() {
      return this.cards.filter((card) =>
        card.name.toLowerCase().startsWith(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  justify-content: center; /* Center the search box and dropdowns */
  margin-bottom: 20px;
  margin-top: 20px; /* Add margin to the top of the search container */
}

.search-input {
  width: 30%;
  height: 50px;
  font-size: 18px;
  padding: 10px;
  margin-right: 10px; /* Add margin to the right of the search input */
}

.select-container {
  display: flex;
  gap: 10px; /* Reduce the gap between the dropdowns */
}

.sort-select {
  height: 50px;
  font-size: 18px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.card {
  text-align: center;
}

.card-image {
  width: 200px;
  height: auto;
}

.card-name {
  margin-top: 10px;
}
</style>

