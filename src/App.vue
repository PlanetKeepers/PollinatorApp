<template>
  <div class="app">
    <div class="akaya banner-container">
      <img src="/banner.jpg" alt="Banner" class="bannerImage" />
      <div class="banner-text">
        <h1>Pollinator</h1>
        <h3>An app for our pollinators, built with Arweave and ao.</h3>
      </div>
    </div>
    <!-- link to: baseSourceUrl + /example/ + path -->
    <WalletSelector class="wallet-selector" />

    <About />
    <one />
    <DryRunButton />
    <Transactions />

    <div class="button-container" style="margin-top: 4em; margin-bottom: 1em">
      <a
        class="button"
        style="margin-right: 1em"
        href="https://github.com/PlanetKeepers"
      >
        <Github />
        <span>View on Github</span>
      </a>
      <a class="button" href="https://arweave.org/">
        <img src="/arweave.png" class="arweaveimage" />
        <span>Learn more about Arweave</span>
      </a>
    </div>
    <div />
    <section v-if="currentStep >= 1" id="s1">
      <div class="ellipsis">
        <div>
          This page is now linked to {{ wallet.url }} and using the selected
          address :
        </div>
        {{ wallet.address }}
      </div>
      <div>
        <div style="display: flex; align-items: center">
          <span>Address :</span>
          <div style="display: inline-block; width: 0.5em" />
          <input
            v-model="transactionData.target"
            style="flex: 1 1 0; text-align: right"
          />
        </div>
        <div style="height: 0.5em" />
        <div style="display: flex; align-items: center">
          <span
            v-if="
              transactionData.target ===
              'xA2-DFx2Q-DO7K9drHQcqlPshkDcAWJ1CEOVDM0qqLw'
            "
            >Donate? :</span
          >
          <span v-else>Send :</span>
          <div style="display: inline-block; width: 0.5em" />
          <input v-model="arInput" style="flex: 1 1 0; text-align: right" />
          <div style="display: inline-block; width: 0.5em" />
          <span
            >AR<span
              v-if="arInputConversion"
              style="font-size: 0.75em; opacity: 0.8"
            >
              ({{ arInputConversion }})</span
            ></span
          >
        </div>
        <div style="height: 0.5em" />
        <div style="display: flex; align-items: center">
          <span>Data :</span>
          <div style="display: inline-block; width: 0.5em" />
          <input v-model="message" style="flex: 1 1 0; text-align: right" />
        </div>
      </div>
      <UserInput />
      <div class="row" style="flex-wrap: wrap">
        <button class="button" v-if="wallet.address" @click="signTransaction">
          <Rule />
          <span>Sign Transaction</span>
        </button>
        <button class="button" v-if="wallet.address" @click="dispatchData">
          <Rule />
          <span>Dispatch Data</span>
        </button>
        <button class="button" v-if="wallet.address" @click="signDataItem">
          <Rule />
          <span>Sign DataItem</span>
        </button>
      </div>
      <CodeBox :code="code[1]" />
      <div />
    </section>
    <section v-if="currentStep >= 2" id="s2">
      <template
        v-if="
          txUpload.signResult ||
          txUpload.dispatchResult ||
          txUpload.signDataItemResult
        "
      >
        <template v-if="txUpload.signResult">
          <div>Thank you!!</div>
          <div>You're pollinating the pollinators with this now!</div>
          <div>
            All financial contributions will be tracked, displayed, and
            transparently used to support the pollinators. More to come on this
            soon though our work-in-progress can be seen here.
          </div>
        </template>
        <template v-if="txUpload.dispatchResult">
          <div>Thank you for contributing!</div>
          <div v-if="parseFloat(arInput) > 0">
            Your contribution matters and empowers the pollinators. Lets
            continue to grow the database and support the pollinators.
          </div>
          <div v-else>
            However, none of this would be possible without Arweave and the
            ability to use it as a database. Whether you realize it or not, you
            just contributed to the start of what will be the largest database
            of pollinators in the world.
          </div>
          <div>
            And best of all, because our transactions are under a certain size,
            they are free!
          </div>
          <div>
            Data only transactions going through the bundling service are
            currently subsidized (up to a specific size limit), this allows for
            accounts with no funds to also be able to commit permanent data.
          </div>
        </template>
        <template v-if="txUpload.signDataItemResult">
          <div>This may come in handy</div>
          <div>
            In some scenarios, web may need to process and submit DataItems to a
            specific bundler. If the latter does not specifically apply to your
            use case, the .dispatch() method is a better choice.
          </div>
        </template>
        <div
          v-if="txUpload.signResult || txUpload.signDataItemResult"
          class="row"
        >
          <button class="button" @click="postTransaction">
            <Upload />
            <span v-if="!txUpload.upload">Upload Transaction</span>
            <span v-else>Uploaded ({{ txUpload.upload }})</span>
          </button>
        </div>
        <CodeBox :code="code[2]" />
      </template>
      <div v-if="txUpload.error">
        <CodeBox
          :code="`// Received error message\n${JSON.stringify(txUpload.error)}`"
        />
      </div>
      <div class="row">
        <button class="button" @click="() => (currentStep = 3)">
          <Rule />
          <span>Try out other methods</span>
        </button>
      </div>
      <div />
    </section>
    <section v-if="currentStep >= 3" id="s3">
      <div class="row">
        <button class="button" @click="runEncryption">
          <Rule />
          <span>{{ isEncrypted ? "Decrypt" : "Encrypt" }}</span>
        </button>
      </div>
      <CodeBox :code="code[3]" />
      <div class="row">
        <button class="button" @click="getArweaveConfig">
          <Rule />
          <span>Get Arweave Config</span>
        </button>
      </div>
      <CodeBox :code="otherMethodResult || 'Result'" />
    </section>
  </div>
