import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import prisma from "@/modules/db";
import { waitUntil } from "async-wait-until";

import {
  CreateCustomer,
  CreateCustomerWallet,
} from "@/mutations/customer.graphql";
import {
  CreateCustomerInput,
  CreateCustomerPayload,
  CreateCustomerWalletPayload,
  CreateCustomerWalletInput,
  AssetType,
  Project,
} from "@/graphql.types";
import db from "@/modules/db";
import holaplex from "@/modules/holaplex";
import { GetCustomerTreasury } from "@/queries/customer.graphql";

interface GetCustomerTreasuryData {
  project: Pick<Project, "customer">;
}

interface GetCustomerTreasuryVars {
  project: string;
  customer: string;
}

interface CreateCustomerData {
  createCustomer: CreateCustomerPayload;
}

interface CreateCustomerVars {
  input: CreateCustomerInput;
}

interface CreateCustomerWalletData {
  createCustomerWallet: CreateCustomerWalletPayload;
}

interface CreateCustomerWalletVars {
  input: CreateCustomerWalletInput;
}

function customerTreasuryReady(customer: string) {
  return async function checkCustomerTreasuryReady() {
    console.log("waiting for treasurty to be ready", customer);
    const { data } = await holaplex.query<
      GetCustomerTreasuryData,
      GetCustomerTreasuryVars
    >({
      fetchPolicy: "network-only",
      query: GetCustomerTreasury,
      variables: {
        project: process.env.HOLAPLEX_PROJECT_ID as string,
        customer,
      },
    });

    console.log(customer, data);

    return data.project.customer?.treasury?.id;
  };
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  events: {
    async createUser({ user }) {
      const createCustomerResponse = await holaplex.mutate<
        CreateCustomerData,
        CreateCustomerVars
      >({
        mutation: CreateCustomer,
        variables: {
          input: {
            project: process.env.HOLAPLEX_PROJECT_ID,
          },
        },
      });

      const customer = createCustomerResponse.data?.createCustomer.customer;

      const me = await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          holaplexCustomerId: customer?.id,
        },
      });

      await waitUntil(customerTreasuryReady(customer?.id as string), {
        intervalBetweenAttempts: 100,
      });

      const createCustomerWalletResponse = await holaplex.mutate<
        CreateCustomerWalletData,
        CreateCustomerWalletVars
      >({
        mutation: CreateCustomerWallet,
        variables: {
          input: {
            customer: me.holaplexCustomerId,
            assetType: process.env.HOLAPLEX_WALLET_ASSET_TYPE as AssetType,
          },
        },
      });

      const wallet =
        createCustomerWalletResponse.data?.createCustomerWallet.wallet;

      await db.wallet.create({
        data: {
          holaplexCustomerId: me.holaplexCustomerId as string,
          address: wallet?.address as string,
        },
      });
    },
  },
};

export default NextAuth(authOptions);
