import useSWR from "swr";

export const useUnstakeData = ({ 
    inputAmount, 
    slippageBps,
    userPublicKey,
    contractAddress,
}: { 
    inputAmount: number, 
    slippageBps: number,
    userPublicKey: string,
    contractAddress: string,
}) => {

    const { data, isLoading, error } = useSWR(`/api/build-transaction/unstake`, (url: string) => fetch(url, {
        method: "POST",
        body: JSON.stringify({
            inputAmount,
            slippageBps,
            userPublicKey,
            contractAddress,
        }),
    }).then(res => res.json()));

    return { data, isLoading, error };
}