</template>

<script setup lang="ts">
import WalletSelector from "./components/WalletSelector.vue";
import CodeBox from "./components/CodeBox.vue";
import Github from "./components/icons/Github.vue";
import Rule from "./components/icons/Rule.vue";
import Upload from "./components/icons/Upload.vue";
import Arweave from "arweave";
import { reactive, ref, computed, watch } from "vue";
import type Transaction from "arweave/web/lib/transaction";
import type { DispatchResult } from "../../src/Arweave";
import { track } from "./Analytics";
import About from "./components/About.vue";
import one from "./tutorial/one.vue";
import DryRunButton from "./components/DryRunButton.vue";
import UserInput from "./components/UserInput.vue";

// Here, we import an instance of a wrapper class made for the Vue
// reactivity engine instead of importing the connector directly
import { wallet } from "./ReactiveWallet";
import Transactions from "./components/Transactions.vue";

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});
wallet.on("connect", () => (currentStep.value = 1));
wallet.on("disconnect", () => (currentStep.value = 0));

const arInput = ref("0.1");
const arInputConversion = computed(() => arToUsd(arInput.value));
// using the price of 500MB as default transaction amount
arweave.transactions
  .getPrice(1024 * 1024 * 512)
  .then((price) => (arInput.value = displayNum(arweave.ar.winstonToAr(price))));
watch(
  arInput,
  (value) => (transactionData.quantity = arweave.ar.arToWinston(value))
);
const message = ref("gotta pollinate the pollinators");
watch(message, (value) => (transactionData.data = value));
const transactionData = reactive({
  target: "xA2-DFx2Q-DO7K9drHQcqlPshkDcAWJ1CEOVDM0qqLw",
  quantity: arweave.ar.arToWinston(arInput.value),
  data: message.value,
});
function getTransactionDataOnly() {
  const { quantity, ...data } = transactionData;
  return data;
}

const getTxUpload = () => ({
  signResult: null as null | Transaction,
  dispatchResult: null as null | DispatchResult,
  signDataItemResult: null as null | object,
  error: null as any,
  upload: null as null | number,
});
const txUpload = ref(getTxUpload());
const resetTxUpload = () => (txUpload.value = getTxUpload());

