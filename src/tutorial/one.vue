<template>
  <div class="contribution-container">
    <h1>Contribute to Preserving Pollinators</h1>
    <button @click="showDetails">Learn More</button>
    <p v-if="showDetails">
      There are two ways to contribute to the preservation of pollinators:
      collecting data and planting pollinator-friendly plants.
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDetails: false,
    };
  },
  methods: {
    showDetails() {
      this.showDetails = true;
    },
  },
};
</script>

<style scoped>
.contribution-container {
  text-align: center;
  margin: 2em auto;
  padding: 1em;
  border: 1px solid #1d1b9b;
  border-radius: 5px;
  width: 50%;
  max-width: 400px; /* Adjust width as needed */
}

h1 {
  margin-bottom: 1em;
}

button {
  background-color: #1d1b9b;
  color: white;
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

p {
  margin-top: 1em;
}
</style>
