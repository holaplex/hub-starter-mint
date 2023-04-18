"use client";

import { Collection, Drop as DropType } from "@/graphql.types";
import { CheckIcon } from "@heroicons/react/24/outline";
import { ForgeKey } from "@/mutations/key.graphql";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { GetDrop } from "@/queries/drop.graphql";
import BounceLoader from "react-spinners/BounceLoader";
import clsx from "clsx";
import { isNil, not, pipe } from "ramda";
import useMe from "@/hooks/useMe";
import { useRouter, usePathname } from "next/navigation";

interface ForgeKeyData {
  forgeKey: string;
}

interface ForgeKeyVars {
  drop: string;
}

interface GetDropsData {
  drop: DropType;
}

interface GetDropVars {
  drop: string;
}
export default function Drop({ drop }: { drop: string }) {
  const me = useMe();
  const client = useApolloClient();
  const router = useRouter();
  const pathname = usePathname();
  const dropQuery = useQuery<GetDropsData, GetDropVars>(GetDrop, {
    variables: { drop },
  });
  const collection = dropQuery.data?.drop.collection;
  const holder = collection?.holders?.find(
    (holder) => holder.address === me?.wallet?.address
  );
  const owns = pipe(isNil, not)(holder);
  const [forgeKey, { loading }] = useMutation<ForgeKeyData, ForgeKeyVars>(
    ForgeKey
  );

  const onForge = () => {
    forgeKey({
      variables: { drop },
      onCompleted: ({ forgeKey }) => {
        client.cache.updateQuery<GetDropsData, GetDropVars>(
          {
            query: GetDrop,
            variables: {
              drop,
            },
          },
          (data) => {
            const holders = data?.drop?.collection.holders || [];
            return {
              drop: {
                ...(data?.drop as DropType),
                collection: {
                  ...(data?.drop.collection as Collection),
                  totalMints: (data?.drop.collection.totalMints as number) + 1,
                  holders: [
                    ...holders,
                    {
                      __typename: "Holder",
                      address: me?.wallet?.address as string,
                      owns: 1,
                      collectionId: data?.drop.collection.id,
                      mints: [forgeKey],
                    },
                  ],
                },
              },
            };
          }
        );

        router.push("/keys");
      },
    });
  };

  return (
    <main className="m-auto w-full max-w-md flex flex-col items-center">
      {dropQuery.loading ? (
        <>
          <div className="h-8 w-60 bg-gray-800 animate-pulse mb-4 rounded-md" />
          <div className="w-full aspect-square bg-gray-800 animate-pulse rounded-lg" />
          <div className="w-full h-12 rounded-full bg-gray-800 animate-pulse mt-4" />
        </>
      ) : (
        <>
          <h1 className="text-2xl text-center font-bold mb-4">
            {collection?.metadataJson?.name}
          </h1>
          <div className="relative flex justify-center items-center w-full aspect-square rounded-lg overflow-hidden">
            {loading && (
              <BounceLoader
                className="text-white z-40"
                size={120}
                color="#fff"
              />
            )}
            <div className="absolute left-2 top-2 px-4 py-2 text-white bg-gray-900 bg-opacity-40 flex flex-row justify-center items-center rounded-full z-30">
              {collection?.totalMints} / {collection?.supply}
            </div>
            <div
              className={clsx(
                "bg-black absolute top-0 left-0 right-0 bottom-0 z-20",
                owns ? "bg-opacity-0" : "bg-opacity-50"
              )}
            />
            <img
              className="absolute top-0 bottom-0 left-0 right-0 z-10"
              src={collection?.metadataJson?.image}
              alt={`nft ${collection?.metadataJson?.name}`}
            />

            {owns && <CheckIcon className="w-1/3 z-30 text-white" />}
          </div>
          <button
            onClick={() => {
              if (me) {
                onForge();
              } else {
                router.push(`/login?return_to=${pathname}`);
              }
            }}
            disabled={owns || loading}
            className={clsx(
              "rounded-full w-full mt-4 px-6 py-3 bg-yellow-300 hover:bg-opacity-80 transition text-black",
              { "bg-opacity-80": owns }
            )}
          >
            Mint key
          </button>
        </>
      )}
    </main>
  );
}
