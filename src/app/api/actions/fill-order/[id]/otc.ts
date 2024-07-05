export type Otc = {
  version: "0.1.0";
  name: "otc";
  constants: [
    {
      name: "CONFIG_PDA_SEED";
      type: "bytes";
      value: "[99, 111, 110, 102, 105, 103]";
    },
    {
      name: "ROLE_PDA_SEED";
      type: "bytes";
      value: "[114, 111, 108, 101]";
    },
    {
      name: "USER_PDA_SEED";
      type: "bytes";
      value: "[117, 115, 101, 114]";
    },
    {
      name: "OTC_TOKEN_PDA_SEED";
      type: "bytes";
      value: "[111, 116, 99, 95, 116, 111, 107, 101, 110]";
    },
    {
      name: "ORDER_PDA_SEED";
      type: "bytes";
      value: "[111, 114, 100, 101, 114]";
    },
    {
      name: "TRADE_PDA_SEED";
      type: "bytes";
      value: "[116, 114, 97, 100, 101]";
    },
    {
      name: "CASHOUT_PDA_SEED";
      type: "bytes";
      value: "[99, 97, 115, 104, 111, 117, 116]";
    },
    {
      name: "EX_TOKEN_PDA_SEED";
      type: "bytes";
      value: "[101, 120, 95, 116, 111, 107, 101, 110]";
    },
    {
      name: "VAULT_TOKEN_PDA_SEED";
      type: "bytes";
      value: "[118, 97, 117, 108, 116, 95, 116, 111, 107, 101, 110]";
    },
    {
      name: "VAULT_OTC_TOKEN_PDA_SEED";
      type: "bytes";
      value: "[118, 97, 117, 108, 116, 95, 111, 116, 99, 95, 116, 111, 107, 101, 110]";
    },
    {
      name: "WEI6";
      type: "u64";
      value: "1_000_000";
    },
    {
      name: "BUYER";
      type: "u8";
      value: "2";
    },
    {
      name: "SELLER";
      type: "u8";
      value: "3";
    },
  ];
  instructions: [
    {
      name: "initializeConfig";
      accounts: [
        {
          name: "configAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeWallet";
          isMut: false;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
    {
      name: "updateConfig";
      accounts: [
        {
          name: "configAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: true;
        },
      ];
      args: [
        {
          name: "feeRefund";
          type: {
            option: "u64";
          };
        },
        {
          name: "feeSettle";
          type: {
            option: "u64";
          };
        },
        {
          name: "feeWallet";
          type: {
            option: "publicKey";
          };
        },
      ];
    },
    {
      name: "setRole";
      accounts: [
        {
          name: "configAccount";
          isMut: false;
          isSigner: false;
        },
        {
          name: "roleAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "user";
          isMut: false;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "role";
          type: {
            defined: "Role";
          };
        },
      ];
    },
    {
      name: "addOtcToken";
      accounts: [
        {
          name: "otcTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "configAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "roleAccount";
          isMut: false;
          isSigner: false;
        },
        {
          name: "operator";
          isMut: true;
          isSigner: true;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "tokenId";
          type: "u64";
        },
        {
          name: "pledgeRate";
          type: "u64";
        },
      ];
    },
    {
      name: "settleOtcToken";
      accounts: [
        {
          name: "vaultOtcTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "otcTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeOtcTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "configAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "roleAccount";
          isMut: false;
          isSigner: false;
        },
        {
          name: "operator";
          isMut: true;
          isSigner: true;
        },
        {
          name: "feeWallet";
          isMut: false;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "tokenId";
          type: "u64";
        },
        {
          name: "settleDuration";
          type: "i64";
        },
        {
          name: "settleRate";
          type: "u64";
        },
      ];
    },
    {
      name: "setExToken";
      accounts: [
        {
          name: "vaultTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "exTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeExTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "configAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "roleAccount";
          isMut: false;
          isSigner: false;
        },
        {
          name: "operator";
          isMut: true;
          isSigner: true;
        },
        {
          name: "feeWallet";
          isMut: false;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "isAccepted";
          type: "bool";
        },
      ];
    },
    {
      name: "createOrder";
      accounts: [
        {
          name: "otcTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "orderAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vaultTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "configAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "exTokenAccount";
          isMut: false;
          isSigner: false;
        },
        {
          name: "userTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "exToken";
          isMut: false;
          isSigner: false;
        },
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "orderId";
          type: "u64";
        },
        {
          name: "orderType";
          type: {
            defined: "OrderType";
          };
        },
        {
          name: "tokenId";
          type: "u64";
        },
        {
          name: "amount";
          type: "u64";
        },
        {
          name: "value";
          type: "u64";
        },
        {
          name: "slippage";
          type: "u64";
        },
        {
          name: "isBid";
          type: "bool";
        },
      ];
    },
    {
      name: "fillOrder";
      accounts: [
        {
          name: "tradeAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "orderAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vaultTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "configAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "exTokenAccount";
          isMut: false;
          isSigner: false;
        },
        {
          name: "userTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "exToken";
          isMut: false;
          isSigner: false;
        },
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "orderId";
          type: "u64";
        },
        {
          name: "tradeId";
          type: "u64";
        },
        {
          name: "amount";
          type: "u64";
        },
      ];
    },
    {
      name: "cashoutTrade";
      accounts: [
        {
          name: "cashoutOrderAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tradeAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "configAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "cashoutId";
          type: "u64";
        },
        {
          name: "tradeId";
          type: "u64";
        },
        {
          name: "value";
          type: "u64";
        },
      ];
    },
    {
      name: "matchOrder";
      accounts: [
        {
          name: "tradeAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "orderBuyAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "orderSellAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "configAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "orderBuyId";
          type: "u64";
        },
        {
          name: "orderSellId";
          type: "u64";
        },
        {
          name: "tradeId";
          type: "u64";
        },
      ];
    },
    {
      name: "cancelOrder";
      accounts: [
        {
          name: "orderAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vaultTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "configAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "exTokenAccount";
          isMut: false;
          isSigner: false;
        },
        {
          name: "userTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "exToken";
          isMut: false;
          isSigner: false;
        },
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "feeWallet";
          isMut: false;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "orderId";
          type: "u64";
        },
      ];
    },
    {
      name: "buyerSettleFilled";
      accounts: [
        {
          name: "tradeAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "orderAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "otcTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "exTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vaultTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vaultOtcTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "configAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "buyerExTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "sellerExTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "buyerOtcTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeOtcTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeExTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "otcToken";
          isMut: false;
          isSigner: false;
        },
        {
          name: "exToken";
          isMut: false;
          isSigner: false;
        },
        {
          name: "buyer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "exTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "otcTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "orderId";
          type: "u64";
        },
        {
          name: "tradeId";
          type: "u64";
        },
      ];
    },
    {
      name: "sellerSettleFilled";
      accounts: [
        {
          name: "tradeAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "orderAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "otcTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "exTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vaultTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vaultOtcTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "configAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "sellerExTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "buyerOtcTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "sellerOtcTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeOtcTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeExTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "otcToken";
          isMut: false;
          isSigner: false;
        },
        {
          name: "exToken";
          isMut: false;
          isSigner: false;
        },
        {
          name: "seller";
          isMut: true;
          isSigner: true;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "exTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "otcTokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "orderId";
          type: "u64";
        },
        {
          name: "tradeId";
          type: "u64";
        },
      ];
    },
    {
      name: "buyerSettleCanceled";
      accounts: [
        {
          name: "tradeAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "orderAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "otcTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "exTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vaultTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "configAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "buyerExTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeExTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "exToken";
          isMut: false;
          isSigner: false;
        },
        {
          name: "otcToken";
          isMut: false;
          isSigner: false;
        },
        {
          name: "buyer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "exTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "otcTokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "orderId";
          type: "u64";
        },
        {
          name: "tradeId";
          type: "u64";
        },
      ];
    },
    {
      name: "sellerSettleCanceled";
      accounts: [
        {
          name: "tradeAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "orderAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "otcTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "exTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vaultTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vaultOtcTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "configAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "sellerOtcTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "sellerExTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeExTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "exToken";
          isMut: false;
          isSigner: false;
        },
        {
          name: "otcToken";
          isMut: false;
          isSigner: false;
        },
        {
          name: "seller";
          isMut: true;
          isSigner: true;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "exTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "otcTokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "orderId";
          type: "u64";
        },
        {
          name: "tradeId";
          type: "u64";
        },
      ];
    },
  ];
  accounts: [
    {
      name: "cashoutAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "tradeId";
            type: "u64";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "value";
            type: "u64";
          },
          {
            name: "cashoutBy";
            type: "publicKey";
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "configAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "publicKey";
          },
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "feeRefund";
            type: "u64";
          },
          {
            name: "feeSettle";
            type: "u64";
          },
          {
            name: "feeWallet";
            type: "publicKey";
          },
          {
            name: "lastOrderId";
            type: "u64";
          },
          {
            name: "lastTradeId";
            type: "u64";
          },
          {
            name: "lastCashoutId";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "exTokenAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "token";
            type: "publicKey";
          },
          {
            name: "vaultToken";
            type: "publicKey";
          },
          {
            name: "isAccepted";
            type: "bool";
          },
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "vaultBump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "orderAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "tokenId";
            type: "u64";
          },
          {
            name: "exToken";
            type: "publicKey";
          },
          {
            name: "orderType";
            type: {
              defined: "OrderType";
            };
          },
          {
            name: "isBid";
            type: "bool";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "value";
            type: "u64";
          },
          {
            name: "slippage";
            type: "u64";
          },
          {
            name: "collateral";
            type: "u64";
          },
          {
            name: "filledAmount";
            type: "u64";
          },
          {
            name: "status";
            type: {
              defined: "OfferStatus";
            };
          },
          {
            name: "orderBy";
            type: "publicKey";
          },
          {
            name: "createdAt";
            type: "i64";
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "otcTokenAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "token";
            type: "publicKey";
          },
          {
            name: "settleDuration";
            type: "i64";
          },
          {
            name: "settleTime";
            type: "i64";
          },
          {
            name: "settleRate";
            type: "u64";
          },
          {
            name: "pledgeRate";
            type: "u64";
          },
          {
            name: "status";
            type: {
              defined: "OtcTokenStatus";
            };
          },
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "vaultBump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "roleAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "user";
            type: "publicKey";
          },
          {
            name: "role";
            type: {
              defined: "Role";
            };
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "tradeAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "orderId";
            type: "u64";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "value";
            type: "u64";
          },
          {
            name: "status";
            type: {
              defined: "OrderStatus";
            };
          },
          {
            name: "sellerValue";
            type: "u64";
          },
          {
            name: "buyerValue";
            type: "u64";
          },
          {
            name: "settled";
            type: "u8";
          },
          {
            name: "buyerCashouted";
            type: "u64";
          },
          {
            name: "sellerCashouted";
            type: "u64";
          },
          {
            name: "seller";
            type: "publicKey";
          },
          {
            name: "buyer";
            type: "publicKey";
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "userAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "feeRefund";
            type: "u64";
          },
          {
            name: "feeSettle";
            type: "u64";
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
  ];
  types: [
    {
      name: "OrderType";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Buy";
          },
          {
            name: "Sell";
          },
        ];
      };
    },
    {
      name: "OfferStatus";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Open";
          },
          {
            name: "Filled";
          },
          {
            name: "Canceled";
          },
        ];
      };
    },
    {
      name: "OtcTokenStatus";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Active";
          },
          {
            name: "Inactive";
          },
          {
            name: "Settle";
          },
        ];
      };
    },
    {
      name: "Role";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Operator";
          },
          {
            name: "Admin";
          },
        ];
      };
    },
    {
      name: "OrderStatus";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Open";
          },
          {
            name: "SettleFilled";
          },
          {
            name: "SettleCanceled";
          },
          {
            name: "Canceled";
          },
        ];
      };
    },
  ];
  events: [
    {
      name: "InitializedEvent";
      fields: [
        {
          name: "authority";
          type: "publicKey";
          index: false;
        },
        {
          name: "feeWallet";
          type: "publicKey";
          index: false;
        },
        {
          name: "feeRefund";
          type: "u64";
          index: false;
        },
        {
          name: "feeSettle";
          type: "u64";
          index: false;
        },
      ];
    },
    {
      name: "SetRoleEvent";
      fields: [
        {
          name: "configAccount";
          type: "publicKey";
          index: false;
        },
        {
          name: "user";
          type: "publicKey";
          index: false;
        },
        {
          name: "role";
          type: {
            defined: "Role";
          };
          index: false;
        },
      ];
    },
    {
      name: "NewTokenEvent";
      fields: [
        {
          name: "tokenId";
          type: "u64";
          index: false;
        },
      ];
    },
    {
      name: "SettledTokenEvent";
      fields: [
        {
          name: "tokenId";
          type: "u64";
          index: false;
        },
        {
          name: "token";
          type: "publicKey";
          index: false;
        },
        {
          name: "settleRate";
          type: "u64";
          index: false;
        },
        {
          name: "settleTime";
          type: "i64";
          index: false;
        },
      ];
    },
    {
      name: "SetExTokenEvent";
      fields: [
        {
          name: "exToken";
          type: "publicKey";
          index: false;
        },
        {
          name: "config";
          type: "publicKey";
          index: false;
        },
        {
          name: "isAccepted";
          type: "bool";
          index: false;
        },
      ];
    },
    {
      name: "NewOrderEvent";
      fields: [
        {
          name: "orderId";
          type: "u64";
          index: false;
        },
        {
          name: "orderType";
          type: {
            defined: "OrderType";
          };
          index: false;
        },
        {
          name: "tokenId";
          type: "u64";
          index: false;
        },
        {
          name: "exToken";
          type: "publicKey";
          index: false;
        },
        {
          name: "amount";
          type: "u64";
          index: false;
        },
        {
          name: "value";
          type: "u64";
          index: false;
        },
        {
          name: "collateral";
          type: "u64";
          index: false;
        },
        {
          name: "slippage";
          type: "u64";
          index: false;
        },
        {
          name: "orderBy";
          type: "publicKey";
          index: false;
        },
        {
          name: "isBid";
          type: "bool";
          index: false;
        },
      ];
    },
    {
      name: "NewTradeEvent";
      fields: [
        {
          name: "orderId";
          type: "u64";
          index: false;
        },
        {
          name: "tradeId";
          type: "u64";
          index: false;
        },
        {
          name: "amount";
          type: "u64";
          index: false;
        },
        {
          name: "value";
          type: "u64";
          index: false;
        },
        {
          name: "buyer";
          type: "publicKey";
          index: false;
        },
        {
          name: "seller";
          type: "publicKey";
          index: false;
        },
      ];
    },
    {
      name: "ClosedOfferEvent";
      fields: [
        {
          name: "orderId";
          type: "u64";
          index: false;
        },
        {
          name: "refund";
          type: "u64";
          index: false;
        },
      ];
    },
    {
      name: "CanceledOfferEvent";
      fields: [
        {
          name: "orderId";
          type: "u64";
          index: false;
        },
        {
          name: "refund";
          type: "u64";
          index: false;
        },
        {
          name: "refundFee";
          type: "u64";
          index: false;
        },
        {
          name: "from";
          type: "publicKey";
          index: false;
        },
      ];
    },
    {
      name: "SettleFilledEvent";
      fields: [
        {
          name: "tradeId";
          type: "u64";
          index: false;
        },
        {
          name: "from";
          type: "publicKey";
          index: false;
        },
      ];
    },
    {
      name: "SettleCanceledEvent";
      fields: [
        {
          name: "tradeId";
          type: "u64";
          index: false;
        },
        {
          name: "from";
          type: "publicKey";
          index: false;
        },
      ];
    },
    {
      name: "SettledOfferEvent";
      fields: [
        {
          name: "offer";
          type: "publicKey";
          index: false;
        },
        {
          name: "orderId";
          type: "u64";
          index: false;
        },
        {
          name: "config";
          type: "publicKey";
          index: false;
        },
        {
          name: "totalLiquidValue";
          type: "u64";
          index: false;
        },
        {
          name: "feeValue";
          type: "u64";
          index: false;
        },
      ];
    },
    {
      name: "CancelUnfilledOfferEvent";
      fields: [
        {
          name: "offer";
          type: "publicKey";
          index: false;
        },
        {
          name: "orderId";
          type: "u64";
          index: false;
        },
        {
          name: "config";
          type: "publicKey";
          index: false;
        },
        {
          name: "feeCancel";
          type: "u64";
          index: false;
        },
        {
          name: "refundValue";
          type: "u64";
          index: false;
        },
      ];
    },
    {
      name: "CancelFilledOfferEvent";
      fields: [
        {
          name: "offer";
          type: "publicKey";
          index: false;
        },
        {
          name: "orderId";
          type: "u64";
          index: false;
        },
        {
          name: "config";
          type: "publicKey";
          index: false;
        },
        {
          name: "feeCancel";
          type: "u64";
          index: false;
        },
        {
          name: "refundValue";
          type: "u64";
          index: false;
        },
      ];
    },
    {
      name: "CashoutEvent";
      fields: [
        {
          name: "cashoutId";
          type: "u64";
          index: false;
        },
        {
          name: "tradeId";
          type: "u64";
          index: false;
        },
        {
          name: "cashoutBy";
          type: "publicKey";
          index: false;
        },
        {
          name: "value";
          type: "u64";
          index: false;
        },
      ];
    },
  ];
  errors: [
    {
      code: 6000;
      name: "Initialized";
      msg: "Initialized";
    },
    {
      code: 6001;
      name: "Unauthorized";
      msg: "Unauthorized";
    },
    {
      code: 6002;
      name: "InvalidConfigAccount";
      msg: "Invalid Config Account";
    },
    {
      code: 6003;
      name: "InsufficientFunds";
      msg: "Insufficient Funds";
    },
    {
      code: 6004;
      name: "FeeRefundTooHigh";
      msg: "Fee Refund <= 10%";
    },
    {
      code: 6005;
      name: "FeeSettleTooHigh";
      msg: "Settle Fee <= 10%";
    },
    {
      code: 6006;
      name: "MintIsNotOwnedByTokenProgram";
      msg: "Mint is not owned by token program";
    },
    {
      code: 6007;
      name: "EXTokenNotAccepted";
      msg: "Exchange Token Not Accepted";
    },
    {
      code: 6008;
      name: "PriceInvalid";
      msg: "Price Invalid";
    },
    {
      code: 6009;
      name: "OfferStatusInvalid";
      msg: "Offer Status Invalid";
    },
    {
      code: 6010;
      name: "InvalidAmount";
      msg: "Invalid Amount";
    },
    {
      code: 6011;
      name: "EXTokenMismatch";
      msg: "Invalid Offer Token";
    },
    {
      code: 6012;
      name: "ConfigMismatch";
      msg: "Config Mismatch";
    },
    {
      code: 6013;
      name: "FeeWalletMismatch";
      msg: "Fee Wallet Mismatch";
    },
    {
      code: 6014;
      name: "InvalidRole";
      msg: "Invalid Role";
    },
    {
      code: 6015;
      name: "InvalidToken";
      msg: "Invalid Token";
    },
    {
      code: 6016;
      name: "InvalidOfferToken";
      msg: "Invalid Offer Token";
    },
    {
      code: 6017;
      name: "InvalidOfferStatus";
      msg: "Invalid Offer Status";
    },
    {
      code: 6018;
      name: "InvalidTokenStatus";
      msg: "Invalid Token Status";
    },
    {
      code: 6019;
      name: "FullMatchRequired";
      msg: "FullMatch Required";
    },
    {
      code: 6020;
      name: "InsufficientAllocations";
      msg: "Insufficient Allocations";
    },
    {
      code: 6021;
      name: "OfferOwnerOnly";
      msg: "Offer Owner Only";
    },
    {
      code: 6022;
      name: "SellerOnly";
      msg: "Seller Only";
    },
    {
      code: 6023;
      name: "InvalidFeeWallet";
      msg: "Invalid Fee Wallet";
    },
    {
      code: 6024;
      name: "InvalidBuyer";
      msg: "Invalid Buyer";
    },
    {
      code: 6025;
      name: "InvalidSeller";
      msg: "Invalid Seller";
    },
    {
      code: 6026;
      name: "InvalidBuyerOrSeller";
      msg: "Invalid Buyer or Seller";
    },
    {
      code: 6027;
      name: "TokenNotSet";
      msg: "Token Not Set";
    },
    {
      code: 6028;
      name: "InvalidOrderStatus";
      msg: "Invalid Order Status";
    },
    {
      code: 6029;
      name: "Settled";
      msg: "Settled";
    },
    {
      code: 6030;
      name: "OnlyForSettled";
      msg: "Only For Settled";
    },
    {
      code: 6031;
      name: "InvalidSettleTime";
      msg: "Invalid Settle Time";
    },
    {
      code: 6032;
      name: "OnlySettledCanCancel";
      msg: "Only Settled Can Cancel";
    },
    {
      code: 6033;
      name: "InvalidOffer";
      msg: "Invalid Offer";
    },
    {
      code: 6034;
      name: "InvalidMatchingPrice";
      msg: "Invalid Matching Price";
    },
    {
      code: 6035;
      name: "InvalidOrderId";
      msg: "Invalid Order ID";
    },
    {
      code: 6036;
      name: "InvalidShareId";
      msg: "Invalid Share ID";
    },
    {
      code: 6037;
      name: "InvalidPDASigner";
      msg: "Invalid PDA signer";
    },
    {
      code: 6038;
      name: "NumericalOverflow";
      msg: "Numerical Overflow";
    },
    {
      code: 6039;
      name: "SigVerificationFailed";
      msg: "Signature Verification Failed";
    },
  ];
};

