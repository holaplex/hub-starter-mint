import { User } from "@/graphql.types";
import { MeContext } from "@/providers/MeProvider";
import { useContext } from "react";

export default function useMe(): User | undefined {
  const { me } = useContext(MeContext);

  return me;
}
