<template>
  <div class="card-details">
    <div class="left-section">
      <img :src="card.images.large" alt="Card Image" />
      <h2>{{ card.name }}</h2>
    </div>
    <div class="right-section">
      <h3>Pricing Information</h3>
      <div class="pricing-info">
        <div v-for="priceType in filteredPriceTypes" :key="priceType" class="price-item">
          <h4>{{ priceType }}</h4>
          <div class="price-category">
            <div v-for="priceCategory in priceCategories" :key="priceCategory">
              <span>{{ priceCategory }}:</span>
              <span v-if="hasPriceCategory(priceType, priceCategory)">
                ${{ getPrice(priceType, priceCategory) }}
              </span>
            </div>
          </div>
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
      priceCategories: ["low", "mid", "high", "market", "directLow"],
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
      return this.priceTypes.filter(priceType => this.hasPrices(priceType));
    }
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
}

.left-section {
  flex: 1;
}

.right-section {
  flex: 1;
}

.pricing-info {
  display: flex;
  flex-wrap: wrap;
}

.price-item {
  flex: 1;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
}

.price-item h4 {
  margin-bottom: 10px;
}

.price-category {
  margin-bottom: 10px;
}

.price-category div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-item span {
  margin-right: 10px;
}
</style>
