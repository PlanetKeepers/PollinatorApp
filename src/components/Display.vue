<template>
  <div>
    <h1>Transaction Data for Pollinator Wallet</h1>
    <ul v-if="transactions.length">
      <li v-for="(transaction, index) in transactions" :key="index">
        <div>Transaction ID: {{ transaction.id }}</div>
        <div>Owner Address: {{ transaction.owner.address }}</div>
        <div>Data Size: {{ transaction.data.size }}</div>
        <div>Block Height: {{ transaction.block.height }}</div>
        <div>Timestamp: {{ transaction.block.timestamp }}</div>
        <div>
          Tags:
          <ul>
            <li v-for="(tag, tagIndex) in transaction.tags" :key="tagIndex">
              {{ tag.name }}: {{ tag.value }}
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <div v-else>
      <p>No transactions found for the specified wallet.</p>
    </div>
  </div>
</template>

<script>
import Arweave from "arweave";

export default {
  data() {
    return {
      transactions: [],
    };
  },
  async created() {
    // Initialize Arweave
    const arweave = Arweave.init({
      host: "arweave.net",
      port: 443,
      protocol: "https",
    });

    // Retrieve transaction data using GraphQL
    const queryObject = {
      query: `
        {
          transactions (
            owners: ["xA2-DFx2Q-DO7K9drHQcqlPshkDcAWJ1CEOVDM0qqLw"],
            tags: [
              {
                name: "Pollinator",
                values: ["name of pollinator"]
              },
 
            ]
          ) {
            edges {
              node {
                id
                owner {
                  address
                }
                data {
                  size
                }
                block {
                  height
                  timestamp
                }
                tags {
                  name,
                  value
                }
              }
            }
          }
        }
      `,
    };

    try {
      const response = await arweave.api.post("/graphql", queryObject);
      if (
        response &&
        response.data &&
        response.data.data &&
        response.data.data.transactions &&
        response.data.data.transactions.edges
      ) {
        this.transactions = response.data.data.transactions.edges.map(
          (edge) => edge.node
        );
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error retrieving transaction data:", error);
    }
  },
};
</script>

<style scoped>
/* Add your CSS styles here */
</style>
