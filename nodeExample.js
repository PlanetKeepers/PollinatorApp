import { ArweaveWalletServer } from "arweave-wallet-connector/lib/node";
import Arweave from "arweave";

// todo fix disconnect
const wallet = new ArweaveWalletServer("arweave.app");

const main = async () => {
  console.log("Launching a connection to talk to arweave.app from node.js");
  console.log("Waiting for connection...");
  const arweave = new Arweave({
    host: "arweave.net",
    port: 443,
    protocol: "https",
  });
  const address = await wallet.connect();
  console.log("Wallet connected: ", address);
  console.log("Waiting for signature...");
  const tx = await arweave.createTransaction({
    target: "xA2-DFx2Q-DO7K9drHQcqlPshkDcAWJ1CEOVDM0qqLw",
    quantity: await arweave.transactions.getPrice(1024 * 1024 * 1024),
  });
  const signedTx = await wallet.signTransaction(tx);
  console.log("Transaction signed", signedTx);
  await arweave.transactions.post(signedTx);
  console.log("Transaction uploaded");
};

(async () => {
  const e = await main()
    .then(() => undefined)
    .catch((e) => e);
  await wallet.disconnect();
  if (e) {
    throw e;
  }
  process.exit(0);
})();
