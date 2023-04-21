import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { PrismaClient } from "@prisma/client";
import { Project, AssetType, User } from "@/graphql.types";
import { GetCustomerWallet } from "@/queries/customer.graphql";

interface GetCustomerWalletData {
  project: Pick<Project, "customer">;
}

interface GetCustomerWalletVars {
  project: string;
  customer: string;
  assetType: AssetType;
}

export default class UserSource {
  private holaplex: ApolloClient<NormalizedCacheObject>;
  private db: PrismaClient;

  constructor(holaplex: ApolloClient<NormalizedCacheObject>, db: PrismaClient) {
    this.holaplex = holaplex;
    this.db = db;
  }

  async get(email: string | null | undefined): Promise<User | undefined> {
    if (!email) {
      return;
    }

    const user = await this.db.user.findFirst({
      where: { email },
    });

    const { data } = await this.holaplex.query<
      GetCustomerWalletData,
      GetCustomerWalletVars
    >({
      fetchPolicy: "network-only",
      query: GetCustomerWallet,
      variables: {
        project: process.env.HOLAPLEX_PROJECT_ID as string,
        customer: user?.holaplexCustomerId as string,
        assetType: process.env.HOLAPLEX_WALLET_ASSET_TYPE as AssetType,
      },
    });

    return {
      name: user?.name,
      email: user?.email,
      image: user?.image,
      wallet: data.project.customer?.treasury?.wallet,
    } as User;
  }
}
