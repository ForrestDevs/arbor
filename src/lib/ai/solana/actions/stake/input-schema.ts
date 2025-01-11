import { z } from "zod";

export const StakeInputSchema = z.object({
    amount: z.number().positive().describe("The amount of SOL to stake. Must be a positive number."),
    contractAddress: z.string().describe("The contract address of the liquid staking provider to use."),
}); 