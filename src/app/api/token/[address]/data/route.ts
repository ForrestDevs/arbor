import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { PublicKey } from "@solana/web3.js";
import { Connection } from "@solana/web3.js";
// import { getMint } from "@solana/spl-token/";
import {
  getPoolFromLpMint,
  raydiumAuthorityAddress,
} from "@/lib/services/raydium";
import { Token } from "@/lib/types/solana/token";

interface Params {
  address: string;
}

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<Params> }
) => {
  const address = (await params).address;
  try {
    // const mintData = await getMint(
    //   new Connection(process.env.RPC_URL!),
    //   new PublicKey(address)
    // );
    // console.log(mintData);

    // if (mintData.mintAuthority?.toBase58() === raydiumAuthorityAddress) {
    //   const pool = await getPoolFromLpMint(address);
    //   if (!pool) return NextResponse.json(null);

    //   const lpTokenData: Token = {
    //     id: address,
    //     name: `${pool.mintA.symbol}/${pool.mintB.symbol}`,
    //     symbol: `${pool.mintA.symbol}/${pool.mintB.symbol}`,
    //     decimals: 6,
    //     tags: [],
    //     logoURI: "/dexes/raydium.png",
    //     mintAuthority: mintData.mintAuthority?.toBase58() || null,
    //     freezeAuthority: mintData.freezeAuthority?.toBase58() || null,
    //     permanentDelegate: null,
    //     extensions: {},
    //   };

    //   console.log(lpTokenData);

    //   return NextResponse.json(lpTokenData);
    // }

    return NextResponse.json(null, { status: 404 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(null, { status: 500 });
  }
};
