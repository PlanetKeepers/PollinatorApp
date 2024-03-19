<template>
  <div class="akaya contribution-container">
    <p
      style="
        text-align: justify;
        max-width: 800px;
        font-size: x-large;
        justify-content: center;
        text-align: center;
      "
    >
      Clicking the button below will trigger a dry run process illustrating the
      data from the PlanetKeeper process, which will be displayed after
      processing the dry run.
    </p>
    <button @click="dryRunProcess">DryRun</button>

    <div v-if="dryRunResult">
      <h2>DryRun Result</h2>
      <p>Target: {{ dryRunResult.Target }}</p>
      <p>Data: {{ dryRunResult.Data }}</p>
      <p>Owner: {{ dryRunResult.owner }}</p>
      <!-- Display Owner -->
      <p>ID: {{ dryRunResult.Id }}</p>
      <!-- Display ID -->
      <p>Name: {{ dryRunResult.Name }}</p>
      <!-- Display Name -->
      <p>Anchor: {{ dryRunResult.Anchor }}</p>
      <h3>Tags:</h3>
      <ul>
        <li v-for="(tag, index) in dryRunResult.Tags" :key="index">
          {{ tag.name }}: {{ tag.value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { dryrun } from "@permaweb/aoconnect";

const dryRunResult = ref<any | null>(null);

const dryRunProcess = async () => {
  try {
    const result = await dryrun({
      process: "a8zR1JbHsJhFyI_tURmtNyi8YT1z6oFD7cE1zvovLzc",
      data: "",
      tags: [{ name: "Action", value: "Balance" }],
      anchor: "1234",
    });

    dryRunResult.value = result.Messages[0];
  } catch (error) {
    console.error("Error in dryrun:", error);
  }
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
