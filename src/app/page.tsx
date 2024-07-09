"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useMemo, useEffect, useCallback } from "react";
import { OtcSolana } from "@noobmdev/otc-sdk";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { AUTHORITY, EX_TOKEN, OTC_TOKEN_ID, PROGRAM_ID } from "./constants";
import {
  Connection,
  PublicKey,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { ethers } from "ethers";
import { BN } from "@coral-xyz/anchor";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Pages() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [amount, setAmount] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [isSell, setIsSell] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const [orders, setOrders] = useState<
    {
      account: {
        tokenId: BN;
        exToken: PublicKey;
        orderType: any;
        amount: BN;
        filledAmount: BN;
        collateral: BN;
        value: BN;
        createdAt: BN;
      };
      publicKey: PublicKey;
    }[]
  >([]);

  const otcSdk = useMemo(() => {
    let _connection = connection;
    if (!_connection)
      _connection = new Connection(
        process.env.SOLANA_RPC! || clusterApiUrl("devnet"),
      );
    return new OtcSolana(_connection, PROGRAM_ID);
  }, [publicKey, connection]);

  const getOrders = useCallback(async () => {
    const orders = await otcSdk.program.account.orderAccount.all();
    orders.sort(
      (a, b) =>
        +a.account.createdAt.toString() - +b.account.createdAt.toString(),
    );
    setOrders(orders);
  }, [otcSdk, refresh]);

  useEffect(() => {
    getOrders();
  }, [otcSdk, refresh]);

  const handleCreateOrder = useCallback(async () => {
    await otcSdk.bootstrap(new PublicKey(AUTHORITY));

    if (!publicKey) return;

    try {
      const lastOrderId = await otcSdk.fetchLastOrderId();
      const createTx = await otcSdk.createOrder(
        lastOrderId,
        publicKey,
        isSell
          ? {
              sell: {},
            }
          : {
              buy: {},
            },
        new PublicKey(EX_TOKEN),
        new BN(OTC_TOKEN_ID),
        new BN(ethers.parseUnits(amount.toString(), 9).toString()),
        new BN(ethers.parseUnits(value.toString(), 9).toString()),
        new BN(0),
        false,
      );

      const tx = await sendTransaction(createTx, connection);
      await connection.confirmTransaction(tx, "confirmed");
      setRefresh((pre) => !pre);
      alert("Create success");
    } catch (error) {
      console.log("🚀 ~ file: page.tsx:90 ~ handleCreateOrder ~ error:", error);
    }
  }, [publicKey, otcSdk, amount, value, isSell]);

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <Link href={"/"}>Home</Link>
          <WalletMultiButton />
        </div>
      </div>

      <section className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-white text-black"
            placeholder="Enter amount"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="value">Value</label>
          <input
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="bg-white text-black"
            placeholder="Enter value"
          />
        </div>

        <div className="flex gap-4 items-center">
          <label htmlFor="is-sell">Is Sell order?</label>
          <input
            id="is-sell"
            type="checkbox"
            checked={isSell}
            onChange={(e) => setIsSell((pre) => !pre)}
          />
        </div>

        <button
          className="col-span-2 bg-green-600 rounded-lg p-2"
          onClick={handleCreateOrder}
        >
          Create
        </button>
      </section>

      <section className="grid grid-cols-4 gap-4 mt-4">
        {orders.map((order, idx) => (
          <Link href={`/orders/${idx + 1}`} key={idx} className="border-2 p-2">
            <div>Id: {idx + 1}</div>
            <div>
              Amount: {ethers.formatUnits(order.account.amount.toString(), 9)}
            </div>
            <div>
              Value: {ethers.formatUnits(order.account.value.toString(), 9)}
            </div>
            <div>
              Filled Amount:{" "}
              {ethers.formatUnits(order.account.filledAmount.toString(), 9)}
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
