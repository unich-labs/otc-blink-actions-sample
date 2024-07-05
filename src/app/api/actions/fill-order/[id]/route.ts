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
import {
  AUTHORITY,
  DEFAULT_SOL_ADDRESS,
  DEFAULT_SOL_AMOUNT,
  PROGRAM_ID,
} from "./const";
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

async function buildInstructionsWrapSol(
  user: PublicKey,
  amount: number,
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
      lamports: LAMPORTS_PER_SOL * amount,
    }),
  );

  // Create the sync native instruction
  instructions.push(createSyncNativeInstruction(associatedTokenAccount));

  return instructions;
}

export const GET = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { toPubkey, orderId } = validatedQueryParams(requestUrl);

    const connection = new Connection(
      process.env.SOLANA_RPC! || clusterApiUrl("devnet"),
    );

    const otcSdk = new OtcSolana(connection, PROGRAM_ID.toString());

    await otcSdk.bootstrap(AUTHORITY);

    const config = await otcSdk.program.account.configAccount.all();
    console.log("🚀 ~ file: route.ts:94 ~ GET ~ config:", config);

    const order = await otcSdk.fetchOrderAccount(new BN(5));
    console.log("🚀 ~ file: route.ts:94 ~ GET ~ order:", order);

    const baseHref = new URL(
      `/api/actions/fill-order?to=${toPubkey.toBase58()}`,
      requestUrl.origin,
    ).toString();

    const unfulfilledAmount = order.amount.sub(order.filledAmount);

    const payload: ActionGetResponse = {
      title: "OTC - Fill Order",
      icon: new URL("/solana_devs.jpg", requestUrl.origin).toString(),
      description: "Fill an open order",
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
    const { amount, toPubkey } = validatedQueryParams(requestUrl);

    const connection = new Connection(
      process.env.SOLANA_RPC! || clusterApiUrl("devnet"),
    );

    const otcSdk = new OtcSolana(connection, PROGRAM_ID.toString());

    await otcSdk.bootstrap(AUTHORITY);

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

    // ensure the receiving account will be rent exempt
    const minimumBalance = await connection.getMinimumBalanceForRentExemption(
      0, // note: simple accounts that just store native SOL have `0` bytes of data
    );
    if (amount * LAMPORTS_PER_SOL < minimumBalance) {
      throw `account may not be rent exempt: ${toPubkey.toBase58()}`;
    }

    const transaction = new Transaction();

    const exTokenMint = new web3.PublicKey(
      "So11111111111111111111111111111111111111112",
    );

    const lastOrderId = await otcSdk.fetchLastOrderId();

    const createOrderTx = await otcSdk.createOrder(
      lastOrderId,
      account,
      {
        buy: {},
      },
      exTokenMint,
      new BN(1),
      new BN(100000),
      new BN(300000),
      new BN(0),
      false,
    );

    const wrapSolTx = await buildInstructionsWrapSol(account, 1);

    transaction.add(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 10000,
      }),
      // ...wrapSolTx,
      // trasnfer SOL
      // SystemProgram.transfer({
      //   fromPubkey: account,
      //   toPubkey: userATA,
      //   lamports: 1000000000,
      // }),
      // // sync wrapped SOL balance
      // createSyncNativeInstruction(userATA),
      createOrderTx,
    );

    // set the end user as the fee payer
    transaction.feePayer = account;

    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `Send ${amount} SOL to ${toPubkey.toBase58()}`,
      },
      // note: no additional signers are needed
      // signers: [],
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
  let toPubkey: PublicKey = DEFAULT_SOL_ADDRESS;
  let amount: number = DEFAULT_SOL_AMOUNT;
  let orderId: number = 400000000;

  try {
    if (requestUrl.searchParams.get("orderId")) {
      orderId = parseInt(requestUrl.searchParams.get("orderId")!);
    }
  } catch (err) {
    throw "Invalid input query parameter: orderId";
  }

  try {
    if (requestUrl.searchParams.get("to")) {
      toPubkey = new PublicKey(requestUrl.searchParams.get("to")!);
    }
  } catch (err) {
    throw "Invalid input query parameter: to";
  }

  try {
    if (requestUrl.searchParams.get("amount")) {
      amount = parseFloat(requestUrl.searchParams.get("amount")!);
    }

    if (amount <= 0) throw "amount is too small";
  } catch (err) {
    throw "Invalid input query parameter: amount";
  }

  return {
    orderId,
    amount,
    toPubkey,
  };
}
