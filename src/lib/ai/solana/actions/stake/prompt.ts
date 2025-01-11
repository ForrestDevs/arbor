export const SOLANA_STAKE_PROMPT = 
`Stake SOL for yield using a liquid staking provider. 

Requires two parameters: 
1. Amount of SOL to stake.
2. The contract address of the liquid staking provider to use.

If a user asks to stake and provides a symbol, use the get-token-data tool to get the contract address of the liquid staking provider to use.
If a user asks to stake and provides a name, ask them for the symbol first.

If a user asks to stake without a symbol or a name, use the get-liquid-staking-yields tool to get the best liquid staking yields and ask the user to choose one.`; 