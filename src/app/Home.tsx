"use client";
import Image from "next/image";
import { Drop as DropType, Maybe } from "@/graphql.types";
import { shorten } from "../modules/wallet";
import { MintDrop } from "@/mutations/mint.graphql";
import { useMutation, useQuery } from "@apollo/client";
import { GetDrop } from "@/queries/drop.graphql";
import BounceLoader from "react-spinners/BounceLoader";
import Link from "next/link";
import clsx from "clsx";
import { isNil, not, pipe } from "ramda";
import useMe from "@/hooks/useMe";
import { useRouter, usePathname } from "next/navigation";
import { Session } from "next-auth";

interface MintData {
  mint: string;
}

interface HomeProps {
  session?: Session | null;
  drop: Maybe<DropType> | undefined;
}

export default function Home({ session, drop }: HomeProps) {
  const me = useMe();
  const collection = drop?.collection;
  const metadataJson = collection?.metadataJson;
  const holder = collection?.holders?.find(
    (holder) => holder.address === me?.wallet?.address
  );
  const owns = pipe(isNil, not)(holder);
  const [mint, { loading }] = useMutation<MintData>(MintDrop);

  const onMint = () => {
    mint();
  };

  return (
    <>
      <div className="flex w-full justify-between items-center py-4">
        <Image src="/img/logo.png" alt="site logo" width={50} height={67} />
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
          <img
            src={metadataJson?.image as string}
            alt={metadataJson?.name as string}
            className="w-full object-contain rounded-lg"
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="flex flex-col items-center md:items-start md:justify-center">
            <span className="text-2xl font-extrabold md:text-xl lg:text-3xl md:font-semibold">
              {metadataJson?.name}
            </span>
            <span className="text-base font-medium text-gray-300 mt-6 md:mt-3 text-center md:text-left">
              {metadataJson?.description}
            </span>
          </div>
          <div className="bg-contrast rounded-lg p-6 flex justify-between mt-8 items-center mb-6">
            {session ? (
              <div className="flex flex-row gap-2 items-center">
                <img
                  className="w-14 h-14 rounded-full"
                  src={session?.user?.image as string}
                />
                <div className="flex flex-col gap-1">
                  {me?.wallet ? (
                    <>
                      <div className="flex gap-2 items-center">
                        <div className="flex flex-col gap-1">
                          <span className="text-gray-300 text-xs">
                            Wallet connected
                          </span>
                          <span>{shorten(me?.wallet?.address as string)}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="h-4 w-24 rounded-md bg-contrast animate-pulse" />
                      <div className="h-6 w-16 rounded-md bg-contrast animate-pulse" />
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-xs md:text-base text-gray-300">
                  Sign up to claim your NFT
                </span>
                <Link
                  href="/login"
                  className="rounded-full px-6 py-3 bg-cta hover:bg-opacity-80 transition text-contrast"
                >
                  Claim now
                </Link>
              </div>
            )}
            {me?.wallet && (
              <button
                className="font-bold rounded-full bg-cta text-contrast py-3 px-6 transition hover:opacity-80"
                onClick={onMint}
                disabled={loading}
              >
                Claim NFT
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
