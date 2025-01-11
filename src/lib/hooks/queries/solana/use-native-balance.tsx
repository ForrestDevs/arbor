"use client";

import useSWR from "swr";
import { getNativeBalance } from "@/lib/api/actions";

export const useNativeBalance = (address: string) => {
  const { data, isLoading, error, mutate } = useSWR(
    `native-balance/${address}`,
    async () => {
      try {
        return await getNativeBalance(address);
      } catch (error) {
        console.error("Error fetching SOL balance:", error);
        throw error;
      }
    }
  );

  return { data: data ?? 0, isLoading, error, mutate };
};
