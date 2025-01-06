import { LAMPORTS_PER_SOL, PublicKey, Connection } from "@solana/web3.js";

import { getAccount } from "@solana/spl-token";

import { getTokenDataByAddress } from "@/lib/solana";

import type { SolanaActionResult } from "../solana-action";
import type { AllBalancesArgumentsType, AllBalancesResultBodyType } from "./types";

export async function getAllBalances(
  connection: Connection,
  args: AllBalancesArgumentsType
): Promise<SolanaActionResult<AllBalancesResultBodyType>> {
  try {
    let balances: {
      balance: number;
      token: string;
      name: string;
      logoURI: string;
    }[] = [];

    // Get SOL balance
    const solBalance = await connection.getBalance(new PublicKey(args.walletAddress)) / LAMPORTS_PER_SOL;
    balances.push({
      balance: solBalance,
      token: "SOL",
      name: "Solana",
      logoURI: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX6PYmAiDpUliZWnmCHKPc3VI7QESDKhLndQ&s"
    });

    // Get all token accounts
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      new PublicKey(args.walletAddress),
      { programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA") }
    );

    // Get balance for each token account
    for await (const account of tokenAccounts.value) {
      const tokenAccount = await connection.getTokenAccountBalance(account.pubkey);
      if (tokenAccount.value.uiAmount && tokenAccount.value.uiAmount > 0) {
        // Get the token account info which includes the mint address
        const accountInfo = await getAccount(connection, account.pubkey);
        // Use the mint address instead of the token account address
        const token = await getTokenDataByAddress(accountInfo.mint.toString());
        if (token) {
          balances.push({
            balance: tokenAccount.value.uiAmount,
            token: token.symbol,
            name: token.name,
            logoURI: token.logoURI
          });
        }
      }
    }

    return {
      message: `The user has been shown all of their balances in the UI. You do not need to list the balances again, instead ask what they want to do next.`,
      body: {
        balances: balances
      }
    };
  } catch (error) {
    console.error(error);
    return {
      message: `Error getting balances: ${error}`,
      body: {
        balances: []
      }
    };
  }
} 