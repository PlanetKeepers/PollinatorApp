<template>
  <div>
    <h1>Enter Tag Information</h1>
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