const signTransaction = async () => {
  resetTxUpload();
  if (currentStep.value < 1) {
    currentStep.value = 1;
  }
  try {
    const transaction = await arweave.createTransaction({ ...transactionData });
    transaction.addTag(
      "Pollinator",
      +transactionData.quantity > 0 &&
        transactionData.target === "xA2-DFx2Q-DO7K9drHQcqlPshkDcAWJ1CEOVDM0qqLw"
        ? "Pollinator donation"
        : "Pollinating the pollinators"
    );
    transaction.addTag("Pollinator", "Pollinator");

    await wallet.signTransaction(transaction);
    txUpload.value.signResult = transaction;
    if (currentStep.value < 2) {
      currentStep.value = 2;
    }
  } catch (e) {
    console.error(e);
    txUpload.value.error = e;
    if (currentStep.value < 2) {
      currentStep.value = 2;
    }
  }
};

const dispatchData = async () => {
  resetTxUpload();
  if (currentStep.value < 1) {
    currentStep.value = 1;
  }
  try {
    transactionData.quantity = "0";
    const transaction = await arweave.createTransaction(
      getTransactionDataOnly()
    );

    // Add tags with user input
    transaction.addTag("Pollinator", pollinatorInput.value);
    transaction.addTag("Name", nameInput.value);
    transaction.addTag("Status", statusInput.value);
    transaction.addTag("Vegetation", vegetationInput.value);
    transaction.addTag("Imminent threats", threatsInput.value);

    const result = await wallet.dispatch(transaction);
    txUpload.value.dispatchResult = result;
    if (currentStep.value < 2) {
      currentStep.value = 2;
    }
  } catch (e) {
    console.error(e);
    txUpload.value.error = e;
    if (currentStep.value < 2) {
      currentStep.value = 2;
    }
  }
};

const signDataItem = async () => {
  resetTxUpload();
  if (currentStep.value < 1) {
    currentStep.value = 1;
  }
  try {
    // TODO import
    const { DataItem } = await import("./../scripts/arbundles");
    const dataItem = new DataItem(
      new Buffer(
        await wallet.signDataItem({
          ...getTransactionDataOnly(),
          tags: [{ name: "Pollinator", value: "Pollinator App" }],
        })
      )
    );
    txUpload.value.signDataItemResult = dataItem;
    if (currentStep.value < 2) {
      currentStep.value = 2;
    }
  } catch (e) {
    console.error(e);
    txUpload.value.error = e;
    if (currentStep.value < 2) {
      currentStep.value = 2;
    }
  }
};

const postTransaction = async () => {
  if (txUpload.value.signResult) {
    const uploader = await arweave.transactions.getUploader(
      txUpload.value.signResult
    );
    while (!uploader.isComplete) {
      try {
        await uploader.uploadChunk();
      } catch (e) {
        console.error(e);
      }
    }
    txUpload.value.upload = uploader.lastResponseStatus;
  } else if (txUpload.value.signDataItemResult) {
    const res = await fetch("https://node2.bundlr.network/tx", {
      method: "POST",
      headers: { "Content-Type": "application/octet-stream" },
      body: (txUpload.value.signDataItemResult as any).getRaw(),
    });
    txUpload.value.upload = res.status;
  }
};

const isEncrypted = ref(false);
const encryptionMessage = ref(
  "You also have access to decryption and signing functions for arbitrary data"
);
let encryptionBuffer = arweave.utils.stringToBuffer(encryptionMessage.value);
const runEncryption = async () => {
  const options = { name: "RSA-OAEP" };
  if (isEncrypted.value) {
    encryptionBuffer = await wallet.decrypt(
      new Uint8Array(encryptionBuffer!),
      options
    );
    encryptionMessage.value = decode(encryptionBuffer);
    isEncrypted.value = false;
  } else {
    const publicJWK = {
      kty: "RSA",
      e: "AQAB",
      n: await wallet.getPublicKey(),
      alg: "RSA-OAEP-256",
      ext: true,
    };
    const importedKey = await window.crypto.subtle.importKey(
      "jwk",
      publicJWK,
      { ...options, hash: "SHA-256" },
      false,
      ["encrypt"]
    );
    encryptionBuffer = await window.crypto.subtle.encrypt(
      options,
      importedKey,
      encryptionBuffer
    );
    encryptionMessage.value = arweave.utils.bufferTob64(encryptionBuffer);
    isEncrypted.value = true;
  }
};

