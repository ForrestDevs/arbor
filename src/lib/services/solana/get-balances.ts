"use server";

import { TokenAccountsResponse } from "@/lib/types";

export const getBalances = async (address: string): Promise<TokenAccountsResponse> => {
    const response = await fetch("https://api.mainnet-beta.solana.com", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "id": "tokens-accounts",
            "method": "getTokenAccounts",
            "params": {
                "owner": address
            }
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch token accounts');
    }

    const data = await response.json();

    return data.result;
}