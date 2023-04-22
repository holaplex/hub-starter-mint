import { createContext } from "react";
import { User } from "@/graphql.types";

interface MeContext {
  me: User | undefined;
}

export const MeContext = createContext<MeContext>({ me: undefined });

export default function MeProvider({
  me,
  children,
}: {
  me: User | undefined;
  children: React.ReactNode;
}) {
  return <MeContext.Provider value={{ me }}>{children}</MeContext.Provider>;
}
