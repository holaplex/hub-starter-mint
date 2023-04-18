import { createContext, useEffect, useState } from "react";
import { User } from "@/graphql.types";
import { GetMe } from "@/queries/me.graphql";
import { useLazyQuery } from "@apollo/client";

interface MeContext {
  me: User | undefined;
}

interface GetMeData {
  me: User;
}

export const MeContext = createContext<MeContext>({ me: undefined });

export default function MeProvider({
  hydrate,
  children,
}: {
  hydrate: User | undefined;
  children: React.ReactNode;
}) {
  const [me, setMe] = useState(hydrate);
  const [isPolling, setIsPolling] = useState(false);
  const [_, { data, stopPolling, startPolling }] =
    useLazyQuery<GetMeData>(GetMe);

  useEffect(() => {
    if (data?.me?.wallet && isPolling) {
      setMe(data.me);
      stopPolling();
      return;
    }

    if (!me || me?.wallet || isPolling) {
      return;
    }

    startPolling(250);
    setIsPolling(true);
  }, [me, startPolling, isPolling, stopPolling, data]);

  return <MeContext.Provider value={{ me }}>{children}</MeContext.Provider>;
}
