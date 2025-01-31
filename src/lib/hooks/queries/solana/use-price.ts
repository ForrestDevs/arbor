import useSWR from "swr";

import { Price } from "@/lib/services/birdeye";
import { getPrice } from "@/lib/services/birdeye";

export const usePrice = (mint: string) => {
  const { data, isLoading, error, mutate } = useSWR<Price>(
    `/api/token/${mint}/price`,
    async () => {
      const response = await getPrice(mint);
      return response;
    }
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
