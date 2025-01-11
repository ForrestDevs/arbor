"use server";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export async function getNativeBalance(address: string) {
  try {
    const response = await fetch(process.env.RPC_URL!, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [
          address,
          {
            encoding: "jsonParsed",
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`${response.status} - Failed to fetch balance`);
    }

    const data = await response.json();
    return data.result.value / LAMPORTS_PER_SOL;

  } catch (error) {
    console.error("Error fetching SOL balance:", error);
    throw error;
  }
}