export const IDL: Otc = {
  version: "0.1.0",
  name: "otc",
  constants: [
    {
      name: "CONFIG_PDA_SEED",
      type: "bytes",
      value: "[99, 111, 110, 102, 105, 103]",
    },
    {
      name: "ROLE_PDA_SEED",
      type: "bytes",
      value: "[114, 111, 108, 101]",
    },
    {
      name: "USER_PDA_SEED",
      type: "bytes",
      value: "[117, 115, 101, 114]",
    },
    {
      name: "OTC_TOKEN_PDA_SEED",
      type: "bytes",
      value: "[111, 116, 99, 95, 116, 111, 107, 101, 110]",
    },
    {
      name: "ORDER_PDA_SEED",
      type: "bytes",
      value: "[111, 114, 100, 101, 114]",
    },
    {
      name: "TRADE_PDA_SEED",
      type: "bytes",
      value: "[116, 114, 97, 100, 101]",
    },
    {
      name: "CASHOUT_PDA_SEED",
      type: "bytes",
      value: "[99, 97, 115, 104, 111, 117, 116]",
    },
    {
      name: "EX_TOKEN_PDA_SEED",
      type: "bytes",
      value: "[101, 120, 95, 116, 111, 107, 101, 110]",
    },
    {
      name: "VAULT_TOKEN_PDA_SEED",
      type: "bytes",
      value: "[118, 97, 117, 108, 116, 95, 116, 111, 107, 101, 110]",
    },
    {
      name: "VAULT_OTC_TOKEN_PDA_SEED",
      type: "bytes",
      value:
        "[118, 97, 117, 108, 116, 95, 111, 116, 99, 95, 116, 111, 107, 101, 110]",
    },
    {
      name: "WEI6",
      type: "u64",
      value: "1_000_000",
    },
    {
      name: "BUYER",
      type: "u8",
      value: "2",
    },
    {
      name: "SELLER",
      type: "u8",
      value: "3",
    },
  ],
  instructions: [
    {
      name: "initializeConfig",
      accounts: [
        {
          name: "configAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeWallet",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "updateConfig",
      accounts: [
        {
          name: "configAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "feeRefund",
          type: {
            option: "u64",
          },
        },
        {
          name: "feeSettle",
          type: {
            option: "u64",
          },
        },
        {
          name: "feeWallet",
          type: {
            option: "publicKey",
          },
        },
      ],
    },
    {
      name: "setRole",
      accounts: [
        {
          name: "configAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "roleAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "role",
          type: {
            defined: "Role",
          },
        },
      ],
    },
    {
      name: "addOtcToken",
      accounts: [
        {
          name: "otcTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "configAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "roleAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "operator",
          isMut: true,
          isSigner: true,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "tokenId",
          type: "u64",
        },
        {
          name: "pledgeRate",
          type: "u64",
        },
      ],
    },
    {
      name: "settleOtcToken",
      accounts: [
        {
          name: "vaultOtcTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "otcTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeOtcTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "configAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "roleAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "operator",
          isMut: true,
          isSigner: true,
        },
        {
          name: "feeWallet",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "tokenId",
          type: "u64",
        },
        {
          name: "settleDuration",
          type: "i64",
        },
        {
          name: "settleRate",
          type: "u64",
        },
      ],
    },
    {
      name: "setExToken",
      accounts: [
        {
          name: "vaultTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "exTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeExTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "configAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "roleAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "operator",
          isMut: true,
          isSigner: true,
        },
        {
          name: "feeWallet",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "isAccepted",
          type: "bool",
        },
      ],
    },
    {
      name: "createOrder",
      accounts: [
        {
          name: "otcTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "orderAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "configAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "exTokenAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "exToken",
          isMut: false,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "orderId",
          type: "u64",
        },
        {
          name: "orderType",
          type: {
            defined: "OrderType",
          },
        },
        {
          name: "tokenId",
          type: "u64",
        },
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "value",
          type: "u64",
        },
        {
          name: "slippage",
          type: "u64",
        },
        {
          name: "isBid",
          type: "bool",
        },
      ],
    },
    {
      name: "fillOrder",
      accounts: [
        {
          name: "tradeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "orderAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "configAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "exTokenAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "exToken",
          isMut: false,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "orderId",
          type: "u64",
        },
        {
          name: "tradeId",
          type: "u64",
        },
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "cashoutTrade",
      accounts: [
        {
          name: "cashoutOrderAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tradeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "configAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "cashoutId",
          type: "u64",
        },
        {
          name: "tradeId",
          type: "u64",
        },
        {
          name: "value",
          type: "u64",
        },
      ],
    },
    {
      name: "matchOrder",
      accounts: [
        {
          name: "tradeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "orderBuyAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "orderSellAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "configAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "orderBuyId",
          type: "u64",
        },
        {
          name: "orderSellId",
          type: "u64",
        },
        {
          name: "tradeId",
          type: "u64",
        },
      ],
    },
    {
      name: "cancelOrder",
      accounts: [
        {
          name: "orderAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "configAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "exTokenAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "exToken",
          isMut: false,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "feeWallet",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "orderId",
          type: "u64",
        },
      ],
    },
    {
      name: "buyerSettleFilled",
      accounts: [
        {
          name: "tradeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "orderAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "otcTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "exTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultOtcTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "configAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "buyerExTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sellerExTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "buyerOtcTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeOtcTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeExTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "otcToken",
          isMut: false,
          isSigner: false,
        },
        {
          name: "exToken",
          isMut: false,
          isSigner: false,
        },
        {
          name: "buyer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "exTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "otcTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "orderId",
          type: "u64",
        },
        {
          name: "tradeId",
          type: "u64",
        },
      ],
    },
    {
      name: "sellerSettleFilled",
      accounts: [
        {
          name: "tradeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "orderAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "otcTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "exTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultOtcTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "configAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sellerExTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "buyerOtcTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sellerOtcTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeOtcTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeExTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "otcToken",
          isMut: false,
          isSigner: false,
        },
        {
          name: "exToken",
          isMut: false,
          isSigner: false,
        },
        {
          name: "seller",
          isMut: true,
          isSigner: true,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "exTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "otcTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "orderId",
          type: "u64",
        },
        {
          name: "tradeId",
          type: "u64",
        },
      ],
    },
    {
      name: "buyerSettleCanceled",
      accounts: [
        {
          name: "tradeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "orderAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "otcTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "exTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "configAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "buyerExTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeExTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "exToken",
          isMut: false,
          isSigner: false,
        },
        {
          name: "otcToken",
          isMut: false,
          isSigner: false,
        },
        {
          name: "buyer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "exTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "otcTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "orderId",
          type: "u64",
        },
        {
          name: "tradeId",
          type: "u64",
        },
      ],
    },
    {
      name: "sellerSettleCanceled",
      accounts: [
        {
          name: "tradeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "orderAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "otcTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "exTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultOtcTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "configAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sellerOtcTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sellerExTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeExTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "exToken",
          isMut: false,
          isSigner: false,
        },
        {
          name: "otcToken",
          isMut: false,
          isSigner: false,
        },
        {
          name: "seller",
          isMut: true,
          isSigner: true,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "exTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "otcTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "orderId",
          type: "u64",
        },
        {
          name: "tradeId",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "cashoutAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "tradeId",
            type: "u64",
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "value",
            type: "u64",
          },
          {
            name: "cashoutBy",
            type: "publicKey",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "configAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "feeRefund",
            type: "u64",
          },
          {
            name: "feeSettle",
            type: "u64",
          },
          {
            name: "feeWallet",
            type: "publicKey",
          },
          {
            name: "lastOrderId",
            type: "u64",
          },
          {
            name: "lastTradeId",
            type: "u64",
          },
          {
            name: "lastCashoutId",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "exTokenAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "token",
            type: "publicKey",
          },
          {
            name: "vaultToken",
            type: "publicKey",
          },
          {
            name: "isAccepted",
            type: "bool",
          },
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "vaultBump",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "orderAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "tokenId",
            type: "u64",
          },
          {
            name: "exToken",
            type: "publicKey",
          },
          {
            name: "orderType",
            type: {
              defined: "OrderType",
            },
          },
          {
            name: "isBid",
            type: "bool",
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "value",
            type: "u64",
          },
          {
            name: "slippage",
            type: "u64",
          },
          {
            name: "collateral",
            type: "u64",
          },
          {
            name: "filledAmount",
            type: "u64",
          },
          {
            name: "status",
            type: {
              defined: "OfferStatus",
            },
          },
          {
            name: "orderBy",
            type: "publicKey",
          },
          {
            name: "createdAt",
            type: "i64",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "otcTokenAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "token",
            type: "publicKey",
          },
          {
            name: "settleDuration",
            type: "i64",
          },
          {
            name: "settleTime",
            type: "i64",
          },
          {
            name: "settleRate",
            type: "u64",
          },
          {
            name: "pledgeRate",
            type: "u64",
          },
          {
            name: "status",
            type: {
              defined: "OtcTokenStatus",
            },
          },
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "vaultBump",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "roleAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user",
            type: "publicKey",
          },
          {
            name: "role",
            type: {
              defined: "Role",
            },
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "tradeAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "orderId",
            type: "u64",
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "value",
            type: "u64",
          },
          {
            name: "status",
            type: {
              defined: "OrderStatus",
            },
          },
          {
            name: "sellerValue",
            type: "u64",
          },
          {
            name: "buyerValue",
            type: "u64",
          },
          {
            name: "settled",
            type: "u8",
          },
          {
            name: "buyerCashouted",
            type: "u64",
          },
          {
            name: "sellerCashouted",
            type: "u64",
          },
          {
            name: "seller",
            type: "publicKey",
          },
          {
            name: "buyer",
            type: "publicKey",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "userAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "feeRefund",
            type: "u64",
          },
          {
            name: "feeSettle",
            type: "u64",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "OrderType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Buy",
          },
          {
            name: "Sell",
          },
        ],
      },
    },
    {
      name: "OfferStatus",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Open",
          },
          {
            name: "Filled",
          },
          {
            name: "Canceled",
          },
        ],
      },
    },
    {
      name: "OtcTokenStatus",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Active",
          },
          {
            name: "Inactive",
          },
          {
            name: "Settle",
          },
        ],
      },
    },
    {
      name: "Role",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Operator",
          },
          {
            name: "Admin",
          },
        ],
      },
    },
    {
      name: "OrderStatus",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Open",
          },
          {
            name: "SettleFilled",
          },
          {
            name: "SettleCanceled",
          },
          {
            name: "Canceled",
          },
        ],
      },
    },
  ],
  events: [
    {
      name: "InitializedEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "feeWallet",
          type: "publicKey",
          index: false,
        },
        {
          name: "feeRefund",
          type: "u64",
          index: false,
        },
        {
          name: "feeSettle",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "SetRoleEvent",
      fields: [
        {
          name: "configAccount",
          type: "publicKey",
          index: false,
        },
        {
          name: "user",
          type: "publicKey",
          index: false,
        },
        {
          name: "role",
          type: {
            defined: "Role",
          },
          index: false,
        },
      ],
    },
    {
      name: "NewTokenEvent",
      fields: [
        {
          name: "tokenId",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "SettledTokenEvent",
      fields: [
        {
          name: "tokenId",
          type: "u64",
          index: false,
        },
        {
          name: "token",
          type: "publicKey",
          index: false,
        },
        {
          name: "settleRate",
          type: "u64",
          index: false,
        },
        {
          name: "settleTime",
          type: "i64",
          index: false,
        },
      ],
    },
    {
      name: "SetExTokenEvent",
      fields: [
        {
          name: "exToken",
          type: "publicKey",
          index: false,
        },
        {
          name: "config",
          type: "publicKey",
          index: false,
        },
        {
          name: "isAccepted",
          type: "bool",
          index: false,
        },
      ],
    },
    {
      name: "NewOrderEvent",
      fields: [
        {
          name: "orderId",
          type: "u64",
          index: false,
        },
        {
          name: "orderType",
          type: {
            defined: "OrderType",
          },
          index: false,
        },
        {
          name: "tokenId",
          type: "u64",
          index: false,
        },
        {
          name: "exToken",
          type: "publicKey",
          index: false,
        },
        {
          name: "amount",
          type: "u64",
          index: false,
        },
        {
          name: "value",
          type: "u64",
          index: false,
        },
        {
          name: "collateral",
          type: "u64",
          index: false,
        },
        {
          name: "slippage",
          type: "u64",
          index: false,
        },
        {
          name: "orderBy",
          type: "publicKey",
          index: false,
        },
        {
          name: "isBid",
          type: "bool",
          index: false,
        },
      ],
    },
    {
      name: "NewTradeEvent",
      fields: [
        {
          name: "orderId",
          type: "u64",
          index: false,
        },
        {
          name: "tradeId",
          type: "u64",
          index: false,
        },
        {
          name: "amount",
          type: "u64",
          index: false,
        },
        {
          name: "value",
          type: "u64",
          index: false,
        },
        {
          name: "buyer",
          type: "publicKey",
          index: false,
        },
        {
          name: "seller",
          type: "publicKey",
          index: false,
        },
      ],
    },
    {
      name: "ClosedOfferEvent",
      fields: [
        {
          name: "orderId",
          type: "u64",
          index: false,
        },
        {
          name: "refund",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "CanceledOfferEvent",
      fields: [
        {
          name: "orderId",
          type: "u64",
          index: false,
        },
        {
          name: "refund",
          type: "u64",
          index: false,
        },
        {
          name: "refundFee",
          type: "u64",
          index: false,
        },
        {
          name: "from",
          type: "publicKey",
          index: false,
        },
      ],
    },
    {
      name: "SettleFilledEvent",
      fields: [
        {
          name: "tradeId",
          type: "u64",
          index: false,
        },
        {
          name: "from",
          type: "publicKey",
          index: false,
        },
      ],
    },
    {
      name: "SettleCanceledEvent",
      fields: [
        {
          name: "tradeId",
          type: "u64",
          index: false,
        },
        {
          name: "from",
          type: "publicKey",
          index: false,
        },
      ],
    },
    {
      name: "SettledOfferEvent",
      fields: [
        {
          name: "offer",
          type: "publicKey",
          index: false,
        },
        {
          name: "orderId",
          type: "u64",
          index: false,
        },
        {
          name: "config",
          type: "publicKey",
          index: false,
        },
        {
          name: "totalLiquidValue",
          type: "u64",
          index: false,
        },
        {
          name: "feeValue",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "CancelUnfilledOfferEvent",
      fields: [
        {
          name: "offer",
          type: "publicKey",
          index: false,
        },
        {
          name: "orderId",
          type: "u64",
          index: false,
        },
        {
          name: "config",
          type: "publicKey",
          index: false,
        },
        {
          name: "feeCancel",
          type: "u64",
          index: false,
        },
        {
          name: "refundValue",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "CancelFilledOfferEvent",
      fields: [
        {
          name: "offer",
          type: "publicKey",
          index: false,
        },
        {
          name: "orderId",
          type: "u64",
          index: false,
        },
        {
          name: "config",
          type: "publicKey",
          index: false,
        },
        {
          name: "feeCancel",
          type: "u64",
          index: false,
        },
        {
          name: "refundValue",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "CashoutEvent",
      fields: [
        {
          name: "cashoutId",
          type: "u64",
          index: false,
        },
        {
          name: "tradeId",
          type: "u64",
          index: false,
        },
        {
          name: "cashoutBy",
          type: "publicKey",
          index: false,
        },
        {
          name: "value",
          type: "u64",
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "Initialized",
      msg: "Initialized",
    },
    {
      code: 6001,
      name: "Unauthorized",
      msg: "Unauthorized",
    },
    {
      code: 6002,
      name: "InvalidConfigAccount",
      msg: "Invalid Config Account",
    },
    {
      code: 6003,
      name: "InsufficientFunds",
      msg: "Insufficient Funds",
    },
    {
      code: 6004,
      name: "FeeRefundTooHigh",
      msg: "Fee Refund <= 10%",
    },
    {
      code: 6005,
      name: "FeeSettleTooHigh",
      msg: "Settle Fee <= 10%",
    },
    {
      code: 6006,
      name: "MintIsNotOwnedByTokenProgram",
      msg: "Mint is not owned by token program",
    },
    {
      code: 6007,
      name: "EXTokenNotAccepted",
      msg: "Exchange Token Not Accepted",
    },
    {
      code: 6008,
      name: "PriceInvalid",
      msg: "Price Invalid",
    },
    {
      code: 6009,
      name: "OfferStatusInvalid",
      msg: "Offer Status Invalid",
    },
    {
      code: 6010,
      name: "InvalidAmount",
      msg: "Invalid Amount",
    },
    {
      code: 6011,
      name: "EXTokenMismatch",
      msg: "Invalid Offer Token",
    },
    {
      code: 6012,
      name: "ConfigMismatch",
      msg: "Config Mismatch",
    },
    {
      code: 6013,
      name: "FeeWalletMismatch",
      msg: "Fee Wallet Mismatch",
    },
    {
      code: 6014,
      name: "InvalidRole",
      msg: "Invalid Role",
    },
    {
      code: 6015,
      name: "InvalidToken",
      msg: "Invalid Token",
    },
    {
      code: 6016,
      name: "InvalidOfferToken",
      msg: "Invalid Offer Token",
    },
    {
      code: 6017,
      name: "InvalidOfferStatus",
      msg: "Invalid Offer Status",
    },
    {
      code: 6018,
      name: "InvalidTokenStatus",
      msg: "Invalid Token Status",
    },
    {
      code: 6019,
      name: "FullMatchRequired",
      msg: "FullMatch Required",
    },
    {
      code: 6020,
      name: "InsufficientAllocations",
      msg: "Insufficient Allocations",
    },
    {
      code: 6021,
      name: "OfferOwnerOnly",
      msg: "Offer Owner Only",
    },
    {
      code: 6022,
      name: "SellerOnly",
      msg: "Seller Only",
    },
    {
      code: 6023,
      name: "InvalidFeeWallet",
      msg: "Invalid Fee Wallet",
    },
    {
      code: 6024,
      name: "InvalidBuyer",
      msg: "Invalid Buyer",
    },
    {
      code: 6025,
      name: "InvalidSeller",
      msg: "Invalid Seller",
    },
    {
      code: 6026,
      name: "InvalidBuyerOrSeller",
      msg: "Invalid Buyer or Seller",
    },
    {
      code: 6027,
      name: "TokenNotSet",
      msg: "Token Not Set",
    },
    {
      code: 6028,
      name: "InvalidOrderStatus",
      msg: "Invalid Order Status",
    },
    {
      code: 6029,
      name: "Settled",
      msg: "Settled",
    },
    {
      code: 6030,
      name: "OnlyForSettled",
      msg: "Only For Settled",
    },
    {
      code: 6031,
      name: "InvalidSettleTime",
      msg: "Invalid Settle Time",
    },
    {
      code: 6032,
      name: "OnlySettledCanCancel",
      msg: "Only Settled Can Cancel",
    },
    {
      code: 6033,
      name: "InvalidOffer",
      msg: "Invalid Offer",
    },
    {
      code: 6034,
      name: "InvalidMatchingPrice",
      msg: "Invalid Matching Price",
    },
    {
      code: 6035,
      name: "InvalidOrderId",
      msg: "Invalid Order ID",
    },
    {
      code: 6036,
      name: "InvalidShareId",
      msg: "Invalid Share ID",
    },
    {
      code: 6037,
      name: "InvalidPDASigner",
      msg: "Invalid PDA signer",
    },
    {
      code: 6038,
      name: "NumericalOverflow",
      msg: "Numerical Overflow",
    },
    {
      code: 6039,
      name: "SigVerificationFailed",
      msg: "Signature Verification Failed",
    },
  ],
};
