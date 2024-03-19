// Pollinator.vue

<template>
  <div>
    <label for="tag">Tag Name:</label>
    <input type="text" id="tag" v-model="tagName" />
    <label for="data">Data:</label>
    <textarea id="data" v-model="data"></textarea>
    <button @click="sendMessage">Send Message</button>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { wallet } from "../ReactiveWallet";

export default defineComponent({
  setup() {
    const sendMessage = async () => {
      try {
        // Assuming you have the process ID for the Pollinator process
        const processId = "a8zR1JbHsJhFyI_tURmtNyi8YT1z6oFD7cE1zvovLzc";

        // Sign the message using the wallet connector
        const signedMessage = await wallet.signDataItem({
          process: processId,
          // Add any additional data or tags here
          data: "Your message data here",
          tags: [
            { name: "Pollinator", value: "pollinator data" },
            // Add more tags if needed
          ],
        });

        // Now you can handle the signed message, for example, sending it to the process
        console.log("Signed message:", signedMessage);

        // Handle sending the signed message to the Pollinator process
        // You can add your logic here to send the message
      } catch (error) {
        console.error("Error sending message:", error);
        // Handle error appropriately
      }
    };

    return {
      sendMessage,
    };
  },
});
</script>
