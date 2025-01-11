import { z } from "zod";

export const UnstakeInputSchema = z.object({
    amount: z.number().positive().describe("The amount of JupSOL to unstake. Must be a positive number."),
    contractAddress: z.string().describe("The contract address of the liquid staking provider to use."),
}); 