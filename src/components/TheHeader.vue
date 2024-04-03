<template>
  <header>
      <router-link to="/">Home</router-link>
  </header>
</template>

<script>
export default {
    name: 'TheHeader',

}
</script>

<style scoped>
header {
  background-color: #333;
  padding: 10px;
  color: white;
}

a {
  color: white;
  text-decoration: none;
}
</style>