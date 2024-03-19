<template>
  <div>
    <h2>Transactions Sent to Wallet</h2>
    <ul>
      <li v-for="(transaction, index) in transactions" :key="index">
        <p><strong>Transaction ID:</strong> {{ transaction.id }}</p>
        <p><strong>Tags:</strong></p>
        <ul>
          <li v-for="(value, key) in transaction.tags" :key="key">
            {{ key }}: {{ value }}
          </li>
        </ul>
        <p><strong>Data:</strong> {{ transaction.data }}</p>
      </li>
    </ul>
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
    await this.fetchTransactions();
  },
  methods: {
    async fetchTransactions() {
      const arweave = Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
      });

      try {
        // Fetch transactions sent to your wallet address
        const transactions = await arweave.arql({
          op: "and",
          expr1: {
            op: "equals",
            expr1: "to",
            expr2: "xA2-DFx2Q-DO7K9drHQcqlPshkDcAWJ1CEOVDM0qqLw", // Your wallet address
          },
          expr2: {
            op: "equals",
            expr1: "Pollinator", // Filter by tag "Pollinator"
            expr2: "*", // Any value of the "Pollinator" tag
          },
        });

        // Fetch transaction details
        const transactionDetails = await Promise.all(
          transactions.map(async (txId) => {
            const tx = await arweave.transactions.get(txId);
            return {
              id: txId,
              tags: tx.get("tags").reduce((tags, tag) => {
                tags[tag.get("name", { decode: true, string: true })] = tag.get(
                  "value",
                  { decode: true, string: true }
                );
                return tags;
              }, {}),
              data: tx.get("data", { decode: true, string: true }),
            };
          })
        );

        // Update transactions in the component state
        this.transactions = transactionDetails;
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    },
  },
};
</script>
