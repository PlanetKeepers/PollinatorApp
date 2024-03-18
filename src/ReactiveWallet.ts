// Import the wallet connector
import { ArweaveWebWallet } from "arweave-wallet-connector";
import { reactive } from "vue";

export const wallet = new ArweaveWebWallet(
  { name: "Planet Keeper", logo: `${location.href}deereyes.jpg` },
  {
    state: reactive({
      url: import.meta.env.DEV ? "http://localhost:8080" : "arweave.app",
    }),
  }
);

// @ts-ignore
window.wallet = wallet;
