<template>
  <div>
    <h1>Enter Pollinator Information Here</h1>
    <p>
      Enter the information for the pollinator you want to submit to the
      Permaweb but remember, this information will be stored permanently and
      will be visible to all. Also, there are three options below, but only
      click the middle one to "dispatch" a message across the Permaweb, and
      because its tagged with "Pollinator," we will be able to retreive
      transactions with this tag and analyze their data.
    </p>
    <p>
      After you enter the data, then hit "submit" and afterwardss hit the middle
      button below to dispatch the message. Even though you see a currency value
      listed above, that is only if you hit the left button, which is an actual
      peer-to-peer transaction instead.
    </p>
    <p>
      Yea, thats right, you can either send currency to other Arweave wallets,
      or you can send data to the Permaweb (Arweave). The right button is for
      larger data sets and will be used more internally.
    </p>
    <div>
      <label for="pollinatorInput">Pollinator</label>
      <input
        type="text"
        id="pollinatorInput"
        v-model="pollinatorInput"
        placeholder="Just type 'Pollinator' here"
      />
    </div>
    <div>
      <label for="nameInput">Name:</label>
      <input
        type="text"
        id="nameInput"
        v-model="nameInput"
        placeholder="Name of pollinator"
      />
    </div>
    <div>
      <label for="statusInput">Status:</label>
      <input
        type="text"
        id="statusInput"
        v-model="statusInput"
        placeholder="Declining, inclining, or stable"
      />
    </div>
    <div>
      <label for="vegetationInput">Vegetation:</label>
      <input
        type="text"
        id="vegetationInput"
        v-model="vegetationInput"
        placeholder="Enter vegetation pollinating"
      />
    </div>
    <div>
      <label for="threatsInput">Imminent threats:</label>
      <input
        type="text"
        id="threatsInput"
        v-model="threatsInput"
        placeholder="Enter imminent threats, if any"
      />
    </div>
    <div>
      <p>
        Just to repeat, enter data above, click submit, then click the middle
        button. Once you do that, your wallet will appear with the data you
        entered, so hit "approve" and in a few minutes you can refresh the
        browser and see your results above. And this is a completely free
        transaction since we are below data thresholds.
      </p>
    </div>

    <button @click="dispatchData">Submit</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const pollinatorInput = ref("");
const nameInput = ref("");
const statusInput = ref("");
const vegetationInput = ref("");
const threatsInput = ref("");

const dispatchData = async () => {
  // Your dispatchData function implementation
};
</script>
