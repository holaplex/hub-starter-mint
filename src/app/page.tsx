import { Drop as DropType, Project } from "@/graphql.types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Home from "./Home";
import holaplex from "@/modules/holaplex";
import { GetProjectDrop } from "@/queries/project.graphql";

interface GetDropVars {
  project: string;
  drop: string;
}

interface GetDropData {
  project: Pick<Project, "drop">;
}

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const { data } = await holaplex.query<GetDropData, GetDropVars>({
    fetchPolicy: "network-only",
    query: GetProjectDrop,
    variables: {
      project: process.env.HOLAPLEX_PROJECT_ID as string,
      drop: process.env.HOLAPLEX_DROP_ID as string,
    },
  });
  return <Home session={session} drop={data?.project.drop} />;
}
