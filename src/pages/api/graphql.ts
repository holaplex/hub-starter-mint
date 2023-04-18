import { ApolloServer } from "@apollo/server";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { readFileSync } from "fs";
import db from "@/modules/db";
import {
  MintDropInput,
  MintEditionPayload,
  MutationResolvers,
  QueryResolvers,
  Project,
  CollectionMint,
  Drop,
  User,
  AssetType,
} from "@/graphql.types";
import { Session } from "next-auth";
import { MintNft } from "@/mutations/drop.graphql";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { GetProjectDrops, GetProjectDrop } from "@/queries/project.graphql";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import UserSource from "@/modules/user";
import holaplex from "@/modules/holaplex";

export interface AppContext {
  session: Session | null;
  dataSources: {
    db: PrismaClient;
    holaplex: ApolloClient<NormalizedCacheObject>;
    user: UserSource;
  };
}

interface GetDropsData {
  project: Pick<Project, "drops">;
}

interface GetDropsVars {
  project: string;
}

interface GetDropData {
  project: Pick<Project, "drop">;
}

interface GetDropVars {
  project: string;
  drop: string;
}

export const queryResolvers: QueryResolvers<AppContext> = {
  async drops(_a, _b, { dataSources: { holaplex } }) {
    const { data } = await holaplex.query<GetDropsData, GetDropsVars>({
      fetchPolicy: 'network-only',
      query: GetProjectDrops,
      variables: { project: process.env.HOLAPLEX_PROJECT_ID as string },
    });

    return data.project.drops as Drop[];
  },
  async drop(_a, { id }, { dataSources: { holaplex } }) {
    const { data } = await holaplex.query<GetDropData, GetDropVars>({
      fetchPolicy: 'network-only',
      query: GetProjectDrop,
      variables: {
        project: process.env.HOLAPLEX_PROJECT_ID as string,
        drop: id,
      },
    });

    return data.project.drop as Drop;
  },
  async me(_a, _b, { session, dataSources: { user } }) {
    if (!session) {
      return null;
    }

    const me = await user.get(session.user?.email);

    if (me) {
      return me;
    }

    return null;
  },
};

interface MintNftData {
  mintEdition: MintEditionPayload;
}

interface MintNftVars {
  input: MintDropInput;
}

const mutationResolvers: MutationResolvers<AppContext> = {
  async mint(_, { drop }, { session, dataSources: { db, holaplex } }) {
    if (!session) {
      return null;
    }

    const wallet = await db.wallet.findFirst({
      where: {
        user: {
          email: session?.user?.email,
        },
      },
    });

    const { data } = await holaplex.mutate<MintNftData, MintNftVars>({
      mutation: MintNft,
      variables: { input: { drop, recipient: wallet?.address as string } },
    });

    return data?.mintEdition.collectionMint as CollectionMint;
  },
};

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

const server = new ApolloServer<AppContext>({
  resolvers: {
    Query: queryResolvers,
    Mutation: mutationResolvers,
  },
  typeDefs,
});

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    return {
      session,
      dataSources: {
        db,
        holaplex,
        user: new UserSource(holaplex, db),
      },
    };
  },
});
