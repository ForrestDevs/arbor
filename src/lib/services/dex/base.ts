"use server";

export type BaseResponse<T> = T;

export const queryDex = async <T>(
  endpoint: string,
  params?: Record<string, string | number>
): Promise<T> => {
  const url = new URL(`https://api.dexscreener.com/latest/${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Dex Screener API error: ${response.status}`);
  }

  const data: BaseResponse<T> = await response.json();

  return data;
};
