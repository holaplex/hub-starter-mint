import { Drop as DropType, Project } from "@/graphql.types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Home from "./Home";

interface GetDropVars {
  project: string;
  drop: string;
}

interface GetDropData {
  project: Pick<Project, "drop">;
}

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return <Home session={session} />;
}
