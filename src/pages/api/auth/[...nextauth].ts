import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import prisma from "@/modules/db";

import { CreateCustomer } from "@/mutations/customer.graphql";
import { CreateCustomerInput, CreateCustomerPayload } from "@/graphql.types";
import db from "@/modules/db";
import holaplex from "@/modules/holaplex";

interface CreateCustomerData {
  createCustomer: CreateCustomerPayload;
}

interface CreateCustomerVars {
  input: CreateCustomerInput;
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
      const { data } = await holaplex.mutate<
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

      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          holaplexCustomerId: data?.createCustomer.customer.id,
        },
      });
    },
  },
};

export default NextAuth(authOptions);
