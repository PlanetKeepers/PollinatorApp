<template>
  <div class="akaya contribution-container">
    <h1>Learn how to contribute to pollinator preservation on Arweave</h1>
    <button @click="toggleDetails">Learn More Here</button>
    <p class="content" v-if="showDetails">
      If you would like to contribute to pollinator preservation, there are
      currently two ways to get involved: collecting population status data and
      planting pollinator-friendly plants. Both ways involve creating a wallet
      on Arweave which is the next step, so lucky you.
    </p>
    <p class="content" v-if="showDetails">
      Creating a wallet on Arweave is not as complicated or as scary as it
      sounds, but it is how you plug in to the Permaweb. But before you do, you
      shoud understand the importance of creating a wallet and how it works.
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
    toggleDetails() {
      // Rename the method to toggleDetails
      this.showDetails = !this.showDetails; // Toggle the value of showDetails
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
  width: 90%;
  max-width: 900px; /* Adjust width as needed */
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

.content {
  font-size: x-large;
}
</style>
