<template>
  <div>
    <h1>{{ card.name }}</h1>
    <img :src="card.images.large" alt="Card Image">
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
/* Add any necessary styling here */
</style>
