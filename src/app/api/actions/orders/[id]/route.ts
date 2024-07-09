/**
 * Solana Actions Example
 */

import {
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
  ActionGetResponse,
  ActionPostRequest,
  MEMO_PROGRAM_ID,
} from "@solana/actions";
import {
  Authorized,
  clusterApiUrl,
  ComputeBudgetProgram,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  StakeProgram,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { OtcSolana } from "@noobmdev/otc-sdk";
import { BN, web3, Program } from "@coral-xyz/anchor";
import {
  NATIVE_MINT,
  createAssociatedTokenAccountInstruction,
  createSyncNativeInstruction,
  getAssociatedTokenAddress,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { ethers } from "ethers";
import { AUTHORITY, EX_TOKEN, OTC_TOKEN_ID, PROGRAM_ID } from "@/app/constants";

async function buildInstructionsWrapSol(
  user: PublicKey,
  amount: BN,
): Promise<TransactionInstruction[]> {
  const instructions: TransactionInstruction[] = [];

  // Get the associated token account for the user
  const associatedTokenAccount = getAssociatedTokenAddressSync(
    NATIVE_MINT,
    user,
  );

  // Create the associated token account instruction if it doesn't exist
  instructions.push(
    createAssociatedTokenAccountInstruction(
      user, // payer
      associatedTokenAccount, // associated token account
      user, // owner of the associated token account
      NATIVE_MINT, // mint address
    ),
  );

  // Transfer SOL to the associated token account
  instructions.push(
    SystemProgram.transfer({
      fromPubkey: user,
      toPubkey: associatedTokenAccount,
      lamports: amount.toNumber(),
    }),
  );

  // Create the sync native instruction
  instructions.push(createSyncNativeInstruction(associatedTokenAccount));

  return instructions;
}

export const GET = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);

    const orderId = requestUrl.pathname.split("/").slice(-1)[0];
    const connection = new Connection(
      process.env.SOLANA_RPC! || clusterApiUrl("devnet"),
    );

    const otcSdk = new OtcSolana(connection, PROGRAM_ID);

    await otcSdk.bootstrap(new PublicKey(AUTHORITY));

    const order = await otcSdk.fetchOrderAccount(new BN(orderId));
    // console.log("🚀 ~ file: route.ts:94 ~ GET ~ order:", order);

    const baseHref = new URL(
      `/api/actions/orders/${orderId}?`,
      requestUrl.origin,
    ).toString();

    const unfulfilledAmount = order.amount.sub(order.filledAmount);

    const payload: ActionGetResponse = {
      title: "OTC - Fill Order",
      icon: new URL("/solana_devs.jpg", requestUrl.origin).toString(),
      description: `Fill an open order ID ${orderId}`,
      label: "Fill Order", // this value will be ignored since `links.actions` exists
      links: {
        actions: [
          {
            label: `Fill ${ethers.formatUnits(
              unfulfilledAmount.mul(new BN(1)).div(new BN(4)).toString(),
              9,
            )} OTC`, // button text
            href: `${baseHref}&amount=${ethers.formatUnits(
              unfulfilledAmount.mul(new BN(1)).div(new BN(4)).toString(),
              9,
            )}`,
          },
          {
            label: `Fill ${ethers.formatUnits(
              unfulfilledAmount.div(new BN(2)).toString(),
              9,
            )} OTC`, // button text
            href: `${baseHref}&amount=${ethers.formatUnits(
              unfulfilledAmount.div(new BN(2)).toString(),
              9,
            )}`,
          },
          {
            label: `Fill ${ethers.formatUnits(
              unfulfilledAmount.mul(new BN(3)).div(new BN(4)).toString(),
              9,
            )} OTC`, // button text
            href: `${baseHref}&amount=${ethers.formatUnits(
              unfulfilledAmount.mul(new BN(3)).div(new BN(4)).toString(),
              9,
            )}`,
          },
          {
            label: `Fill ${ethers.formatUnits(
              unfulfilledAmount.toString(),
              9,
            )} OTC`, // button text
            href: `${baseHref}&amount=${ethers.formatUnits(
              unfulfilledAmount.toString(),
              9,
            )}`,
          },

          // {
          //   label: "Send 5 SOL", // button text
          //   href: `${baseHref}&amount=${"5"}`,
          // },
          // {
          //   label: "Send 10 SOL", // button text
          //   href: `${baseHref}&amount=${"10"}`,
          // },
          {
            label: "Fill amount", // button text
            href: `${baseHref}&amount={amount}`, // this href will have a text input
            parameters: [
              {
                name: "amount", // parameter name in the `href` above
                label: "Enter the amount of OTC token to fill", // placeholder of the text input
                required: true,
              },
            ],
          },
        ],
      },
    };

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (err) {
    console.log("🚀 ~ file: route.ts:173 ~ GET ~ err:", err);
    console.log(err);
    let message = "An unknown error occurred";
    if (typeof err == "string") message = err;
    return new Response(message, {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = GET;

export const POST = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const orderId = requestUrl.pathname.split("/").slice(-1)[0];

    const { amount } = validatedQueryParams(requestUrl);

    const connection = new Connection(
      process.env.SOLANA_RPC! || clusterApiUrl("devnet"),
    );

    const otcSdk = new OtcSolana(connection, PROGRAM_ID.toString());

    await otcSdk.bootstrap(new PublicKey(AUTHORITY));

    const body: ActionPostRequest = await req.json();

    // validate the client provided input
    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      return new Response('Invalid "account" provided', {
        status: 400,
        headers: ACTIONS_CORS_HEADERS,
      });
    }

    const transaction = new Transaction();

    const exTokenMint = new web3.PublicKey(EX_TOKEN);

    const lastTradeId = await otcSdk.fetchLastTradeId();

    const order = await otcSdk.fetchOrderAccount(new BN(orderId));

    const parsedAmount = new BN(
      ethers.parseUnits(amount.toString(), 9).toString(),
    );
    const fillTx = await otcSdk.fillOrder(
      account,
      exTokenMint,
      new BN(orderId),
      lastTradeId,
      parsedAmount,
    );

    const value = parsedAmount.mul(order.collateral).div(order.amount);

    const wrapTx = await buildInstructionsWrapSol(account, value);

    const ata = getAssociatedTokenAddressSync(exTokenMint, account);

    transaction.add(
      // trasnfer SOL
      SystemProgram.transfer({
        fromPubkey: account,
        toPubkey: ata,
        lamports: value.toNumber(),
      }),
      // sync wrapped SOL balance
      createSyncNativeInstruction(ata),
      fillTx,
    );

    // set the end user as the fee payer
    transaction.feePayer = account;

    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `Fill ${amount.toString()} of order ${new BN(5).toString()}`,
        // message: `Send ${amount} SOL to ${toPubkey.toBase58()}`,
      },
      // note: no additional signers are needed
    });

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (err) {
    console.log(err);
    let message = "An unknown error occurred";
    if (typeof err == "string") message = err;
    return new Response(message, {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};

function validatedQueryParams(requestUrl: URL) {
  let amount: number = 0;

  try {
    if (requestUrl.searchParams.get("amount")) {
      amount = parseFloat(requestUrl.searchParams.get("amount")!);
    }
  } catch (err) {
    throw "Invalid input query parameter: amount";
  }

  return {
    amount,
  };
}
