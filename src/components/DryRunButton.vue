<template>
  <div>
    <p>
      Clicking the button below will trigger a dry run process illustrating the
      data from the PlanetKeeper process, which is ID: tbd
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
      process: "-IkeOAK97iq7bQnQAeOupqQkLDDx17KccBKhuYbglQg",
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
