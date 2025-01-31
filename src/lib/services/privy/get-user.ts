"use server";

import { cookies } from "next/headers";
import { privy } from "@/lib/services/privy";

export const getUser = async () => {
  const idToken = (await cookies()).get("privy-id-token")?.value;
  if (!idToken) {
    return null;
  }
  const user = await privy.getUser({ idToken });
  return user;
};
