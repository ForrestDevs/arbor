import { Raydium } from "@raydium-io/raydium-sdk-v2";
import { Connection, PublicKey } from "@solana/web3.js";

export const raydiumApiClient = Raydium.load({
  connection: new Connection(process.env.RPC_URL!),
});

export const raydiumTransactionClient = async (address: string) =>
  Raydium.load({
    connection: new Connection(process.env.RPC_URL!),
    owner: new PublicKey(address),
    disableFeatureCheck: true,
    blockhashCommitment: "finalized",
  });
