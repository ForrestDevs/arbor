import useSWR from 'swr';
// import { JupiterTokenData, TokenAccount } from "@/lib/types";

const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch token accounts');
    }
    return response.json();
};

export const useTokenAccounts = (address: string | undefined) => {
    const { data, isLoading, error, mutate } = useSWR(
        address ? `/api/token-accounts/owner/${address}` : null,
        fetcher
    );

    return { 
        data: data ?? [], 
        isLoading, 
        error, 
        mutate 
    };
} 