<template>
  <div>
    <h1>Enter Tag Information</h1>
    <div>
      <label for="pollinatorInput">Pollinator:</label>
      <input
        type="text"
        id="pollinatorInput"
        v-model="pollinatorInput"
        placeholder="Enter name of pollinator"
      />
    </div>
    <div>
      <label for="statusInput">Status:</label>
      <input
        type="text"
        id="statusInput"
        v-model="statusInput"
        placeholder="Enter trending status"
      />
    </div>
    <div>
      <label for="vegetationInput">Vegetation:</label>
      <input
        type="text"
        id="vegetationInput"
        v-model="vegetationInput"
        placeholder="Enter type of vegetation"
      />
    </div>
    <div>
      <label for="foodInput">Food:</label>
      <input
        type="text"
        id="foodInput"
        v-model="foodInput"
        placeholder="Enter source of food"
      />
    </div>
    <div>
      <label for="threatsInput">Imminent threats:</label>
      <input
        type="text"
        id="threatsInput"
        v-model="threatsInput"
        placeholder="Enter imminent threats"
      />
    </div>
    <div>
      <label for="countryInput">Country</label>
      <input
        type="text"
        id="countryInput"
        v-model="countryInput"
        placeholder="Enter your country"
      />
    </div>
    <div>
      <label for="regionInput">Region</label>
      <input
        type="text"
        id="regionInput"
        v-model="regionInput"
        placeholder="Enter your region"
      />
    </div>
    <div>
      <label for="cityInput">City</label>
      <input
        type="text"
        id="cityInput"
        v-model="cityInput"
        placeholder="Enter your city"
      />
    </div>

    <button @click="dispatchData">Submit</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const pollinatorInput = ref("");
const statusInput = ref("");
const vegetationInput = ref("");
const foodInput = ref("");
const threatsInput = ref("");
const countryInput = ref("");
const regionInput = ref("");
const cityInput = ref("");

const dispatchData = async () => {
  // Your dispatchData function implementation
};
</script>
