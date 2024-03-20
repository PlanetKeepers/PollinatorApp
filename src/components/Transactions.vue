<template>
  <div style="text-align: left; max-width: 500px">
    <h1>Latest Pollinator Transaction</h1>
    <p>
      Below is the latest transaction submitted to Arweave with the tag name
      "Pollinator." You can test it out by sending any transaction with the tag
      Pollinator, or you can connect your wallet above, and then input data in
      the next step. But you'll have to either create your wallet or connect
      your Arweave.app wallet.
    </p>
    <p v-if="loading">Loading...</p>
    <template v-if="!loading && transaction">
      <p>Transaction ID: {{ transaction.id }}</p>
      <p>Tags:</p>
      <div v-for="tag in transaction.tags" :key="tag.name">
        {{ tag.name }}: {{ tag.value }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Arweave from "arweave";

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const loading = ref(true);
const transaction = ref(null);

const fetchLatestPollinatorTransaction = async () => {
  try {
    const queryObject = {
      query: `
        {
          transactions(tags: [{ name: "Pollinator", values: ["Pollinator"] }]) {
            edges {
              node {
                id
                tags {
                  name
                  value
                }
              }
            }
          }
        }
      `,
    };

    const response = await fetch("https://arweave.net/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(queryObject),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    const responseData = await response.json();

    if (responseData.data.transactions.edges.length > 0) {
      transaction.value = responseData.data.transactions.edges[0].node;
    }
  } catch (error) {
    console.error("Error fetching transaction:", error);
  } finally {
    loading.value = false;
  }
};

// Fetch the latest pollinator transaction when the component is mounted
onMounted(fetchLatestPollinatorTransaction);
</script>
