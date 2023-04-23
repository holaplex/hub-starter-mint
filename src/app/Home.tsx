"use client";
import Image from "next/image";
import { useMemo } from "react";
import { Holder } from "@/graphql.types";
import { shorten } from "../modules/wallet";
import { MintDrop } from "@/mutations/mint.graphql";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { GetDrop } from "@/queries/drop.graphql";
import BounceLoader from "react-spinners/BounceLoader";
import Link from "next/link";
import clsx from "clsx";
import { drop, isNil, not, pipe } from "ramda";
import useMe from "@/hooks/useMe";
import { Session } from "next-auth";
import { CheckIcon } from "@heroicons/react/24/solid";

interface MintData {
  mint: string;
}

interface HomeProps {
  session?: Session | null;
}

export default function Home({ session }: HomeProps) {
  const me = useMe();
  const dropQuery = useQuery(GetDrop);
  const collection = dropQuery.data?.drop.collection;
  const metadataJson = collection?.metadataJson;
  const holder = useMemo(() => {
    return collection?.holders?.find(
      (holder: Holder) => holder.address === me?.wallet?.address
    );
  }, [collection?.holders, me?.wallet]);
  const owns = pipe(isNil, not)(holder);
  const [mint, { loading }] = useMutation<MintData>(MintDrop, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetDrop,
      },
    ],
  });

  const onMint = () => {
    mint();
  };

  return (
    <>
      <div className="flex w-full justify-between items-center py-4">
        <Image src="/img/logo.png" alt="site logo" width={199} height={18} />
        {!me ? (
          <>
            <div className="flex gap-1 md:gap-4 items-center">
              <Link
                href="/login"
                className="text-cta font-medium md:font-bold md:border-2 md:rounded-full md:border-cta md:py-3 md:px-6"
              >
                Log in
              </Link>
              <span className="text-gray-300 font-medium md:hidden">or</span>
              <Link
                href="/login"
                className="text-cta font-medium md:text-backdrop md:bg-cta md:rounded-full md:font-bold md:py-3 md:px-6"
              >
                Sign up
              </Link>
            </div>
          </>
        ) : (
          <button className="text-cta font-bold border-2 rounded-full border-cta py-3 px-6 flex gap-2">
            <img className="w-6 h-6 rounded-full" src={me?.image as string} />
            <span>{me?.name}</span>
          </button>
        )}
      </div>
      <div className="w-full grid grid-cols-12  md:gap-4 lg:gap-12 mt-4 md:mt-10 lg:mt-16">
        <div className="col-span-12 md:col-span-6">
          {dropQuery.loading ? (
            <div className="w-full aspect-square rounded-lg bg-contrast animate-pulse" />
          ) : (
            <div className="relative w-full aspect-square rounded-log overflow-hidden flex justify-center items-center">
              <BounceLoader
                className={clsx(
                  "z-10 transition",
                  loading ? "opacity-100" : "opacity-0"
                )}
                color="#fff"
                size={80}
              />
              <img
                src={metadataJson?.image as string}
                alt={metadataJson?.name as string}
                className="absolute top-0 left-0 right-0 bottom-0 object-cover"
              />
            </div>
          )}
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="flex flex-col items-center md:items-start md:justify-center">
            <span className="text-2xl font-extrabold md:text-xl lg:text-3xl md:font-semibold">
              {dropQuery.loading ? (
                <div className="rounded-full bg-contrast w-60 h-6 animate-pulse" />
              ) : (
                metadataJson?.name
              )}
            </span>
            {dropQuery.loading ? (
              <div className="flex flex-col gap-2 w-full mt-6 md:mt-3">
                <div className="rounded-full bg-contrast w-full h-4 animate-pulse" />
                <div className="rounded-full bg-contrast w-full h-4 animate-pulse" />
                <div className="rounded-full bg-contrast w-28 h-4 animate-pulse" />
              </div>
            ) : (
              <span className="text-base font-medium text-gray-300 mt-6 md:mt-3 text-center md:text-left">
                {metadataJson?.description}
              </span>
            )}
          </div>
          <div className="bg-contrast rounded-lg p-6 flex justify-between mt-8 items-center mb-6">
            {dropQuery.loading ? (
              <>
                <div className="flex flex-row gap-2 items-center">
                  <div className="bg-backdrop w-14 aspect-square rounded-full animate-pulse" />
                  <div className="flex flex-col gap-1 justify-between">
                    <div className="h-4 w-24 rounded-full bg-backdrop animate-pulse" />
                    <div className="h-6 w-16 rounded-full bg-backdrop animate-pulse" />
                  </div>
                </div>
                <div className="font-bold rounded-full bg-cta text-contrast w-32 h-12 transition animate-pulse" />
              </>
            ) : session ? (
              <>
                <div className="flex flex-row items-center gap-2">
                  <img
                    className="w-14 h-14 rounded-full"
                    src={session?.user?.image as string}
                  />

                  <div className="flex flex-col gap-1 justify-between">
                    <span className="text-gray-300 text-xs">
                      Wallet connected
                    </span>
                    <span>{shorten(me?.wallet?.address as string)}</span>
                  </div>
                </div>
                {owns ? (
                  <CheckIcon width={40} />
                ) : (
                  <button
                    className="font-bold rounded-full bg-cta text-contrast py-3 px-6 transition hover:opacity-80"
                    onClick={onMint}
                    disabled={loading}
                  >
                    Claim now
                  </button>
                )}
              </>
            ) : (
              <>
                <span className="text-xs md:text-base text-gray-300">
                  Sign up to claim your NFT
                </span>
                <Link
                  href="/login"
                  className="font-bold rounded-full bg-cta text-contrast py-3 px-6 transition hover:opacity-80"
                >
                  Claim now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
