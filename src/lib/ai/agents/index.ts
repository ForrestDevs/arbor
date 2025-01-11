import { marketAgent } from "./market";
import { stakingAgent } from "./staking";
import { walletAgent } from "./wallet";
import { tradingAgent } from "./trading";
import { socialAgent } from "./social";

export const agents = [
  walletAgent,
  stakingAgent,
  marketAgent,
  tradingAgent,
  socialAgent,
];