const otherMethodResult = ref(null as null | string);
const getArweaveConfig = () =>
  wallet
    .getArweaveConfig()
    .then((res) => (otherMethodResult.value = JSON.stringify(res)));

const inputUrl = ref("");
const currentStep = ref(0);
watch(currentStep, async (val) => {
  while (document.hidden) {
    await new Promise<void>((r) => setTimeout(() => r(), 100));
  }
  setTimeout(() => {
    document.querySelector("#s" + val)?.scrollIntoView({ behavior: "smooth" });
  }, 300);
});

const displayNum = (num: string | number) => {
  typeof num === "string" && (num = parseFloat(num));
  const FractionDigits = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 3,
  }).format(num);
  const SignificantDigits = new Intl.NumberFormat(undefined, {
    maximumSignificantDigits: 1,
  }).format(num);
  return FractionDigits.length >= SignificantDigits.length
    ? FractionDigits
    : (SignificantDigits as any);
};

const arToUsd = (ar: string | number) => {
  if (!ar) {
    return;
  }
  typeof ar === "string" && (ar = parseFloat(ar));
  if (!conversionRate.value) {
    return;
  }
  const result = ar * parseFloat(conversionRate.value);
  return Intl.NumberFormat([...navigator.languages], {
    style: "currency",
    currency: "USD",
  }).format(result);
};

const displayWinston = (winston: string) => {
  const ar = parseFloat(arweave.ar.winstonToAr(winston));
  const displayAR = displayNum(ar);
  const numUSD = arToUsd(ar);
  const displayUSD = numUSD ? ` (${numUSD})` : "";
  return displayAR + " AR" + displayUSD;
};

const conversionRate = ref(undefined as undefined | string);
fetch("https://api.redstone.finance/prices/?symbols=AR&provider=redstone").then(
  (res) => res.json().then((json) => (conversionRate.value = json.AR.value))
);

const commentProps = (e: any) => {
  if (e[0] == "quantity" || e[0] == "reward") {
    return ` // ${displayWinston(e[1])}`;
  }
  if (e[0] == "type") {
    return ` // 'BUNDLED' | 'BASE'`;
  }
  return "";
};
const txToString = (obj: any) =>
  obj &&
  Object.entries(obj).reduce(
    (acc, e) =>
      acc +
      `	${e[0]}: ${
        typeof e[1] === "object" ? JSON.stringify(e[1]) : `'` + e[1] + `'`
      }${commentProps(e)}\n`,
    ""
  );

function encode(text: string) {
  const encoder = new TextEncoder();
  return encoder.encode(text);
}

function decode(buffer: BufferSource) {
  const decoder = new TextDecoder();
  return decoder.decode(buffer);
}

const code = computed(() => [
  `import { ArweaveWebWallet } from 'arweave-wallet-connector'

const wallet = new ArweaveWebWallet({ // Initialize the wallet as soon as possible to get instant auto reconnect
	name: 'Connector Example',
	logo: '${location.href}placeholder.svg'
})

wallet.setUrl('${inputUrl.value || wallet.url}')
await wallet.connect() // on user gesture to avoid blocked popup
`,

  `const transaction = await arweave.createTransaction({
${txToString(transactionData)}})

// sign a Transaction and upload it yourself
await wallet.signTransaction(transaction)

// or let the wallet handle the whole process of committing the
// transaction and uploading its data into the arweave network for you
const dispatchResult = await wallet.dispatch(transaction)

// sign a DataItem and upload it to a specific bundler yourself
const dataItem = new DataItem(new Buffer(await wallet.signDataItem({
${txToString(getTransactionDataOnly())}})))
`,

  `${
    txUpload.value.dispatchResult
      ? "dispatchResult is "
      : txUpload.value.signResult
      ? "Transaction is "
      : "DataItem is "
  }{
${txToString(
  txUpload.value.signResult ||
    txUpload.value.dispatchResult ||
    (txUpload.value.signDataItemResult as any)?.toJSON?.()
)}}
`,

  `let message = '${encryptionMessage.value}'
anyRsaEncryptFunction(message, await wallet.getPublicKey())
await wallet.decrypt(message, { name: 'RSA-OAEP' })
`,
]);

