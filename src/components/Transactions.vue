<template>
  <div>
    <h1>Latest Pollinator Transaction</h1>
    <p v-if="loading">Loading...</p>
    <template v-if="!loading && transaction">
      <p>Transaction ID: {{ transaction.id }}</p>
      <p>Block ID: {{ transaction.block.id }}</p>
      <p>Timestamp: {{ formatTimestamp(transaction.block.timestamp) }}</p>
      <p>Tags:</p>
      <ul>
        <li v-for="tag in transaction.tags" :key="tag.name">
          {{ tag.name }}: {{ tag.value }}
        </li>
      </ul>
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
          transactions(tags: [{ name: "Pollinator" }], first: 1, sort: HEIGHT_DESC) {
            edges {
              node {
                id
                block {
                  id
                  timestamp
                }
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

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  return date.toLocaleString(); // Format timestamp as local date and time string
};

onMounted(fetchLatestPollinatorTransaction);
</script>
