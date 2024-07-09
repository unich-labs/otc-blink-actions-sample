"use client";

import { AUTHORITY, PROGRAM_ID } from "@/app/constants";
import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils";
import { OtcSolana } from "@noobmdev/otc-sdk";
import { useConnection } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { ethers } from "ethers";
import { useParams } from "next/navigation";
import { useMemo, useCallback, useEffect, useState } from "react";
import { BN } from "@coral-xyz/anchor";
import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Pages() {
  const { connection } = useConnection();
  const { id } = useParams();

  const [order, setOrder] = useState<{
    tokenId: BN;
    exToken: PublicKey;
    orderType: any;
    amount: BN;
    filledAmount: BN;
    collateral: BN;
    value: BN;
    createdAt: BN;
  }>();

  const otcSdk = useMemo(() => {
    let _connection = connection;
    if (!_connection)
      _connection = new Connection(
        process.env.SOLANA_RPC! || clusterApiUrl("devnet"),
      );
    return new OtcSolana(_connection, PROGRAM_ID);
  }, [publicKey, connection]);

  const getOrder = useCallback(async () => {
    if (!id) return;
    await otcSdk.bootstrap(new PublicKey(AUTHORITY));
    const order = await otcSdk.fetchOrderAccount(new BN(id.toString()));
    console.log("🚀 ~ file: page.tsx:44 ~ getOrder ~ order:", order);
    setOrder(order);
  }, [otcSdk, id]);

  useEffect(() => {
    getOrder();
  }, [otcSdk, id]);

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <Link href={"/"}>Home</Link>
          <WalletMultiButton />
        </div>
      </div>
      <div>
        <div>Id: {id}</div>
        <div>
          Amount: {ethers.formatUnits(order?.amount.toString() ?? 0, 9)}
        </div>
        <div>Value: {ethers.formatUnits(order?.value.toString() ?? 0, 9)}</div>
        <div>
          Filled Amount:{" "}
          {ethers.formatUnits(order?.filledAmount.toString() ?? 0, 9)}
        </div>
      </div>
    </>
  );
}