let maxStep = 0;
watch(currentStep, (value) => {
  if (value <= maxStep) {
    return;
  }
  maxStep = value;
  track.event(`Step ${value}`);
});
</script>

<style scoped>
.app {
  --app-spacing: 10px;
  --spacing: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--app-spacing);
  padding-bottom: 0;
  gap: var(--app-spacing);
}

@media (max-width: 599px) {
  .app {
    --app-spacing: 24px;
    --spacing: 1.5em;
  }
  .banner-text {
    font-size: large;
  }
}

@media (max-width: 399px) {
  .app {
    --app-spacing: 12px;
  }
  .banner-text {
    font-size: medium;
  }
}

section {
  min-height: 100vh;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--app-spacing);
}

section > *:first-child {
  margin-top: calc(var(--app-spacing) * 2 + 5em);
}

.row {
  display: flex;
  justify-content: center;
  gap: var(--app-spacing);
}

.logo {
  max-height: min(400px, 40vh);
  opacity: 0.9;
}

.wallet-selector {
  position: sticky;
  top: var(--app-spacing);
  z-index: 1;
}

input {
  color: inherit;
  background: transparent;
  padding: 0.5em;
  margin: 0;
  border: 0;
  outline: 0;
  border-bottom: 1px solid #ffffff22;
}

button {
  color: inherit;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  font-size: 1em;
  cursor: pointer;
  line-height: inherit;
  text-align: inherit;
}

.button {
  font-size: 0.8em;
  color: #ccc;
  text-decoration: none;
  padding: 1em 1.5em 1em 1em;
  background: #202020;
  border-radius: 1.6em;
  display: flex;
  align-items: center;
  box-shadow: 5px 5px 20px #070707, -5px -5px 20px #1b1b1b;
  transition: 1s ease;
  justify-content: center;
  gap: 1.5em;
}

.button:hover {
  background: #282828;
}

.button:active {
  background: #111;
  transition: 0s ease;
}
</style>

<style>
html {
  background: #111;
  box-sizing: border-box;
  line-height: 1;
  scroll-snap-type: y mandatory;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ddd;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

.no-scrollbar {
  scrollbar-width: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
}

.banner-container {
  position: relative; /* This allows absolute positioning of the text */
  display: flex; /* Center the content horizontally */
  justify-content: center; /* Center the content horizontally */
  align-items: center; /* Center the content vertically */
}

.bannerImage {
  width: 100%; /* Ensure image fills the container */
  height: auto; /* Maintain image aspect ratio */
}

.banner-text {
  position: absolute; /* Position the text on top of the image */
  top: 50%; /* Center the text vertically */
  left: 50%; /* Center the text horizontally */
  transform: translate(
    -50%,
    -50%
  ); /* Account for offset due to absolute positioning */
  text-align: center; /* Center the text within the element */
  color: white; /* Assuming white text for better contrast */
  font-size: xx-large;
}

.akaya {
  font-family: "Akaya Kanadaka", system-ui;
  font-weight: 400;
  font-style: normal;
}

.button-container {
  display: flex;
  justify-content: space-between; /* Adjust spacing between buttons */
}

.arweaveimage {
  width: 2.5em; /* Adjust the width as needed */
  height: auto; /* Maintain aspect ratio */
}
</style>
./components/tx.vue./components/test.vue
