<template>
  <div>
    <p className="">
      Clicking the button below will trigger a dry run process illustrating the
      data from the PlanetKeeper process, which is ID: tbd
    </p>
    <Button @click="dryRunProcess">DryRun</Button>{" "}

    <div>
      <h2>DryRun Result</h2>
      <p>Target: {dryRunResult.Target}</p>
      <p>Data: {dryRunResult.Data}</p>
      <p>Owner: {dryRunResult.owner}</p>
      {/* Display Owner */}
      <p>ID: {dryRunResult.Id}</p>
      {/* Display ID */}
      <p>Name: {dryRunResult.Name}</p>
      {/* Display Name */}
      <p>Anchor: {dryRunResult.Anchor}</p>
      <h3>Tags:</h3>
      <ul>
        {dryRunResult.Tags.map( ( tag: { name: string; value: string; owner:
        string; id: string; }, index: number // Access name and value properties
        correctly ) => (
        <li key="{index}">{tag.name}: {tag.value}</li>
        ) )}
      </ul>
    </div>
    )}
  </div>
</template>

<script setup lang="ts">

import {useState} from "react";
import {dryrun} from "@permaweb/aoconnect"; // Import dryrun function

const DryRunButton = () => { }
const [dryRunResult, setDryRunResult] = useState<any /> | null>(null); // State to store the dryrun result

const dryRunProcess = async () => { }
try { }
const result = await dryrun({process}: "YH50DDVhYrnPRhLXl5jovs8XQMuRR0CklqI-5aOT1Xs",
data: "",
tags: [{name}: "Action", value: "Balance" }],
anchor: "1234",
});

setDryRunResult(result.Messages[0]); // Set the dryrun result to state
} catch (error) {console.error("Error in dryrun:", error)}// Handle errors
</script>
