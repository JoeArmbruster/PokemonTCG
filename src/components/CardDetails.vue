<template>
  <div class="card-details">
    <div class="left-section">
      <h2>{{ card.name }} - {{ card.set.name }}</h2>
      <img :src="card.images.large" alt="Card Image" class="card-image" />
    </div>
    <div class="right-section">
      <h3>Pricing Information</h3>
      <div class="pricing-info">
        <div v-for="priceType in filteredPriceTypes" :key="priceType" class="price-item">
          <h4>{{ priceType }}</h4>
          <div v-if="hasPrices(priceType)" class="price-category">
            <div v-for="priceCategory in priceCategories" :key="priceCategory" class="price-row">
              <span class="label">{{ priceCategory }}:</span>
              <span class="price-value" v-if="hasPriceCategory(priceType, priceCategory)">
                ${{ getPrice(priceType, priceCategory) }}
              </span>
            </div>
          </div>
          <div v-else>No prices available</div>
        </div>
      </div>
      <a :href="card.tcgplayer.url" target="_blank">Buy from TCGplayer</a>
      <p>Last Updated: {{ card.tcgplayer.updatedAt }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      card: null,
      isLoading: true,
      priceTypes: [
        "normal",
        "holofoil",
        "reverseHolofoil",
        "1stEditionHolofoil",
        "1stEditionNormal",
      ],
      priceCategories: ["market", "high", "mid", "low"],
    };
  },
  async created() {
    try {
      const response = await axios.get(
        `https://api.pokemontcg.io/v2/cards/${this.id}`
      );
      console.log("API Response:", response.data); // Log the API response data
      this.card = response.data.data;
    } catch (error) {
      console.error("Error fetching card details:", error);
    } finally {
      this.isLoading = false;
    }
  },
  computed: {
    filteredPriceTypes() {
      return this.priceTypes.filter((priceType) => this.hasPrices(priceType));
    },
  },
  methods: {
    hasPrices(priceType) {
      return (
        this.card &&
        this.card.tcgplayer &&
        this.card.tcgplayer.prices &&
        this.card.tcgplayer.prices[priceType] &&
        Object.keys(this.card.tcgplayer.prices[priceType]).length > 0
      );
    },
    hasPriceCategory(priceType, priceCategory) {
      return (
        this.card &&
        this.card.tcgplayer &&
        this.card.tcgplayer.prices &&
        this.card.tcgplayer.prices[priceType] &&
        this.card.tcgplayer.prices[priceType][priceCategory]
      );
    },
    getPrice(priceType, priceCategory) {
      if (
        this.card &&
        this.card.tcgplayer &&
        this.card.tcgplayer.prices &&
        this.card.tcgplayer.prices[priceType]
      ) {
        return this.card.tcgplayer.prices[priceType][priceCategory] || "N/A";
      } else {
        return "N/A";
      }
    },
  },
};
</script>

<style scoped>
.card-details {
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  align-items: center;
}

.left-section {
  flex: 1;
}

.right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pricing-info {
  display: flex;
  flex-direction: column;
}

.price-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
  max-width: 200px;
}

.price-item h4 {
  margin-bottom: 10px;
  font-size: 1.2em;
}

.price-category {
  margin-top: 10px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.label {
  font-weight: bold;
  font-size: 1.1em;
}

.price-value {
  font-size: 1.1em;
}

.card-image {
  max-width: 100%;
}
</style>