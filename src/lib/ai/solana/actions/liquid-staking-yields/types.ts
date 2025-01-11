import { z } from "zod";
import { LiquidStakingYieldsInputSchema } from "./input-schema";
import { SolanaActionResult } from "../solana-action";
import { JupiterTokenData } from "@/lib/types";

export type LiquidStakingYieldsSchemaType = typeof LiquidStakingYieldsInputSchema;

export type LiquidStakingYieldsArgumentsType = z.infer<LiquidStakingYieldsSchemaType>;

export type LiquidStakingYieldsResultBodyType = {
    name: string;
    yield: number;
    tokenData: JupiterTokenData;
}[]

export type LiquidStakingYieldsResultType = SolanaActionResult<LiquidStakingYieldsResultBodyType>;